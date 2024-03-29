import React, { useState, useEffect } from "react";

import {
  StylesProvider,
  createGenerateClassName,
} from "@material-ui/core/styles";
const generateClassName = createGenerateClassName({
  seed: "Bene",
});

import { FilterList, Search } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import {
  Box,
  TextField,
  InputAdornment,
  SvgIcon,
  Grid,
  Typography,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";

import { getBeneficiaries } from "api/beneficiaries";
import AddBeneficiary from "./AddBeneficiary";

import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";

const useStyles = makeStyles(() => ({
  card: {
    borderRadius: 0,
    boxShadow: "none",
    margin: "0",
    backgroundColor: "rgb(227, 227, 227)",
    fontSize: "18px",
    padding: "25px",
  },
  card2: {
    borderRadius: 0,
    boxShadow: "none",
  },
  card3: {
    marginLeft: "70px",
  },
  input: {
    fontSize: "25px !important",
    marginTop: "15px",
    marginBottom: "15px",
  },
}));

const orgTHead = [
  { id: "accountNumber", numeric: "false", label: "Account Number" },
  { id: "name", numeric: "false", label: "Name" },
  { id: "ifsc", numeric: "true", label: "IFSC" },
];

export default function BeneficiariesList(props) {
  const classes = useStyles();
  const { str = "", data = [], userDetails } = props;

  const [searchStr, setSearchString] = useState(str);
  const [searchData, setSearchData] = useState(data);
  const [beneData, setBeneData] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [orgbeneData, setOrgBeneData] = useState([]);
  const [userAccountNum, setUserAccountNum] = useState(
    (userDetails &&
      userDetails.hasOwnProperty("accountNumber") &&
      userDetails.accountNumber) ||
      (localStorage && localStorage.getItem("currentAccNum"))
  );
  const [ck, setCk] = useState(false);
  const [thead, setThead] = useState(orgTHead);
  const [fields, setFields] = useState({
    accountNumber: true,
    name: true,
    ifsc: true,
  });

  useEffect(() => {
    setThead(
      orgTHead.filter((el) => {
        return fields[el.id];
      })
    );
    setBeneData(
      orgbeneData.map((elee) => {
        let n = {};
        Object.keys(elee).forEach((ele) => {
          if (fields[ele]) n[ele] = elee[ele];
        });
        return n;
      })
    );
  }, [fields]);

  useEffect(() => {
    getAllBeneficiaries();
  }, []);

/**
 * Updates the page if the quick pay section completes transaction
 */
  const updateHandlerCallback = () => {
    getAllBeneficiaries();
  };

  useEffect(() => {
    setSearchData(
      beneData
        .filter(
          (el) => el.name.toLowerCase().indexOf(searchStr.toLowerCase()) > -1
        )
        .slice(0, 3)
    );
  }, [searchStr]);

/**
 * Fetches and modifies the beneficiaries data for display
 */
  async function getAllBeneficiaries() {
    let res = await getBeneficiaries();
    if (res) {
      res = res.map((el) => {
        let {
          beneficiaryAccountNumber: accountNumber,
          beneficiaryName: name,
          beneficiaryIfsc: ifsc,
        } = el;
        return { accountNumber, name, ifsc };
      });
    } else {
      res = [];
    }
    setBeneData(res);
    setDataLoaded(true);
    setOrgBeneData(res);
  }

/**
 * Filter the no. of fields to be shown in table 
 */
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
        <Box>
          {beneData.length > 0 && (
            <div style={{ backgroundColor: "white", paddingLeft: "25px" }}>
              <Grid container spacing={2} alignItems="flex-end">
                <Grid item xs={10}>
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
                    placeholder="Search Beneficiaries"
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
                        checked={fields["accountNumber"]}
                        onChange={(e) => filterFields(e)}
                        name="accountNumber"
                        color="primary"
                      />
                    }
                    label="Account Number"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={fields["name"]}
                        onChange={(e) => filterFields(e)}
                        name="name"
                        color="primary"
                      />
                    }
                    label="Name"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={fields["ifsc"]}
                        onChange={(e) => filterFields(e)}
                        name="ifsc"
                        color="primary"
                      />
                    }
                    label="IFSC"
                  />
                </>
              )}
            </div>
          )}
          {dataLoaded && beneData.length == 0 && (
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
                    Currently you don't have any Beneficiaries Added
                  </div>
                </div>
              </GridItem>
            </GridContainer>
          )}
          {!searchStr && beneData.length > 0 ? (
            <GridContainer>
              <GridItem xs={12} sm={12} md={12}>
                <Card className={classes.card2}>
                  <CardBody>
                    <Table
                      tableHeaderColor="primary"
                      tableHead={thead}
                      primarySort="name"
                      tableData={beneData}
                    />
                  </CardBody>
                </Card>
              </GridItem>
            </GridContainer>
          ) : (
            searchData.length > 0 && (
              <GridContainer>
                <GridItem
                  xs={12}
                  sm={12}
                  md={10}
                  style={{ marginLeft: "60px" }}
                >
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
          {dataLoaded && <GridContainer>
            <GridItem xs={12} sm={12} md={11}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "column",
                  textAlign: "center",
                  marginLeft: "7%",
                }}
              >
                <AddBeneficiary
                  userAccountNum={userAccountNum}
                  updateHandlerCallback={updateHandlerCallback}
                />
              </div>
            </GridItem>
          </GridContainer>}
        </Box>
      </Card>
    </StylesProvider>
  );
}
