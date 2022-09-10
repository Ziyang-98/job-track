import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import LoadingButton from "@mui/lab/LoadingButton";

import Notification from "components/Notification";
import useNotification from "hooks/useNotification";

const ImportDialog = ({
  dialogProps,
  handleClose,
  handleImportData,
  loading,
  error,
}) => {
  const { open, handleOpen, handleCloseNotification } = useNotification();

  const handleSubmit = async (event) => {
    event.preventDefault();
    await handleImportData(event);
    handleOpen();
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Dialog {...dialogProps} maxWidth={"sm"} fullWidth disablePortal>
          <DialogTitle>Enter a User ID to import data</DialogTitle>
          <DialogContent>
            <TextField
              margin="dense"
              id="userId"
              label="User ID"
              name="userId"
              type="userId"
              required
              fullWidth
              variant="outlined"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <LoadingButton loading={loading} type="submit">
              Import
            </LoadingButton>
          </DialogActions>
        </Dialog>
      </form>
      <Notification
        type={error ? "error" : "success"}
        message={
          error
            ? "Encountered issues retriving data. Check if the user ID is correct?"
            : "Successfully imported data!"
        }
        timeout={3000}
        open={open}
        handleCloseNotification={handleCloseNotification}
      />
    </>
  );
};

export default ImportDialog;
