import axios from "axios";

const hostUrl = "http://127.0.0.1:8080/api/v1";

export async function getTransactions(userAccountNum) {
  try {
    let response = await axios.get(`${hostUrl}/transactions`);
    response = response.data;

    let temp = response.data.data.filter((el) => {
      return (
        el.senderAccount === userAccountNum ||
        el.receiverAccount === userAccountNum
      );
    });
    return temp;
  } catch (error) {
    console.error(error);
    let response = await getTransactionsLocal();
    let temp = response.data.data.filter((el) => {
      return (
        el.senderAccount === userAccountNum ||
        el.receiverAccount === userAccountNum
      );
    });
    return temp;
  }
}

let txn = {"status":"success","results":27,"data":{"data":[{"_id":"63e81f5bc7c20e4214e73d7a","referenceNumber":"6846","date":"2023-02-11T23:06:01.657Z","amount":500,"senderAccount":"678912345","receiverAccount":"891234567","receiverIfsc":"UTIB0004626","description":"Quick transfer"},{"_id":"63e81f79c7c20e4214e73d84","referenceNumber":"9536","date":"2023-02-11T23:06:33.889Z","amount":500,"senderAccount":"678912345","receiverAccount":"567891234","receiverIfsc":"UTIB0004472","description":"Quick transfer"},{"_id":"63e81fb4c7c20e4214e73d8e","referenceNumber":"2956","date":"2023-02-11T23:07:32.792Z","amount":100,"senderAccount":"678912345","receiverAccount":"891234567","receiverIfsc":"UTIB0004626","description":"Quick transfer"},{"_id":"63e81fc0c7c20e4214e73d94","referenceNumber":"7396","date":"2023-02-11T23:07:44.265Z","amount":50,"senderAccount":"678912345","receiverAccount":"567891234","receiverIfsc":"UTIB0004472","description":"Quick transfer"},{"_id":"63e81fcac7c20e4214e73d9a","referenceNumber":"5424","date":"2023-02-11T23:07:54.815Z","amount":100,"senderAccount":"678912345","receiverAccount":"567891234","receiverIfsc":"UTIB0004472","description":"Quick transfer"},{"_id":"63e81fd4c7c20e4214e73da0","referenceNumber":"5445","date":"2023-02-11T23:08:04.439Z","amount":100,"senderAccount":"678912345","receiverAccount":"891234567","receiverIfsc":"UTIB0004626","description":"Quick transfer"},{"_id":"63e953466e9e3e1cfcab1354","referenceNumber":"4661","date":"2023-02-12T20:59:49.588Z","amount":500,"senderAccount":"891234567","receiverAccount":"567891234","receiverIfsc":"UTIB0004472","description":"Quick transfer"},{"_id":"63ebe1a6b12df22eb47065a3","referenceNumber":"1639","date":"2023-02-14T19:31:49.661Z","amount":500,"senderAccount":"345678912","receiverAccount":"678912345","receiverIfsc":"UTIB0000022","description":"Quick transfer"},{"_id":"63f3237368288553d0499b56","referenceNumber":"5858","date":"2023-02-20T07:38:25.995Z","amount":100,"senderAccount":"891234567","receiverAccount":"567891234","receiverIfsc":"UTIB0004472","description":"Quick transfer"},{"_id":"63f3255168288553d0499b66","referenceNumber":"3374","date":"2023-02-20T07:46:25.480Z","amount":100,"senderAccount":"891234567","receiverAccount":"567891234","receiverIfsc":"UTIB0004472","description":"Quick transfer"},{"_id":"63f325d168288553d0499b76","referenceNumber":"5200","date":"2023-02-20T07:48:33.586Z","amount":100,"senderAccount":"891234567","receiverAccount":"567891234","receiverIfsc":"UTIB0004472","description":"Quick transfer"},{"_id":"63f3267468288553d0499b81","referenceNumber":"3888","date":"2023-02-20T07:51:16.400Z","amount":100,"senderAccount":"891234567","receiverAccount":"567891234","receiverIfsc":"UTIB0004472","description":"Quick transfer"},{"_id":"63f326b568288553d0499b8d","referenceNumber":"2389","date":"2023-02-20T07:52:20.939Z","amount":100,"senderAccount":"891234567","receiverAccount":"678912345","receiverIfsc":"UTIB0000022","description":"Quick transfer"},{"_id":"63f3270168288553d0499ba0","referenceNumber":"9831","date":"2023-02-20T07:53:37.006Z","amount":100,"senderAccount":"891234567","receiverAccount":"567891234","receiverIfsc":"UTIB0004472","description":"Quick transfer"},{"_id":"63f328dd68288553d0499bad","referenceNumber":"3395","date":"2023-02-20T08:01:33.761Z","amount":100,"senderAccount":"891234567","receiverAccount":"678912345","receiverIfsc":"UTIB0000022","description":"Quick transfer"},{"_id":"63f3294168288553d0499bb5","referenceNumber":"9407","date":"2023-02-20T08:03:13.626Z","amount":200,"senderAccount":"891234567","receiverAccount":"678912345","receiverIfsc":"UTIB0000022","description":"Quick transfer"},{"_id":"63f32fb968288553d0499bef","referenceNumber":"9846","date":"2023-02-20T08:30:49.290Z","amount":500,"senderAccount":"891234567","receiverAccount":"678912345","receiverIfsc":"UTIB0000022","description":"Quick transfer"},{"_id":"63f3300c68288553d0499bfc","referenceNumber":"7513","date":"2023-02-20T08:32:12.778Z","amount":100,"senderAccount":"891234567","receiverAccount":"567891234","receiverIfsc":"UTIB0004472","description":"Quick transfer"},{"_id":"63f341f268288553d0499c1c","referenceNumber":"5012","date":"2023-02-20T09:48:34.824Z","amount":100,"senderAccount":"891234567","receiverAccount":"567891234","receiverIfsc":"UTIB0004472","description":"Quick transfer"},{"_id":"63f3420868288553d0499c28","referenceNumber":"5769","date":"2023-02-20T09:48:56.599Z","amount":100,"senderAccount":"891234567","receiverAccount":"678912345","receiverIfsc":"UTIB0000022","description":"Quick transfer"},{"_id":"63f3423f68288553d0499c34","referenceNumber":"1437","date":"2023-02-20T09:49:51.055Z","amount":100,"senderAccount":"891234567","receiverAccount":"567891234","receiverIfsc":"UTIB0004472","description":"Quick transfer"},{"_id":"63f3425168288553d0499c3f","referenceNumber":"6701","date":"2023-02-20T09:50:09.393Z","amount":100,"senderAccount":"891234567","receiverAccount":"678912345","receiverIfsc":"UTIB0000022","description":"Quick transfer"},{"_id":"63f343fb68288553d0499c67","referenceNumber":"3091","date":"2023-02-20T09:57:15.169Z","amount":100,"senderAccount":"891234567","receiverAccount":"678912345","receiverIfsc":"UTIB0000022","description":"Quick transfer"},{"_id":"63f3442768288553d0499c74","referenceNumber":"2348","date":"2023-02-20T09:57:59.298Z","amount":100,"senderAccount":"891234567","receiverAccount":"567891234","receiverIfsc":"UTIB0004472","description":"Quick transfer"},{"_id":"63f3444e68288553d0499c81","referenceNumber":"9971","date":"2023-02-20T09:58:38.249Z","amount":100,"senderAccount":"891234567","receiverAccount":"678912345","receiverIfsc":"UTIB0000022","description":"Quick transfer"},{"_id":"63f3446368288553d0499c92","referenceNumber":"2275","date":"2023-02-20T09:58:59.783Z","amount":100,"senderAccount":"891234567","receiverAccount":"567891234","receiverIfsc":"UTIB0004472","description":"Quick transfer"},{"_id":"63f3448568288553d0499c9d","referenceNumber":"5950","date":"2023-02-20T09:59:33.057Z","amount":100,"senderAccount":"891234567","receiverAccount":"678912345","receiverIfsc":"UTIB0000022","description":"Quick transfer"}]}};

function getTransactionsLocal() {
  return new Promise((res, rej) => {
    res(txn);
  });
}
