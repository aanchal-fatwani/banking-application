import {
  warningColor,
  primaryColor,
  dangerColor,
  successColor,
  infoColor,
  roseColor,
  grayColor,
  defaultFont
} from "assets/jss/primary-styles.js";

const tableStyle = theme => ({
  warningTableHeader: {
    color: warningColor[0]
  },
  primaryTableHeader: {
    color: primaryColor[0]
  },
  dangerTableHeader: {
    color: dangerColor[0]
  },
  successTableHeader: {
    color: successColor[0]
  },
  infoTableHeader: {
    color: infoColor[0]
  },
  roseTableHeader: {
    color: roseColor[0]
  },
  grayTableHeader: {
    color: grayColor[0]
  },
  table: {
    marginBottom: "0",
    width: "100%",
    maxWidth: "100%",
    backgroundColor: "transparent",
    borderSpacing: "0",
    borderCollapse: "collapse",
    marginTop: "-18px"
  },
  tableHeadCell: {
    color: "#0badec",
    ...defaultFont,
    "&, &$tableCell": {
      fontSize: "1.5em",
      fontWeight: "400",
      padding: "3px 10px 15px 7px",
      borderBottom: "1px solid rgb(245 241 241 / 87%)"
    }
  },
  tableCell: {
    ...defaultFont,
    lineHeight: "2.2em",
    padding: "7px 8px",
    verticalAlign: "middle",
    fontSize: "1.3rem",
    borderBottom: "0"
  },
  tableResponsive: {
    width: "100%",
    marginTop: theme.spacing(2),
    overflowX: "auto"
  },
  tableHeadRow: {
    height: "56px",
    color: "inherit",
    display: "table-row",
    outline: "none",
    verticalAlign: "middle"
  },
  tableBodyRow: {
    height: "48px",
    color: "inherit",
    display: "table-row",
    outline: "none",
    verticalAlign: "middle"
  }
});

export default tableStyle;
