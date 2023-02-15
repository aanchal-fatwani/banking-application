import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Box,
  Table,
  Typography,
  IconButton,
  Collapse,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
} from "@material-ui/core";

import { KeyboardArrowDown, KeyboardArrowUp } from "@material-ui/icons";
const styles = {
  tableCell: {
    lineHeight: "1.42857143",
    padding: "15px 8px",
    verticalAlign: "middle",
    fontSize: "1.5rem",
    borderBottom: "0",
  },
};
export default function CollapsibleRows(props) {
  const { row, details } = props;
  const [open, setOpen] = React.useState(false);
  const useStyles = makeStyles(styles);
  const classes = useStyles();

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        {Object.keys(row).map((el, i) => {
          let dt;
          if (el === "dt") {
            dt = new Date(row[el]);
            row[el] = dt.toString().split("GMT")[0];
          }
          if (Array.isArray(el) || el === "order") return null;
          return (
            <TableCell
              component="th"
              scope="row"
              key={i}
              style={{
                lineHeight: "1.4",
                padding: "15px 8px",
                verticalAlign: "middle",
                fontSize: "1.2rem",
                borderBottom: "0",
              }}
            >
              {row[el]}
            </TableCell>
          );
        })}
        <TableCell
          style={{
            lineHeight: "1.4",
            padding: "15px 8px",
            verticalAlign: "middle",
            fontSize: "1.2rem",
            borderBottom: "0",
          }}
        >
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={2}>
              <Typography variant="h6" gutterBottom component="div">
                Details
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    {Object.keys(details[0]).map((el,i) => {
                      return (
                        <TableCell key={i} style={{ borderBottom: "none" }}>
                          {el.toUpperCase()}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {details.map((det,i) => (
                    <TableRow key={i}>
                      {Object.keys(det).map((el, i) => {
                        return (
                          <TableCell key={i} style={{ borderBottom: "none" }}>
                            {det[el]}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}
