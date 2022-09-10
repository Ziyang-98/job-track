import { useState } from "react";

const useImportDialog = (refreshJobApps) => {
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

    // TODO: Change localStorage to new user id
    console.log(newUserId);

    await refreshJobApps();
    setLoading(false);
    handleClose();
  };

  return {
    exportDialogProps: {
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
