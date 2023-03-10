import React, { useEffect, useState } from "react";

import {
  StylesProvider,
  createGenerateClassName,
} from "@material-ui/core/styles";
const generateClassName = createGenerateClassName({
  seed: "Dash",
});

import { makeStyles } from "@material-ui/core/styles";
import { AccountBalanceWallet, Person, SyncAlt } from "@material-ui/icons";
import styles from "assets/jss/views/dashboardStyle.js";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardFooter from "components/Card/CardFooter.js";
import CardBody from "components/Card/CardBody.js";

import { getTransactions } from "api/transactions";
import { getUserByAccount } from "api/users";
import { getBeneficiaries } from "api/beneficiaries";

const useStyles = makeStyles(styles);


export default function AdminDashboard({
  userDetails,
  initialUserBalance = 0,
  initialBeneficiaries = [],
  initialLastPaidTxnName = "",
  initialLastTxnDate = null,
}) {
  const classes = useStyles();

  const [userBalance, setUserBalance] = useState(initialUserBalance);
  const [userAccountNumber, setUserAccountNumber] = useState(
    (userDetails &&
      userDetails.hasOwnProperty("accountNumber") &&
      userDetails.accountNumber) ||
      (localStorage && localStorage.getItem("currentAccNum"))
  );

  const [lastTxnAmt, setLastTxnAmt] = useState(0);
  const [lastTxnDate, setLastTxnDate] = useState(initialLastTxnDate);

  const [lastPaidTxnName, setLastPaidTxnName] = useState(
    initialLastPaidTxnName
  );
  const [lastPaidTxnAmt, setLastPaidTxnAmt] = useState(0);

  const [beneficiaries, setBeneficiaries] = useState(initialBeneficiaries);

/**
 * Fetches all the data on page load
 */
  const getAllInitialData = () =>{
    getUserDetails();
    getTxnDetails();
    getBeneficiaryDetails();
  }
  useEffect(() => {
    getAllInitialData()
  }, []);

/**
 * Updates the page if the quick pay section completes transaction
 */
const updateHandlerCallback = () => {
  getAllInitialData()
};

useEffect(() => {
  if (beneficiaries.length) {
    import("quickPay/quickPayIndex").then((module) => {
      if (
        document.getElementById("quick_pay") &&
        typeof module.initializeAll == "function"
      ) {
        module.initializeAll(userDetails, updateHandlerCallback);
      }
    });
  }
}, [beneficiaries]);

/**
 * Fetches all the beneficiaries
 */
  async function getBeneficiaryDetails() {
    let res = await getBeneficiaries(userAccountNumber);
    setBeneficiaries([...res]);
  }

/**
 * Fetches the user details for a particular user
 */
  async function getUserDetails() {
    let res = await getUserByAccount(userAccountNumber);
    const { accountNumber, balance } = res;
    setUserBalance(balance);
  }

/**
 * Fetches transactions details for a particular user
 */
  async function getTxnDetails() {
    let res = await getTransactions();
    res = res.filter((el) => {
      return (
        el.senderAccount === userAccountNumber ||
        el.receiverAccount === userAccountNumber
      );
    });
    let usersLastTxn = res[res.length - 1];
    setLastTxnAmt(usersLastTxn.amount);
    let d = new Date(usersLastTxn.date);
    setLastTxnDate(d.toDateString().split(" ").slice(1).join(" "));

    res = res.filter((el) => {
      return el.senderAccount === userAccountNumber;
    });
    if (res.length) {
      let usersLastPaidTxn = res[res.length - 1];
      setLastPaidTxnAmt(usersLastPaidTxn.amount);
      let user = await getUserByAccount(usersLastPaidTxn.receiverAccount);
      setLastPaidTxnName(user.name);
    }
  }

  return (
    <StylesProvider generateClassName={generateClassName}>
      <GridContainer
        style={{
          paddingTop: "100px",
          display: "flex",
          justifyContent: "space-around",
          backgroundColor: "#e3e3e3",
        }}
      >
        {userBalance ? (
          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="warning" stats icon>
                <CardIcon color="warning">
                  <AccountBalanceWallet />
                </CardIcon>
                <p
                  className={classes.cardCategory}
                  style={{ fontSize: "25px" }}
                >
                  Total Balance
                </p>
                <h3
                  className={classes.cardTitle}
                  style={{ fontSize: "40px", padding: "10px" }}
                >
                  {userBalance} <small>Rs</small>
                </h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats} style={{ fontSize: "22px" }}>
                  {`Account Number: ${userAccountNumber}`}
                </div>
              </CardFooter>
            </Card>
          </GridItem>
        ) : null}
        {lastTxnDate ? (
          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="info" stats icon>
                <CardIcon color="info">
                  <SyncAlt />
                </CardIcon>
                <p
                  className={classes.cardCategory}
                  style={{ fontSize: "25px" }}
                >
                  Last Transaction Date
                </p>
                <h3
                  className={classes.cardTitle}
                  style={{ fontSize: "40px", padding: "10px" }}
                >
                  {lastTxnDate}
                </h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats} style={{ fontSize: "22px" }}>
                  {/* <AccountBalanceWallet /> */}
                  {`Amount: ${lastTxnAmt}`}
                </div>
              </CardFooter>
            </Card>
          </GridItem>
        ) : null}
        {lastPaidTxnName ? (
          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="rose" stats icon>
                <CardIcon color="rose">
                  <Person />
                </CardIcon>
                <p
                  className={classes.cardCategory}
                  style={{ fontSize: "25px" }}
                >
                  Recent Payee
                </p>
                <h3
                  className={classes.cardTitle}
                  style={{ fontSize: "40px", padding: "10px" }}
                >
                  {lastPaidTxnName}
                </h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats} style={{ fontSize: "22px" }}>
                  {/* <NavLink to={"/"}> */}
                  {/* <AccountBalanceWallet /> */}
                  {`Amount: ${lastPaidTxnAmt}`}
                  {/* </NavLink> */}
                </div>
              </CardFooter>
            </Card>
          </GridItem>
        ) : null}
      </GridContainer>
      {beneficiaries.length > 0 && (
        <GridContainer
          style={{
            display: "flex",
            justifyContent: "center",
            backgroundColor: "#e3e3e3",
          }}
          className={classes.backgroundColor}
        >
          <GridItem xs={12} sm={12} md={7}>
            <Card>
              <CardBody>
                <div id="quick_pay"></div>
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      )}
    </StylesProvider>
  );
}
