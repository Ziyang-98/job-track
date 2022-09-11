import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import LoadingButton from "@mui/lab/LoadingButton";

const ImportDialog = ({
  dialogProps,
  handleClose,
  handleImportData,
  loading,
}) => {
  return (
    <>
      <form onSubmit={handleImportData}>
        <Dialog {...dialogProps} maxWidth={"sm"} fullWidth disablePortal>
          <DialogTitle>Enter a User ID to import data</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Your current job track will be deleted if import is successful!
            </DialogContentText>

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
    </>
  );
};

export default ImportDialog;
