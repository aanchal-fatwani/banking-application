import axios from "axios";

const hostUrl = "http://127.0.0.1:8080/api/v1";

export async function getBeneficiaries(accountNumber) {
  try {
    const response = await axios.get(`${hostUrl}/beneficiaries`);
    return response.data.data.data.filter(el=> el.accountNumber ==accountNumber );
  } catch (error) {
    console.error(error);
    const response = await getBeneficiariesLocal();
    return response.data.data.filter(el=> el.accountNumber ==accountNumber );
  }
}


var bene = {"status":"success","results":11,"data":{"data":[{"_id":"63e7fd9fa2ed4b2f80b05259","accountNumber":"345678912","ifsc":"UTIB0001100","beneficiaryName":"Vidit","beneficiaryAccountNumber":"123456789","beneficiaryIfsc":"UTIB0000723"},{"_id":"63e7fdefa2ed4b2f80b0525c","accountNumber":"345678912","ifsc":"UTIB0001100","beneficiaryName":"Sagar","beneficiaryAccountNumber":"678912345","beneficiaryIfsc":"UTIB0000022"},{"_id":"63e7fe24a2ed4b2f80b0525e","accountNumber":"678912345","ifsc":"UTIB0000022","beneficiaryName":"Avi","beneficiaryAccountNumber":"891234567","beneficiaryIfsc":"UTIB0004626"},{"_id":"63e7fe41a2ed4b2f80b05260","accountNumber":"678912345","ifsc":"UTIB0000022","beneficiaryName":"Rahul","beneficiaryAccountNumber":"567891234","beneficiaryIfsc":"UTIB0004472"},{"_id":"63e7fe80a2ed4b2f80b05262","accountNumber":"891234567","ifsc":"UTIB0004626","beneficiaryName":"Rahul","beneficiaryAccountNumber":"567891234","beneficiaryIfsc":"UTIB0004472"},{"_id":"63f101aa77384433e025f39f","accountNumber":"891234567","ifsc":"UTIB0004626","beneficiaryName":"Tanya","beneficiaryAccountNumber":"345678912","beneficiaryIfsc":"UTIB0001100"},{"_id":"63f1020e77384433e025f3a3","accountNumber":"891234567","ifsc":"UTIB0004626","beneficiaryName":"Vidit","beneficiaryAccountNumber":"123456789","beneficiaryIfsc":"UTIB0000723"},{"_id":"63f102bf77384433e025f3a7","accountNumber":"891234567","ifsc":"UTIB0004626","beneficiaryName":"Sagar","beneficiaryAccountNumber":"678912345","beneficiaryIfsc":"UTIB0000022"},{"_id":"63f106ba77384433e025f3cc","accountNumber":"678912345","ifsc":"UTIB0000022","beneficiaryName":"Tanya","beneficiaryAccountNumber":"345678912","beneficiaryIfsc":"UTIB0001100"},{"_id":"63f3429268288553d0499c53","accountNumber":"345678912","ifsc":"UTIB0001100","beneficiaryName":"Rahul","beneficiaryAccountNumber":"567891234","beneficiaryIfsc":"UTIB0004472"},{"_id":"63f3433168288553d0499c58","accountNumber":"345678912","ifsc":"UTIB0001100","beneficiaryName":"Avi","beneficiaryAccountNumber":"891234567","beneficiaryIfsc":"UTIB0004626"}]}}

function getBeneficiariesLocal() {
  return new Promise((res, rej) => {
    res(bene);
  });
}
