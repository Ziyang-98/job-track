import React from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import ImportIcon from "@mui/icons-material/FileUploadOutlined";
import ExportIcon from "@mui/icons-material/FileDownloadOutlined";
import PersonIcon from "@mui/icons-material/Person";
import Tooltip from "@mui/material/Tooltip";

import { styles } from "./styles.js";
import SortingMenu from "components/SortingMenu/index.js";
import { exportToCsv } from "common/export.js";

const CreateButton = ({
  jobApps,
  activeSortingOption,
  handleSetActiveSortingOption,
  handleClickCreate,
  handleClickImport,
  handleClickGetUniqueId,
}) => {
  return (
    <Box>
      <SortingMenu
        activeSortingOption={activeSortingOption}
        handleSetActiveSortingOption={handleSetActiveSortingOption}
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
      <Tooltip title="Get unique ID">
        <IconButton
          aria-label="get-id"
          size="large"
          sx={styles.button}
          onClick={handleClickGetUniqueId}
        >
          <PersonIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Export to CSV">
        <IconButton
          aria-label="export"
          size="large"
          sx={styles.button}
          onClick={() => exportToCsv(jobApps)}
        >
          <ExportIcon />
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default CreateButton;
