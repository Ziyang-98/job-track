import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import CreateForm from "components/CreateForm";

import { styles } from "./styles";

const CreateDialog = ({ dialogProps, handleClose }) => {
  return (
    <Dialog {...dialogProps} maxWidth={"sm"} fullWidth>
      <DialogTitle>Create an entry for Job Application</DialogTitle>
      <DialogContent>
        <CreateForm />
      </DialogContent>
      <DialogActions>
        <Button sx={styles.button} onClick={handleClose}>
          Cancel
        </Button>
        <Button sx={styles.button}>Create</Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateDialog;
