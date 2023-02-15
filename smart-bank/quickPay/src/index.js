import { getBeneficiaries, postTransaction } from "./api";

function addHtml(accountNumber) {
  let htmlBlock = `
  <div class="qp_top">
  <form id="qp_form">
   <div class="qp_row">
      <h4 style="color:#08466d;text-align:center;padding-right: 77px;padding-bottom:20px">TRANSFER MONEY TO YOUR BENEFICIARIES</h4>
      <div style="width: 132px;float: left;padding-left: 150px;padding-right:0px;">
         <input class="inp" type="text" placeholder="Amount" id="amt" style="
         width: 184px;
         margin-left: -90px;
         font-size:20px;"
       />
      </div>
      <div style="padding-top: 10px;float: left;padding-left: 265px;padding-right: 30px;">TO</div>
      <div style="width: 330px; float: right;padding-right:0px">
         <div class="qp_input-group">
            <select id="beneficiaries">
            </select>
         </div>
      </div>
   </div>
   <div class="qp_row">
      <div class="qp_input-group">
         <input class="inp" id="terms" type="checkbox"/>
         <label for="terms">I agree that I have confirmed the details of the payee and want to proceed to pay.</label>
      </div>
      <input class="inp" type="button" value="PAY" id="pay" style="font-size:20px; font-weight:700;"/>
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
      postData(accountNumber);
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
    .qp_input-group {
      margin-bottom:1em
    }
    .qp_row:after {
      clear:both
    }
    .qp_row:after,.qp_row:before {
      content:"";
      display:table
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
    .inp:checked+label:before,.inp[type=button]:hover {
      background-color:#00b4a7
    }
    .inp:checked+label:after {
      opacity:1
    }
    .inp:focus {
      outline:0
    }
    .inp[type=button]:hover {
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
  console.log(res);
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

async function postData(accountNumber) {
  let selectedBeneIndex =
    document.getElementById("beneficiaries").selectedIndex;
  let res = await getBeneficiaries(accountNumber);
  console.log(res);
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
  console.log(result);
  alert("Transaction Succesful");
  document.getElementById("qp_form").reset();
}

export function initializeAll(userDetails) {
  console.log("in Quick");
  console.log(userDetails);
  let accountNumber =
    (userDetails &&
      userDetails.hasOwnProperty("accountNumber") &&
      userDetails.accountNumber) ||
    (localStorage && localStorage.getItem("currentAccNum"));
  addHtml(accountNumber);
  addStyles();
  getData(accountNumber);
}
initializeAll();
