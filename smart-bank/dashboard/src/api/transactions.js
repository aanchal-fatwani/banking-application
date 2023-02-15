import axios from "axios";

const hostUrl = "http://127.0.0.1:8080/api/v1";

export async function getTransactions() {
  try {
    const response = await axios.get(`${hostUrl}/transactions`);
    return response.data.data.data;
  } catch (error) {
    console.error(error);
  }
}