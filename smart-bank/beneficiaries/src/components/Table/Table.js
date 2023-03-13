import React from "react";
import PropTypes from "prop-types";

import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TablePagination from "@material-ui/core/TablePagination";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import clsx from "clsx";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";

import Button from "components/CustomButtons/Button.js";
import CollapsibleRows from "./CollapsibleRows";

import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

import Checkbox from "@material-ui/core/Checkbox";

import { lighten, makeStyles } from "@material-ui/core/styles";

import styles from "assets/jss/components/tableStyle.js";
import { Add, Edit, Remove } from "@material-ui/icons";

const useStyles = makeStyles(styles);

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === "light"
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: "1 1 100%",
  },
}));
const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles();
  const { numSelected, selected, tableData, selectedFn } = props;

  return numSelected ? (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      {numSelected ? (
        <>
          <Typography
            className={classes.root}
            color="inherit"
            variant="subtitle1"
            component="div"
          >
            {`Mark selected as item${numSelected > 1 ? `s` : ``} of the day`}
          </Typography>
          <Button
            aria-label="edit"
            justIcon
            onClick={() => selectedFn(tableData, selected)}
          >
            <ArrowForwardIcon />
          </Button>
        </>
      ) : (
        ""
      )}
    </Toolbar>
  ) : null;
};

function EnhancedTableHead(props) {
  const {
    classes,
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
    tableHeaderColor,
    tableHead,
    checkFeature,
  } = props;
  const createSortHandler = (property) => {
    onRequestSort(property);
  };

  return (
    <TableHead className={classes[tableHeaderColor + "TableHeader"]}>
      <TableRow className={classes.tableHeadRow}>
        {checkFeature ? (
          <TableCell padding="checkbox" className={classes.tableCell + " " + classes.tableHeadCell}>
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
            />
          </TableCell>
        ) : null}
        {tableHead.map((el) => {
          return (
            <TableCell
              className={classes.tableCell + " " + classes.tableHeadCell}
              key={el.id}
              sortDirection={orderBy === el.id ? order : false}
            >
              <TableSortLabel
                active={orderBy === el.id}
                direction={orderBy === el.id ? order : "asc"}
                onClick={() => createSortHandler(el.id)}
              >
                {el.label}
              </TableSortLabel>
            </TableCell>
          );
        })}
      </TableRow>
    </TableHead>
  );
}

export default function CustomTable(props) {
  const classes = useStyles();
  const {
    tableHead,
    tableData,
    tableHeaderColor,
    primarySort,
    labelRowsPerPage = "Rows per page",
    checkFeature = false,
    collapsible = false,
    hasFeatureTab = false,
    featureFn,
    selectedFn,
    minusFn,
    plusFn,
  } = props;
  const [orderBy, setOrderBy] = React.useState(primarySort);
  const [order, setOrder] = React.useState("asc");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [selected, setSelected] = React.useState([]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  function getComparator(order, orderBy) {
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = tableData.map((n) => n[primarySort]);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  return (
    <div className={classes.tableResponsive}>
      <Table className={classes.table}>
        {tableHead !== undefined ? (
          <EnhancedTableHead
            classes={classes}
            numSelected={selected.length}
            order={order}
            orderBy={orderBy}
            onSelectAllClick={handleSelectAllClick}
            onRequestSort={handleRequestSort}
            rowCount={tableData.length}
            tableHeaderColor={tableHeaderColor}
            tableHead={tableHead}
            checkFeature={checkFeature}
          />
        ) : null}
        <TableBody>
          {stableSort(tableData, getComparator(order, orderBy))
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((el, key) => {
              const isItemSelected = isSelected(el[primarySort]);
              const labelId = `enhanced-table-checkbox-${key}`;
              return collapsible ? (
                <CollapsibleRows key={key} row={el} details={el["order"]} />
              ) : (
                <TableRow
                  key={key}
                  className={classes.tableBodyRow}
                  hover
                  onClick={
                    checkFeature
                      ? (event) => {
                          handleClick(event, el[primarySort]);
                        }
                      : null
                  }
                  role="checkbox"
                  aria-checked={isItemSelected}
                  tabIndex={-1}
                  selected={isItemSelected}
                >
                  {checkFeature ? (
                    <TableCell padding="checkbox" className={classes.tableCell}>
                      <Checkbox
                        checked={isItemSelected}
                        inputProps={{ "aria-labelledby": labelId }}
                      />
                    </TableCell>
                  ) : null}
                  {Object.keys(el).map((ele, key) => {
                    if (Object.keys(el).length === key - 1) return null;
                    return (
                      <TableCell className={classes.tableCell} key={key}>
                        {el[ele]}
                      </TableCell>
                    );
                  })}
                  {hasFeatureTab && (
                    <TableCell
                      className={classes.tableCell}
                      onClick={() =>
                        featureFn(el.user_id ? el.user_id : el.item_id, el.name ? el.name : el.name)
                      }
                    >
                      <Edit />
                    </TableCell>
                  )}
                  {plusFn && (
                    <TableCell
                      className={classes.tableCell}
                      onClick={() =>
                        plusFn(el.user_id ? el.user_id : el.item_id)
                      }
                    >
                      <Add />
                    </TableCell>
                  )}
                  {minusFn && (
                    <TableCell
                      className={classes.tableCell}
                      onClick={() =>
                        minusFn(el.user_id ? el.user_id : el.item_id)
                      }
                    >
                      <Remove />
                    </TableCell>
                  )}
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
      {tableData.length && tableData.length > 5 ? (
        <TablePagination
          labelRowsPerPage={labelRowsPerPage}
          rowsPerPageOptions={[5, 10, 15]}
          component="div"
          count={tableData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      ) : (
        ""
      )}
      <EnhancedTableToolbar
        numSelected={selected.length}
        selected={selected}
        tableData={tableData}
        selectedFn={selectedFn}
      />
    </div>
  );
}

CustomTable.defaultProps = {
  tableHeaderColor: "gray",
};

CustomTable.propTypes = {
  tableHeaderColor: PropTypes.oneOf([
    "warning",
    "primary",
    "danger",
    "success",
    "info",
    "rose",
    "gray",
  ]),
  tableHead: PropTypes.arrayOf(PropTypes.object),
  tableData: PropTypes.arrayOf(PropTypes.object),
};
