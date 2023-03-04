import { getBeneficiaries, postTransaction } from "./api";

function addHtml(accountNumber, updateHandlerCallback) {
  let htmlBlock = `
  <div class="qp_top">
  <form id="qp_form">
  <div style="display:flex; flex-direction:column">
      <h4 style="color:#08466d;text-align:center;margin: 15px;">TRANSFER MONEY TO YOUR BENEFICIARIES</h4>
      <div style="display:flex; flex-direction:row;justify-content:space-evenly">
         <input class="inp" type="text" placeholder="Amount" id="amt" style="
         width: 200px;font-size:20px;margin: 15px;"
       />
       <div style="margin: 25px 0 0 0;">TO</div>
       <select id="beneficiaries" style="width:300px;margin: 10px;">
       </select>
       </div>
       <div style="margin: 30px 0;font-size: 20px;">
       <input class="inp" id="terms" type="checkbox"/>
       <label for="terms">I have confirmed the details of the payee and want to proceed with payment</label>
       </div>
       <input class="inp" type="button" value="PAY" id="pay" style="font-size:20px; font-weight:700;" disabled="true" />
      </div>
</form>
</div>
  `;

  if (document.querySelector("#quick_pay"))
    document.getElementById("quick_pay").innerHTML = htmlBlock;
  document.getElementById("pay") &&
    document.getElementById("pay").addEventListener("click", () => {
      if (!document.getElementById("amt").value) {
        alert("Enter an amount first!");
        return;
      }
      if (!document.getElementById("terms").checked) {
        alert("Confirm your choice!");
        return;
      }
      document.getElementById("pay").value = "Processing..";
      postData(accountNumber, updateHandlerCallback);
    });

  document.getElementById("terms") &&
    document.getElementById("terms").addEventListener("click", () => {
      if (document.getElementById("terms").checked) {
        document.getElementById("pay").disabled = false;
        return;
      }
      document.getElementById("pay").disabled = true;
    });
}

function addStyles() {
  let styleElement = document.createElement("style");
  let styleText = `
  .inp:focus,select:active,select:focus {
      border-color:#00b4a7
    }
    select,select option {
      font-size:20px
    }
    .qp_top {
      background-color:#fff;
      border-radius:4.2px;
      margin:0 auto;
      max-width:75em;
      padding:1em 3em 2em;
      font-size:25px
    }
    .inp,.inp[type=checkbox]+label:before,select,select option {
      background-color:#f9f9f9;
      border:1px solid #e5e5e5;
      border-radius:3px;
      line-height:1.4;
      padding:1em;
      transition:.35s ease-in-out;
      width:100%
    }
    .inp:checked+label:before,.inp[type=button]:enabled:hover {
      background-color:#00b4a7
    }
    .inp:checked+label:after {
      opacity:1
    }
    .inp:focus {
      outline:0
    }
    .inp[type=button][disabled=false]:enabled:hover {
      border-color:#00b4a7;
      color:#fff
    }
    .inp[type=checkbox] {
      display:none
    }
    .inp[type=checkbox]+label {
      display:block;
      padding-left:1.6em;
      position:relative
    }
    .inp[type=checkbox]+label:after {
      color:#fff;
      content:"\f00c";
      font-family:FontAwesome;
      font-size:.8em;
      left:.2em;
      opacity:0;
      position:absolute;
      top:.45em
    }
    .inp[type=checkbox]+label:before {
      content:"";
      display:block;
      height:1em;
      left:0;
      padding:0;
      position:absolute;
      width:1em
    }
    select {
      height:3.4em;
      text-align:center;
      width:65%
    }
`;
  styleElement.innerHTML = styleText;
  document.head.appendChild(styleElement);

  if (document.getElementById("quick_pay"))
    document.getElementById("quick_pay").style.cssText = `
  color:#b9b9b9;
  font-family:"Open Sans","Helvetica Neue",Helvetica,Arial,sans-serif;
  font-size:15px;
  `;
}

export async function getData(accountNumber) {
  let res = await getBeneficiaries(accountNumber);
  let bene = "";
  for (const element of res) {
    let num = element.beneficiaryAccountNumber;
    bene += `<option>  ${element.beneficiaryName}-${num.slice(
      num.length - 4,
      num.length
    )} </option>`;
  }
  if (document.querySelector("#beneficiaries"))
    document.querySelector("#beneficiaries").innerHTML = bene;
}

async function postData(accountNumber, updateHandlerCallback) {
  let selectedBeneIndex =
    document.getElementById("beneficiaries").selectedIndex;
  let res = await getBeneficiaries(accountNumber);
  let data = {
    referenceNumber: Math.floor(1000 + Math.random() * 9000) + "",
    date: new Date(),
    amount: document.getElementById("amt").value,
    senderAccount: accountNumber,
    receiverAccount: res[selectedBeneIndex]["beneficiaryAccountNumber"],
    receiverIfsc: res[selectedBeneIndex]["beneficiaryIfsc"],
    description: "Quick transfer",
  };
  let result = await postTransaction(data);
  document.getElementById("pay").value = "PAY";
  alert("Transaction Succesful");
  updateHandlerCallback();
  document.getElementById("qp_form").reset();
}

export function initializeAll(userDetails, updateHandlerCallback) {
  let accountNumber =
    (userDetails &&
      userDetails.hasOwnProperty("accountNumber") &&
      userDetails.accountNumber) ||
    (localStorage && localStorage.getItem("currentAccNum"));
  addHtml(accountNumber, updateHandlerCallback);
  addStyles();
  getData(accountNumber);
}
initializeAll();
