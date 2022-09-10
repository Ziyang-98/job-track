import { getUserIdFromLocalStorage } from "common/utils";
import { useState } from "react";

const useExportDialog = () => {
  const [open, setOpen] = useState(false);
  const [userId, setUserId] = useState("");

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpenExportDialog = () => {
    // TODO: Get user id from localstorage and set it to userId
    const userId = getUserIdFromLocalStorage();
    setUserId(userId);

    setOpen(true);
  };

  return {
    exportDialogProps: {
      open,
      onClose: handleClose,
    },
    handleOpenExportDialog,
    handleClose,
    userId,
  };
};

export default useExportDialog;
