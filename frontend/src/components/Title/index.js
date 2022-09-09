import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { styles } from "./styles.js";

const Title = () => {
  return (
    <Box sx={styles.titleHolder}>
      <Typography variant="h2" gutterBottom sx={styles.title}>
        Job Track
      </Typography>
      <Typography variant="subtitle1" gutterBottom sx={styles.title}>
        Keeping track of your job applications has never been simpler
      </Typography>
    </Box>
  );
};

export default Title;
