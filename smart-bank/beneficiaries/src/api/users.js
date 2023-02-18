import axios from "axios";

const hostUrl = "http://127.0.0.1:8080/api/v1";

export async function getUserByAccount(acc_num) {
  try {
    const response = await axios.get(
      `${hostUrl}/users?accountNumber=${acc_num}`
    );
    return response.data.data.data[0];
  } catch (error) {
    console.error(error);
  }
}