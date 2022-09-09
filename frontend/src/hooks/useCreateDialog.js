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
    const body = { data };
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
