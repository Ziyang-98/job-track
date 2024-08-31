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
import ImportDialog from "components/ImportDialog";
import useImportDialog from "hooks/useImportDialog";
import useJobApps from "hooks/useJobApps";
import Footer from "components/Footer";
import Notification from "components/Notification";

import { styles } from "./styles";
import useNotification from "hooks/useNotification";

const Layout = () => {
  const { handleOpenNotification, snackbarProps, alertProps, message } =
    useNotification();

  const {
    jobApps,
    setJobApps,
    updateStatus,
    handleDeleteJobApp,
    refreshJobApps,
    sortingOption,
    handleSetSortingOption,
  } = useJobApps(handleOpenNotification);

  const {
    createDialogProps,
    handleOpenCreateDialog,
    handleClose: handleCreateDialogClose,
    handleCreateJobApp,
    formContactSuite,
    loading: loadingCreate,
  } = useCreateDialog(refreshJobApps, handleOpenNotification);

  const {
    importDialogProps,
    handleOpenImportDialog,
    handleClose: handleImportDialogClose,
    handleImportData,
    loading: importLoading,
  } = useImportDialog(refreshJobApps, handleOpenNotification);

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
              sortingOption={sortingOption}
              handleSetSortingOption={handleSetSortingOption}
              handleClickCreate={handleOpenCreateDialog}
              handleClickImport={handleOpenImportDialog}
              handleClickExport={handleOpenExportDialog}
            />
          </Grid>
        </Grid>

        <Grid item xs={11}>
          <JobAppContent
            jobApps={jobApps}
            setJobApps={setJobApps}
            updateStatus={updateStatus}
            refreshJobApps={refreshJobApps}
          />
        </Grid>
      </Grid>
      <CreateDialog
        dialogProps={createDialogProps}
        handleClose={handleCreateDialogClose}
        handleDeleteJobApp={handleDeleteJobApp}
        onSubmit={handleCreateJobApp}
        formContactSuite={formContactSuite}
        loadingSubmit={loadingCreate}
        type={"create"}
      />
      <ImportDialog
        dialogProps={importDialogProps}
        handleClose={handleImportDialogClose}
        handleImportData={handleImportData}
        loading={importLoading}
      />
      <ExportDialog
        dialogProps={exportDialogProps}
        userId={userId}
        handleClose={handleExportDialogClose}
      />
      <Notification
        snackbarProps={snackbarProps}
        alertProps={alertProps}
        message={message}
      />
      <Footer />
    </Box>
  );
};

export default Layout;
