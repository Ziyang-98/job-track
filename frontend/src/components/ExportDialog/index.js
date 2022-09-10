import React, { useState } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Link from "@mui/material/Link";

import { styles } from "./styles";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const ExportDialog = ({ dialogProps, handleClose, userId }) => {
  const [copied, setCopied] = useState(false);

  const handleCopied = () => {
    setCopied(true);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setCopied(false);
  };

  return (
    <>
      <Dialog {...dialogProps} maxWidth={"sm"} fullWidth disablePortal>
        <DialogTitle>Click on your unique ID to copy to clipboard</DialogTitle>
        <DialogContent>
          <Box sx={styles.userIdContainer}>
            <Link
              component="button"
              variant="subtitle1"
              underline="none"
              onClick={() => {
                navigator.clipboard.writeText(userId);
                handleCopied();
              }}
            >
              {userId}
            </Link>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={copied}
        autoHideDuration={2000}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity="success">
          User ID copied to clipboard!
        </Alert>
      </Snackbar>
    </>
  );
};

export default ExportDialog;
