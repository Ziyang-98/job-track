import { useState } from "react";

const useNotification = () => {
  const [copied, setCopied] = useState(false);

  const handleCopied = () => {
    setCopied(true);
  };

  const handleCloseNotification = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setCopied(false);
  };

  return {
    copied,
    handleCopied,
    handleCloseNotification,
  };
};

export default useNotification;
