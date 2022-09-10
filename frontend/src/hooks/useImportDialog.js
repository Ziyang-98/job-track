import { getJobApps } from "api";
import { storeUserIdFromLocalStorage } from "common/utils";
import { useState } from "react";

const useImportDialog = (refreshJobApps, handleOpenNotification) => {
  const [open, setOpen] = useState(false);
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
        refreshJobApps().then(() => {
          handleOpenNotification(
            "Successfully imported data!",
            2000,
            "success"
          );
        });
      })
      .catch((err) => {
        // setError(true);
        handleOpenNotification(
          "Error importing data. Please check if the userId is correct, or if your connection is stable!",
          5000,
          "error"
        );
        console.error(err);
      });

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
    loading,
  };
};

export default useImportDialog;
