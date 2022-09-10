import React from "react";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";

import { styles } from "./styles";

const Footer = () => {
  return (
    <Box sx={styles.footer}>
      Copyright © 2022 Made by{" "}
      {
        <Link href="https://limziyang.com/" target="_blank">
          Lim Zi Yang
        </Link>
      }
    </Box>
  );
};

export default Footer;
