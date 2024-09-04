import React from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import SyncIcon from "@mui/icons-material/Sync";
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
  handleClickSyncData,
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
      <Tooltip title="Manage Job Track profile">
        <IconButton
          aria-label="get-id"
          size="large"
          sx={styles.button}
          onClick={handleClickGetUniqueId}
        >
          <PersonIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Sync existing data">
        <IconButton
          aria-label="sync-data"
          size="large"
          sx={styles.button}
          onClick={handleClickSyncData}
        >
          <SyncIcon />
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
