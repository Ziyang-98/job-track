import { getJobApps } from "api";
import { storeUserIdFromLocalStorage } from "common/utils";
import { useState } from "react";

const useImportDialog = (refreshJobApps) => {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpenImportDialog = () => {
    setOpen(true);
  };

  const handleImportData = async (event) => {
    event.preventDefault();
    setLoading(true);
    const data = new FormData(event.currentTarget);
    const newUserId = data.get("userId");
    await new Promise((resolve) => {
      console.log(`Retrieving UserId : ${newUserId}`);
      setTimeout(() => resolve(), 3000);
    });

    await getJobApps(newUserId)
      .then(() => {
        storeUserIdFromLocalStorage(newUserId);
      })
      .catch((err) => {
        setError(true);
        console.err(err);
      });

    await refreshJobApps();
    setLoading(false);
    handleClose();
  };

  return {
    importDialogProps: {
      open,
      onClose: handleClose,
    },
    handleOpenImportDialog,
    handleClose,
    handleImportData,
    error,
    loading,
  };
};

export default useImportDialog;
