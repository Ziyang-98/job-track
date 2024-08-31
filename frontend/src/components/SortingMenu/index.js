import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { IconButton, Tooltip } from "@mui/material";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import { styles } from "./styles.js";

export default function SortingMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Tooltip title="Sort Job Applications by">
        <IconButton
          aria-label="sort"
          size="large"
          sx={styles.button}
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          <SwapVertIcon />
        </IconButton>
      </Tooltip>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleClose}>Date Updated: Latest</MenuItem>
        <MenuItem onClick={handleClose}>Date Updated: Oldest</MenuItem>
        <MenuItem onClick={handleClose}>Date Created: Latest</MenuItem>
        <MenuItem onClick={handleClose}>Date Created: Oldest</MenuItem>
        <MenuItem onClick={handleClose}>Role</MenuItem>
        <MenuItem onClick={handleClose}>Company</MenuItem>
      </Menu>
    </>
  );
}
