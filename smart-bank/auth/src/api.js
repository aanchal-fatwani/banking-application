import axios from "axios";

const hostUrl = "http://127.0.0.1:8080/api/v1";

export async function checkUser(username, password) {
  try {
    const response = await axios.get(`${hostUrl}/users?username=${username}&password=${password}`);
    return response.data.data.data;
  } catch (error) {
    console.error(error);
  }
}

