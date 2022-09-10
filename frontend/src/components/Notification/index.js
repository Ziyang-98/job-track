import React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Notification = ({
  message,
  type,
  timeout,
  open,
  handleCloseNotification,
}) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={timeout}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      onClose={handleCloseNotification}
    >
      <Alert onClose={handleCloseNotification} severity={type}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default Notification;
