import React from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";

import { styles } from "./styles.js";
const CreateButton = () => {
  return (
    <Box>
      <IconButton aria-label="create" size="large" sx={styles.button}>
        <AddIcon />
      </IconButton>
    </Box>
  );
};

export default CreateButton;
