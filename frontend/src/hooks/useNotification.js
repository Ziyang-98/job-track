import { useState } from "react";

const useNotification = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleCloseNotification = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return {
    open,
    handleOpen,
    handleCloseNotification,
  };
};

export default useNotification;
