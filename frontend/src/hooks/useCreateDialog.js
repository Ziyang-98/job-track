import { useState } from "react";

const useCreateDialog = () => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCreateJobApp = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const body = {
      company: data.get("company"),
      status: data.get("status"),
      role: data.get("role"),
      location: data.get("location"),
      jobPosting: data.get("jobPosting"),
      dateApplied: data.get("dateApplied"),
      lastContactDate: data.get("lastContactDate"),
      notes: data.get("notes"),
    };
    console.log(body);
  };

  return {
    createDialogProps: {
      open,
      onClose: handleClose,
    },
    handleClose,
    handleClickOpen,
    handleCreateJobApp,
  };
};

export default useCreateDialog;
