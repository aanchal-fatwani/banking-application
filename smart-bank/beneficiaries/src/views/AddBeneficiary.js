import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

import { addBeneficiary } from "api/beneficiaries";
import { getUserByAccount } from "api/users";

import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Toast from "components/Toast/Toast";

const styles = {
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
  },
};
const useStyles = makeStyles(styles);

export default function AddBeneficiary(props) {
  const classes = useStyles();
  const {
    defaultIfsc = "",
    defaultBeneName = "",
    defaultBeneAcc = "",
    userAccountNum,
    updateHandlerCallback,
  } = props;

  const [ifsc, setIfsc] = useState(defaultIfsc);
  const [beneName, setBeneName] = useState(defaultBeneName);
  const [beneAcc, setBeneAcc] = useState(defaultBeneAcc);
  const [open, setOpen] = useState(false);
  const [errorOcc, setErrorOcc] = useState(false);
  const [invalidCreds, setInvalidCreds] = useState(false);

/**
 * Registers the new beneficiary if the details are valid
 */
  async function addNewBeneficiary() {
    if (!(ifsc && beneName && beneAcc)) {
      setOpen(true);
      setInvalidCreds(true);
      return;
    }
    setInvalidCreds(false);
    const currentUser = await getUserByAccount(userAccountNum);

    let data = {
      accountNumber: currentUser.accountNumber,
      ifsc: currentUser.ifsc,
      beneficiaryName: beneName,
      beneficiaryAccountNumber: beneAcc,
      beneficiaryIfsc: ifsc,
    };
    const res = await addBeneficiary(data);
    if (res && res.status === "success") {
      setErrorOcc(false);
      updateHandlerCallback();
    } else {
      setErrorOcc(true);
    }
    setIfsc("");
    setBeneName("");
    setBeneAcc("");
    setOpen(true);
  }

  return (
    <>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Add Beneficiary</h4>
            </CardHeader>
            <CardBody>
              <GridContainer style={{ justifyContent: "space-evenly" }}>
                <GridItem
                  xs={12}
                  sm={12}
                  md={3}
                  style={{ margin: "0 20px 20px 0" }}
                >
                  <CustomInput
                    labelText="Account Number"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      onChange: (e) => {
                        setBeneAcc(e.target.value);
                      },
                      value: beneAcc,
                    }}
                  />
                </GridItem>
                <GridItem
                  xs={12}
                  sm={12}
                  md={3}
                  style={{ margin: "0 20px 20px 0" }}
                >
                  <CustomInput
                    labelText="Beneficiary Name"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      onChange: (e) => {
                        setBeneName(e.target.value);
                      },
                      value: beneName,
                    }}
                  />
                </GridItem>
                <GridItem
                  xs={12}
                  sm={12}
                  md={2}
                  style={{ margin: "0 25px 20px 0" }}
                >
                  <CustomInput
                    labelText="IFSC"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      onChange: (e) => {
                        setIfsc(e.target.value);
                      },
                      value: ifsc,
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={2}>
                  <Button
                    color="primary"
                    onClick={addNewBeneficiary}
                    style={{
                      padding: "12px 25px",
                      fontSize: "18px",
                      fontWeight: "700",
                      marginTop: "30px",
                    }}
                  >
                    Add
                  </Button>
                </GridItem>
              </GridContainer>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
      {open && (
        <Toast
          openStatus={open}
          closeHandler={setOpen}
          msg={
            invalidCreds
              ? "Please enter valid details"
              : !errorOcc
              ? "Beneficiary Added!"
              : "Some error occurred. Please try again!"
          }
          severity={`${errorOcc || invalidCreds ? "error" : "success"}`}
          duration="3000"
        />
      )}
    </>
  );
}
