import React from "react";

import {
  Snackbar,
} from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";

export default function toast({ openStatus, closeHandler, msg, severity, duration }) {
  return (
    <Snackbar
      open={openStatus}
      autoHideDuration={parseInt(duration)}
      onClose={() => closeHandler(false)}
    >
      <Alert onClose={() => closeHandler(false)} severity={severity}>
        {msg}
      </Alert>
    </Snackbar>
  );
}

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
