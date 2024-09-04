import { getJobApps } from "api";
import {
  getUserIdFromLocalStorage,
  storeUserIdFromLocalStorage,
} from "common/utils";
import { useState } from "react";

const useSyncDataDialog = (refreshJobApps, handleOpenNotification) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpenSyncDataDialog = () => {
    setOpen(true);
  };

  const handleSyncData = async (event) => {
    event.preventDefault();
    setLoading(true);
    const data = new FormData(event.currentTarget);
    const oldUserId = getUserIdFromLocalStorage();
    const newUserId = data.get("userId").trim();

    if (oldUserId === newUserId) {
      handleOpenNotification("You are already on your account!", 3000, "error");
      setLoading(false);
    } else {
      await getJobApps(newUserId)
        .then((res) => {
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
          handleOpenNotification(
            "Error importing data. Please check if the user ID is correct, or if your connection is stable!",
            5000,
            "error"
          );
          console.error(err);
        });
      setLoading(false);
      handleClose();
    }
  };

  return {
    syncDataDialogProps: {
      open,
      onClose: handleClose,
    },
    handleOpenSyncDataDialog,
    handleClose,
    handleSyncData,
    loading,
  };
};

export default useSyncDataDialog;
