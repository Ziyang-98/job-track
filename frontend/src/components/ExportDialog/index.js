import React from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Link from "@mui/material/Link";

import Notification from "components/Notification";
import useNotification from "hooks/useNotification";

import { styles } from "./styles";

const ExportDialog = ({ dialogProps, handleClose, userId }) => {
  const { copied, handleCopied, handleCloseNotification } = useNotification();

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
      <Notification
        type="success"
        message="User ID copied to clipboard!"
        timeout={2000}
        copied={copied}
        handleCloseNotification={handleCloseNotification}
      />
    </>
  );
};

export default ExportDialog;
