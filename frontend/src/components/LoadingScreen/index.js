import { Box, CircularProgress, Typography } from "@mui/material";
import { styles } from "./styles";

export default function LoadingScreen() {
  return (
    <Box sx={styles.loadingOverlay}>
      <CircularProgress sx={styles.loadingIcon} />
      <Typography sx={styles.loadingText} variant="h6">
        Loading job applications...
      </Typography>
    </Box>
  );
}
