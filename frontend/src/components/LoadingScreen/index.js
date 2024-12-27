import { Box, CircularProgress } from "@mui/material";
import { styles } from "./styles";

export default function LoadingScreen() {
  return (
    <Box sx={styles.loadingOverlay}>
      <CircularProgress sx={styles.loadingIcon} />
    </Box>
  );
}
