import axios from "axios";

const hostUrl = "http://127.0.0.1:8080/api/v1";

export async function getBeneficiaries(accountNumber) {
  try {
    const response = await axios.get(`${hostUrl}/beneficiaries/`);
    return response.data.data.data.filter(el=> el.accountNumber ==accountNumber );
  } catch (error) {
    console.error(error);
  }
}
