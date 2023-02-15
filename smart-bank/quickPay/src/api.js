import axios from "axios";

const hostUrl = "http://127.0.0.1:8080/api/v1/";

export async function getBeneficiaries(accountNumber) {
  try {
    const response = await axios.get(`${hostUrl}beneficiaries/`);
    return response.data.data.data.filter(el=> el.accountNumber ==accountNumber );
  } catch (error) {
    console.error(error);
  }
}
export async function postTransaction(data) {
  try {
    const response = await axios.post(`${hostUrl}transactions/`, data);
    console.log(response.data.data.data)
    const users = await axios.get(`${hostUrl}users/`);
    console.log(users.data.data.data);
    let rec = users.data.data.data.filter(el=>el.accountNumber == response.data.data.data
      .receiverAccount)[0]
      let sender = users.data.data.data.filter(el=>el.accountNumber == response.data.data.data
        .senderAccount)[0]
        let amt = response.data.data.data.amount;
        const patchResSen = await axios.patch(`${hostUrl}users/${sender._id}`, {balance:(sender.balance - amt)});
        const patchResRec = await axios.patch(`${hostUrl}users/${rec._id}`, {balance:(rec.balance + amt)});
    return response.data.data;
  } catch (error) {
    console.error(error);
  }
}
