import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";

import { makeStyles } from "@material-ui/core/styles";
import Snack from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";

import Close from "@material-ui/icons/Close";

import styles from "assets/jss/components/snackbarContentStyle.js";

const useStyles = makeStyles(styles);

export default function Snackbar(props) {
  const classes = useStyles();
  const { message, color, close, icon, place, open } = props;
  let action = [];
  const messageClasses = classNames({
    [classes.iconMessage]: icon !== undefined
  });
  
  return (
    <Snack
      anchorOrigin={{
        vertical: place.indexOf("t") === -1 ? "bottom" : "top",
        horizontal:
          place.indexOf("l") !== -1
            ? "left"
            : place.indexOf("c") !== -1
            ? "center"
            : "right"
      }}
      open={open}
      message={
        <div>
          {icon !== undefined ? <props.icon className={classes.icon} /> : null}
          <span className={messageClasses}>{message}</span>
        </div>
      }
      action={action}
      ContentProps={{
        classes: {
          root: classes.root + " " + classes[color],
          message: classes.message,
          action: ""
        }
      }}
    />
  );
}

Snackbar.propTypes = {
  message: PropTypes.node.isRequired,
  color: PropTypes.oneOf(["info", "success", "warning", "danger", "primary"]),
  close: PropTypes.bool,
  icon: PropTypes.object,
  place: PropTypes.oneOf(["tl", "tr", "tc", "br", "bl", "bc"]),
  open: PropTypes.bool,
};
