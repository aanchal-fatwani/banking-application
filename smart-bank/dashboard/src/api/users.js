import axios from "axios";

const hostUrl = "http://127.0.0.1:8080/api/v1";

export async function getUsers() {
  try {
    const response = await axios.get(`${hostUrl}/users`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
export async function getUserByAccount(acc_num) {
  try {
    const response = await axios.get(
      `${hostUrl}/users?accountNumber=${acc_num}`
    );
    return response.data.data;
  } catch (error) {
    console.error(error);
  }
}
