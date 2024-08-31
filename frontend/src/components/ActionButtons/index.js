import React from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import ImportIcon from "@mui/icons-material/FileUploadOutlined";
import ExportIcon from "@mui/icons-material/FileDownloadOutlined";
import Tooltip from "@mui/material/Tooltip";

import { styles } from "./styles.js";
import SortingMenu from "components/SortingMenu/index.js";

const CreateButton = ({
  sortingOption,
  handleSetSortingOption,
  handleClickCreate,
  handleClickImport,
  handleClickExport,
}) => {
  return (
    <Box>
      <SortingMenu
        sortingOption={sortingOption}
        handleSetSortingOption={handleSetSortingOption}
      />
      <Tooltip title="Add new Job Application">
        <IconButton
          aria-label="create"
          size="large"
          sx={styles.button}
          onClick={handleClickCreate}
        >
          <AddIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Import existing data">
        <IconButton
          aria-label="import"
          size="large"
          sx={styles.button}
          onClick={handleClickImport}
        >
          <ImportIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Export current data">
        <IconButton
          aria-label="export"
          size="large"
          sx={styles.button}
          onClick={handleClickExport}
        >
          <ExportIcon />
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default CreateButton;
