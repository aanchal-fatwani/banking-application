import axios from "axios";

const hostUrl = "http://127.0.0.1:8080/api/v1";

export async function getUser() {
  try {
    const response = await axios.get(`${hostUrl}/users`);
    console.log(response.data.data);
    return response.data.data.data.filter(el=>el.accountNumber===(localStorage && localStorage.getItem('currentAccNum')))[0]
  } catch (error) {
    console.error(error);
  }
}

export async function setUser({ user_id, name, email, password, balance }) {
  try {
    const res = await axios.post(`${hostUrl}/users`, {
      user_id,
      name,
      email,
      password,
      balance,
    });
    return res.data;
  } catch (error) {
    console.error(error);
  }
}

export async function getUserById(id) {
  try {
    const response = await axios.get(`${hostUrl}/user/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function updateUserDetails(id, data) {
  try {
    const response = await axios.put(`${hostUrl}/users/${id}`, data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
