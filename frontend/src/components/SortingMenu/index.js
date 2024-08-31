import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { IconButton, Tooltip } from "@mui/material";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import { styles } from "./styles.js";
import { jobAppOptionTextToValueMap } from "common/sortingOption.js";

export default function SortingMenu({
  activeSortingOption,
  handleSetActiveSortingOption,
}) {
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
          sx: styles.menuList,
        }}
      >
        {Object.keys(jobAppOptionTextToValueMap).map((jobAppOptionText) => (
          <MenuItem
            key={jobAppOptionText}
            sx={
              activeSortingOption ===
              jobAppOptionTextToValueMap[jobAppOptionText]
                ? styles.highlighedMenu
                : null
            }
            onClick={() => {
              handleSetActiveSortingOption(
                jobAppOptionTextToValueMap[jobAppOptionText]
              );
              handleClose();
            }}
          >
            {jobAppOptionText}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
