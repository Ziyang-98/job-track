import { deleteUser, getUser } from "api";
import {
  getUserIdFromLocalStorage,
  storeUserIdFromLocalStorage,
} from "common/utils";
import { useState } from "react";

const useManageProfileDialog = (refreshJobApps, handleOpenNotification) => {
  const [open, setOpen] = useState(false);
  const [userId, setUserId] = useState("");
  const [loadingResetUserId, setLoadingResetUserId] = useState(false);
  const [loadingDeleteUser, setLoadingDeleteUser] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpenManageProfileDialog = () => {
    const userId = getUserIdFromLocalStorage();
    setUserId(userId);

    setOpen(true);
  };

  const handleResetUserId = () => {
    setLoadingResetUserId(true);
    // Empty user ID to get new user
    getUser()
      .then((res) => {
        const { userId } = res.data;
        storeUserIdFromLocalStorage(userId);
        refreshJobApps();
        setUserId(userId);
        handleOpenNotification(
          "Profile successfully reset! New ID is provided.",
          2000,
          "success"
        );
      })
      .catch((err) => {
        handleOpenNotification(
          "Error resetting profile. Please try again later!",
          1500,
          "error"
        );
        console.error(err);
      })
      .finally(() => {
        setLoadingResetUserId(false);
      });
  };

  const handleDeleteUser = () => {
    setLoadingDeleteUser(true);
    deleteUser(userId)
      .then(() => {
        getUser().then((res) => {
          const { userId } = res.data;
          storeUserIdFromLocalStorage(userId);
          refreshJobApps();
          setUserId(userId);
          handleOpenNotification(
            "Profile successfully deleted! A new profile is created for you.",
            1500,
            "success"
          );
        });
      })
      .catch((err) => {
        handleOpenNotification(
          "Error deleting profile. Please try again later!",
          1500,
          "error"
        );
        console.error(err);
      })
      .finally(() => {
        setLoadingDeleteUser(false);
      });
  };

  return {
    manageProfileProps: {
      open,
      onClose: handleClose,
    },
    handleOpenManageProfileDialog,
    userId,
    handleDeleteUser,
    loadingDeleteUser,
    handleClose,
    handleResetUserId,
    loadingResetUserId,
  };
};

export default useManageProfileDialog;
