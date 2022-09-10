import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import Title from "components/Title";
import ActionButtons from "components/ActionButtons";
import JobAppContent from "views/JobAppContent";
import CreateDialog from "components/CreateOrEditDialog";
import useCreateDialog from "hooks/useCreateDialog";
import ExportDialog from "components/ExportDialog";
import useExportDialog from "hooks/useExportDialog";
import useJobApps from "hooks/useJobApps";
import Footer from "components/Footer";

import { styles } from "./styles";

const Layout = () => {
  const {
    jobApps,
    setJobApps,
    updateStatus,
    handleDeleteJobApp,
    refreshJobApps,
  } = useJobApps();

  const {
    createDialogProps,
    handleOpenCreateDialog,
    handleClose: handleCreateDialogClose,
    handleCreateJobApp,
    formContactSuite,
  } = useCreateDialog(refreshJobApps);

  const {
    exportDialogProps,
    handleOpenExportDialog,
    handleClose: handleExportDialogClose,
    userId,
  } = useExportDialog();

  return (
    <Box sx={styles.mainContainer}>
      <Grid
        container
        spacing={2}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Grid xs={11} item>
          <Title />
        </Grid>

        <Grid xs={10} container item justifyContent={"flex-end"}>
          <Grid item>
            <ActionButtons
              handleClickCreate={handleOpenCreateDialog}
              handleClickExport={handleOpenExportDialog}
            />
          </Grid>
        </Grid>

        <Grid item xs={11}>
          <JobAppContent
            jobApps={jobApps}
            setJobApps={setJobApps}
            updateStatus={updateStatus}
            handleDeleteJobApp={handleDeleteJobApp}
            refreshJobApps={refreshJobApps}
          />
        </Grid>
      </Grid>
      <CreateDialog
        dialogProps={createDialogProps}
        handleClose={handleCreateDialogClose}
        onSubmit={handleCreateJobApp}
        formContactSuite={formContactSuite}
        type={"create"}
      />
      <ExportDialog
        dialogProps={exportDialogProps}
        userId={userId}
        handleClose={handleExportDialogClose}
      />
      <Footer />
    </Box>
  );
};

export default Layout;
