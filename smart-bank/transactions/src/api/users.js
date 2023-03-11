import axios from "axios";

const hostUrl = "http://127.0.0.1:8080/api/v1";

export async function getUser() {
  try {
    const response = await axios.get(`${hostUrl}/users`);
    return response.data.data.data.filter(
      (el) =>
        el.accountNumber ===
        (localStorage && localStorage.getItem("currentAccNum"))
    )[0];
  } catch (error) {
    console.error(error);
    const response = await getUserByAccountLocal(
      localStorage && localStorage.getItem("currentAccNum")
    );
    return response[0];
  }
}

let users = {
  status: "success",
  results: 5,
  data: {
    data: [
      {
        _id: "63e6c58a532e332d88194243",
        name: "Tanya",
        username: "tanya",
        password: "tanya",
        pan: "ASDFG7412Q",
        aadhaar: "542198523620",
        address: "Sector 147",
        email: "tanya@gmail.com",
        mobile: "9854986598",
        dateOfBirth: "1993-06-20T18:30:00.000Z",
        branch: "Sector 147",
        ifsc: "UTIB0001100",
        accountNumber: "345678912",
        balance: 4500,
        dateOfOpening: "2023-01-20T18:30:00.000Z",
      },
      {
        _id: "63e6c622532e332d88194247",
        name: "Vidit",
        username: "vidit",
        password: "vidit",
        pan: "QWERT8521W",
        aadhaar: "152369854512",
        address: "Sector 62",
        email: "vidit@gmail.com",
        mobile: "9876546541",
        dateOfBirth: "1994-01-01T18:30:00.000Z",
        branch: "Sector 62",
        ifsc: "UTIB0000723",
        accountNumber: "123456789",
        balance: 5000,
        dateOfOpening: "2022-12-31T18:30:00.000Z",
      },
      {
        _id: "63e6c76e532e332d8819424c",
        name: "Sagar",
        username: "sagar",
        password: "sagar",
        pan: "APTGK9632E",
        aadhaar: "521496300745",
        address: "Sector 16",
        email: "sagar@gmail.com",
        mobile: "9874521232",
        dateOfBirth: "1991-10-11T18:30:00.000Z",
        branch: "Sector 16",
        ifsc: "UTIB0000022",
        accountNumber: "678912345",
        balance: 5550,
        dateOfOpening: "2023-02-09T18:30:00.000Z",
      },
      {
        _id: "63e6c824532e332d8819424e",
        name: "Avi",
        username: "avi",
        password: "avi",
        pan: "ZXCVB7456R",
        aadhaar: "741085209630",
        address: "Sector 128",
        email: "avi@gmail.com",
        mobile: "9856747421",
        dateOfBirth: "1999-10-11T18:30:00.000Z",
        branch: "Sector 128",
        ifsc: "UTIB0004626",
        accountNumber: "891234567",
        balance: 2800,
        dateOfOpening: "2022-02-09T18:30:00.000Z",
      },
      {
        _id: "63e6c8c2532e332d88194250",
        name: "Rahul",
        username: "rahul",
        password: "rahul",
        pan: "AQWER9512T",
        aadhaar: "410252036302",
        address: "Sector 31",
        email: "rahul@gmail.com",
        mobile: "9974856321",
        dateOfBirth: "1990-04-11T18:30:00.000Z",
        branch: "Sector 31",
        ifsc: "UTIB0004472",
        accountNumber: "567891234",
        balance: 7150,
        dateOfOpening: "2022-04-09T18:30:00.000Z",
      },
    ],
  },
};

function getUserByAccountLocal(acc_num) {
  return new Promise((res, rej) => {
    res(users.data.data.filter((el) => el.accountNumber === acc_num));
  });
}
