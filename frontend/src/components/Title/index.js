import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { styles } from "./styles.js";

const Title = () => {
  return (
    <Box sx={styles.titleHolder}>
      <Typography variant="h2" gutterBottom>
        JobTrack
      </Typography>
    </Box>
  );
};

export default Title;
