import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { IconButton, Tooltip } from "@mui/material";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import { styles } from "./styles.js";
import useSortJobAppsMenu from "hooks/useSortJobAppsMenu.js";

export default function SortingMenu({ handleSortJobApps }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const {
    sortByLatestDatetimeUpdated,
    sortByOldestDatetimeUpdated,
    sortByLatestDatetimeCreated,
    sortByOldestDatetimeCreated,
    sortByRole,
    sortByCompany,
  } = useSortJobAppsMenu(handleSortJobApps, handleClose);

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
        <MenuItem onClick={sortByLatestDatetimeUpdated}>
          Date Updated: Latest
        </MenuItem>
        <MenuItem onClick={sortByOldestDatetimeUpdated}>
          Date Updated: Oldest
        </MenuItem>
        <MenuItem onClick={sortByLatestDatetimeCreated}>
          Date Created: Latest
        </MenuItem>
        <MenuItem onClick={sortByOldestDatetimeCreated}>
          Date Created: Oldest
        </MenuItem>
        <MenuItem onClick={sortByRole}>Role</MenuItem>
        <MenuItem onClick={sortByCompany}>Company</MenuItem>
      </Menu>
    </>
  );
}
