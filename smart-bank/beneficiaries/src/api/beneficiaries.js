import axios from "axios";

const hostUrl = "http://127.0.0.1:8080/api/v1/beneficiaries";

export async function getBeneficiaries() {
  try {
    const response = await axios.get(`${hostUrl}/`);
    return response.data.data.data.filter(el=>el.accountNumber===(localStorage && localStorage.getItem('currentAccNum')))
  } catch (error) {
    console.error(error);
  }
}

export async function addBeneficiary(data) {
  try {
    const response = await axios.post(`${hostUrl}/`, data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}