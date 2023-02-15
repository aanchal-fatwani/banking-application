import axios from "axios";

const hostUrl = "http://127.0.0.1:8080/api/v1";

export async function getTransactions(userAccountNum) {
  try {
    let response = await axios.get(`${hostUrl}/transactions`);
    response = response.data;

    console.log(response);
    let temp = response.data.data.filter((el) => {
      return (
        el.senderAccount === userAccountNum ||
        el.receiverAccount === userAccountNum
      );
    });
    return temp;
  } catch (error) {
    console.error(error);
  }
}

var txn = {
  status: "success",
  results: 6,
  data: {
    data: [
      {
        _id: "63cc1f27b62abd0ab0e456da",
        referenceNumber: "1212",
        date: "2023-01-20T18:30:00.000Z",
        amount: 500,
        senderAccount: "123456789",
        receiverAccount: "234567891",
        receiverIfsc: "UTIB0001100",
        description: "Testing",
      },
      {
        _id: "63cc411845e5bb1adca89db1",
        referenceNumber: "1254",
        date: "2021-01-21T18:30:00.000Z",
        amount: 500,
        senderAccount: "123456789",
        receiverAccount: "234567891",
        receiverIfsc: "UTIB0001100",
        description: "Testing",
      },
      {
        _id: "63d2ee29b0e59e3620c1aadb",
        referenceNumber: "9413",
        date: "2023-01-26T21:18:33.925Z",
        amount: 5000,
        senderAccount: "123456789",
        receiverAccount: "345678912",
        receiverIfsc: "UTIB0001100",
        description: "Quick transfer",
      },
      {
        _id: "63d2ee6db0e59e3620c1aae1",
        referenceNumber: "2497",
        date: "2023-01-26T21:19:41.185Z",
        amount: 5000,
        senderAccount: "123456789",
        receiverAccount: "456789123",
        receiverIfsc: "UTIB0001100",
        description: "Quick transfer",
      },
      {
        _id: "63d2eed3b0e59e3620c1aae9",
        referenceNumber: "1660",
        date: "2023-01-26T21:21:23.127Z",
        amount: 100,
        senderAccount: "123456789",
        receiverAccount: "345678912",
        receiverIfsc: "UTIB0001100",
        description: "Quick transfer",
      },
      {
        _id: "63d55ce0d8695e1748b33834",
        referenceNumber: "1264",
        date: "2021-01-24T18:30:00.000Z",
        amount: 500,
        senderAccount: "234567891",
        receiverAccount: "123456789",
        receiverIfsc: "UTIB0001100",
        description: "Testing",
      },
    ],
  },
};

function getTxn() {
  return new Promise((res, rej) => {
    res(txn);
  });
}
