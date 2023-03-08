/* eslint-disable import/first */
import React, { useState, useEffect } from "react";
import {
  StylesProvider,
  createGenerateClassName,
} from "@material-ui/core/styles";
const generateClassName = createGenerateClassName({
  seed: "Txn",
});

import { makeStyles } from "@material-ui/core/styles";
import {
  Box,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
  Grid,
  Typography,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";
import { AccountBalanceWallet, Search, FilterList } from "@material-ui/icons";

import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardFooter from "components/Card/CardFooter.js";

import { getTransactions } from "api/transactions";
import { getUser } from "api/users";
import { getBeneficiaries } from "api/beneficiaries";

import { successColor, grayColor } from "assets/jss/primary-styles.js";

const useStyles = makeStyles((theme) => ({
  stats: {
    color: successColor[0],
    display: "inline-flex",
    fontSize: "16px",
    lineHeight: "22px",
    "& svg": {
      top: "2px",
      width: "16px",
      height: "16px",
      position: "relative",
      marginRight: "3px",
      marginLeft: "3px",
    },
    "& .fab,& .fas,& .far,& .fal,& .material-icons": {
      top: "4px",
      fontSize: "16px",
      position: "relative",
      marginRight: "3px",
      marginLeft: "3px",
    },
  },
  cardCategory: {
    color: grayColor[0],
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    paddingTop: "10px",
    marginBottom: "0",
  },
  cardTitle: {
    color: grayColor[2],
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: grayColor[1],
      fontWeight: "400",
      lineHeight: "1",
    },
  },
  card: {
    borderRadius: 0,
    boxShadow: "none",
    margin: "0",
    backgroundColor: "#e3e3e3",
    height: "calc(100vh - 60px)",
    fontSize: "18px",
    paddingTop: "12px",
  },
  card2: {
    borderRadius: 0,
    boxShadow: "none",
  },
  card3: {
    marginLeft: "70px",
  },
  cardContent: {
    paddingBottom: "10px",
    backgroundColor: "#e3e3e3",
  },
  fontSize: {
    fontSize: theme.spacing(1),
  },
  backgroundColor: {
    backgroundColor: "rgb(227, 227, 227)",
  },
  input: {
    fontSize: "25px !important",
    marginTop: "15px",
    marginBottom: "15px",
  },
}));

const orgthead = [
  { id: "date", numeric: "false", label: "Date" },
  { id: "description", numeric: "false", label: "Note" },
  { id: "amount", numeric: "false", label: "Amount" },
];

export default function TransactionsList(props) {
  const classes = useStyles();
  const {
    str = "",
    data = [],
    userDetails,
    transactionsData = [],
    initialTotalBal = 0,
    initialBeneficiaries = [],
    initialOrgtxnData = [],
  } = props;

  const [searchStr, setSearchString] = useState(str);
  const [searchData, setSearchData] = useState(data);
  const [txnData, setTxnData] = useState(transactionsData);
  const [orgtxnData, setOrgTxnData] = useState(initialOrgtxnData);
  const [totalBal, setTotalBal] = useState(initialTotalBal);
  const [userAccountNum, setUserAccountNum] = useState(
    (userDetails &&
      userDetails.hasOwnProperty("accountNumber") &&
      userDetails.accountNumber) ||
      (localStorage && localStorage.getItem("currentAccNum"))
  );
  const [ck, setCk] = useState(false);
  const [thead, setThead] = useState(orgthead);
  const [fields, setFields] = useState({
    date: true,
    description: true,
    amount: true,
  });
  const [beneficiaries, setBeneficiaries] = useState(initialBeneficiaries);

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

  async function getBeneficiaryDetails() {
    let res = await getBeneficiaries(userAccountNum);
    setBeneficiaries([...res]);
  }

  useEffect(() => {
    setBalance();
  }, []);

  async function setBalance() {
    let user = await getUser();
    setTotalBal(user.balance);
  }
  const getAllInitialData = () => {
    setBalance();
    getAllTransactions();
    getBeneficiaryDetails();
  };

  const updateHandlerCallback = () => {
    // setBalance();
    // getAllTransactions();
    getAllInitialData();
  };

  useEffect(() => {
    setThead(
      orgthead.filter((el) => {
        return fields[el.id];
      })
    );
    setTxnData(
      orgtxnData.map((elee) => {
        let n = {};
        Object.keys(elee).forEach((ele) => {
          if (fields[ele]) n[ele] = elee[ele];
        });
        return n;
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fields]);

  useEffect(() => {
    // getAllTransactions();
    // getBeneficiaryDetails();
    getAllInitialData();
  }, []);

  useEffect(() => {
    setSearchData(
      txnData
        .filter(
          (el) =>
            el.description.toLowerCase().indexOf(searchStr.toLowerCase()) > -1
        )
        .slice(0, 3)
    );
  }, [searchStr]);

  async function getAllTransactions() {
    let res = await getTransactions(userAccountNum);
    if (res) {
      res = res.map((el) => {
        let { receiverAccount, senderAccount, date, description, amount } = el;
        let currentAccNum = userAccountNum;
        let txt =
          currentAccNum == receiverAccount ? "Received from" : "Sent to";
        let act =
          currentAccNum == receiverAccount ? senderAccount : receiverAccount;
        description = `${txt} ${act} / ${description}`;

        let plusMinus = currentAccNum == receiverAccount ? "+" : "-";
        amount = `${plusMinus}${amount}`;

        date = new Date(date);
        // date = date.toDateString().split(" ");
        // date = `${date[3]} ${date[1]} ${date[2]} `;
        return {
          date,
          description,
          amount,
        };
      });
    } else {
      res = [];
    }
    setTxnData(res);
    setOrgTxnData(res);
  }

  function filterFields(e) {
    setCk(!ck);
    if (ck) {
      let f = { ...fields };
      f[e.target.name] = !fields[e.target.name];
      setFields({ ...f });
    }
  }

  return (
    <StylesProvider generateClassName={generateClassName}>
      <Card className={classes.card}>
        <CardContent className={classes.cardContent}>
          <Box>
            {txnData.length > 0 && (
              <div
                style={{
                  marginLeft: "6px",
                  backgroundColor: "white",
                  paddingLeft: "25px",
                }}
              >
                <Grid container spacing={2} alignItems="flex-end">
                  <Grid item xs={10} style={{ padding: "0 8px 8px 0" }}>
                    <TextField
                      fullWidth
                      onChange={(e) => setSearchString(e.target.value)}
                      value={searchStr}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment
                            position="start"
                            style={{ marginRight: "30px" }}
                          >
                            <SvgIcon fontSize="large" color="action">
                              <Search />
                            </SvgIcon>
                          </InputAdornment>
                        ),
                        className: classes.input,
                      }}
                      data-testid="search"
                      placeholder="Search Transactions"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={1}>
                    <FilterList
                      onClick={filterFields}
                      style={{ marginBottom: "25px", fontSize: "50px" }}
                      data-testid="filter"
                    />
                  </Grid>
                  {searchStr && (
                    <Grid item xs={2}>
                      {searchData.length === 0 && (
                        <Typography
                          variant="subtitle1"
                          style={{ paddingTop: "10px" }}
                        >
                          No results found
                        </Typography>
                      )}
                    </Grid>
                  )}
                </Grid>
                {ck && (
                  <>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={fields["date"]}
                          onChange={(e) => filterFields(e)}
                          name="date"
                          color="primary"
                        />
                      }
                      label="Date"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={fields["description"]}
                          onChange={(e) => filterFields(e)}
                          name="description"
                          color="primary"
                        />
                      }
                      label="Note"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={fields["amount"]}
                          onChange={(e) => filterFields(e)}
                          name="amount"
                          color="primary"
                        />
                      }
                      label="Amount"
                    />
                  </>
                )}
              </div>
            )}
            {txnData.length == 0 && (
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      fontSize: "30px",
                      fontWeight: "700",
                      textAlign: "center",
                    }}
                  >
                    <div
                      style={{
                        margin: "80px",
                      }}
                    >
                      Currently you haven't made any Transactions
                    </div>
                  </div>
                </GridItem>
              </GridContainer>
            )}
            {!searchStr && txnData.length > 0 ? (
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <Card className={classes.card2}>
                    <CardBody>
                      <Table
                        tableHeaderColor="primary"
                        tableHead={thead}
                        primarySort="date"
                        tableData={txnData}
                        style={{ fontSize: "77px" }}
                        className={classes.fontSize}
                      />
                    </CardBody>
                  </Card>
                </GridItem>
              </GridContainer>
            ) : (
              searchData.length > 0 && (
                <GridContainer className={classes.backgroundColor}>
                  <GridItem xs={12} sm={12} md={10}>
                    <Card className={classes.card3}>
                      <CardBody>
                        <Table
                          tableHeaderColor="primary"
                          tableData={searchData}
                        />
                      </CardBody>
                    </Card>
                  </GridItem>
                </GridContainer>
              )
            )}
            <GridContainer
              className={classes.backgroundColor}
              style={{ justifyContent: "center" }}
            >
              {totalBal ? (
                <GridItem xs={12} sm={6} md={3}>
                  <Card>
                    <CardHeader color="info" stats icon>
                      <CardIcon color="info">
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
                        {totalBal}
                      </h3>
                    </CardHeader>
                    <CardFooter stats>
                      <div
                        className={classes.stats}
                        style={{ fontSize: "22px" }}
                      >
                        {/* <NavLink to={"/"}> */}
                        {/* <AccountBalanceWallet /> */}
                        {`Account Number: ${userAccountNum}`}
                        {/* </NavLink> */}
                      </div>
                    </CardFooter>
                  </Card>
                </GridItem>
              ) : null}
              {beneficiaries.length > 0 && (
                <GridItem xs={12} sm={12} md={7}>
                  <Card className={classes.card3}>
                    <CardBody>
                      <div id="quick_pay"></div>
                    </CardBody>
                  </Card>
                </GridItem>
              )}
            </GridContainer>
          </Box>
        </CardContent>
      </Card>
    </StylesProvider>
  );
}
