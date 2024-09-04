import { getUserIdFromLocalStorage } from "common/utils";
import { useState } from "react";

const useUniqueIdDialog = () => {
  const [open, setOpen] = useState(false);
  const [userId, setUserId] = useState("");

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpenUniqueIdDialog = () => {
    const userId = getUserIdFromLocalStorage();
    setUserId(userId);

    setOpen(true);
  };

  return {
    uniqueIdDialogProps: {
      open,
      onClose: handleClose,
    },
    handleOpenUniqueIdDialog,
    handleClose,
    userId,
  };
};

export default useUniqueIdDialog;
