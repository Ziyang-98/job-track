import React from "react";
import Button from "@mui/material/Button";
import LoadingButton from "@mui/lab/LoadingButton";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import CreateForm from "components/CreateForm";
import { DEFAULT_JOB_APP } from "common/constants";

import { styles } from "./styles";

const CreateOrEditDialog = ({
  dialogProps,
  handleClose,
  handleDeleteJobApp,
  onSubmit,
  formContactSuite,
  type,
  loadingUpdate,
  jobApp = DEFAULT_JOB_APP,
}) => {
  return (
    <form onSubmit={onSubmit}>
      <Dialog {...dialogProps} maxWidth={"sm"} fullWidth disablePortal>
        <DialogTitle>
          {type === "create"
            ? "Create an entry for the Job Application"
            : "Details for the Job Application"}
        </DialogTitle>
        <DialogContent>
          <CreateForm
            formContactSuite={formContactSuite}
            type={type}
            jobApp={jobApp}
          />
        </DialogContent>
        <DialogActions>
          {type === "edit" && (
            <LoadingButton
              sx={styles.deleteButton}
              onClick={() => {
                handleDeleteJobApp();
                handleClose();
              }}
            >
              Delete
            </LoadingButton>
          )}
          <Button sx={styles.button} onClick={handleClose}>
            Cancel
          </Button>
          <LoadingButton
            loading={loadingUpdate}
            sx={styles.button}
            type="submit"
          >
            {type === "create" ? "Create" : "Update"}
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </form>
  );
};

export default CreateOrEditDialog;
