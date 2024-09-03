import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import Title from "components/Title";
import ActionButtons from "components/ActionButtons";
import JobAppContent from "views/JobAppContent";
import CreateDialog from "components/CreateOrEditDialog";
import useCreateDialog from "hooks/useCreateDialog";
import UniqueIdDialog from "components/UniqueIdDialog";
import useUniqueIdDialog from "hooks/useUniqueIdDialog";
import SyncDataDialog from "components/SyncDataDialog";
import useSyncDataDialog from "hooks/useSyncDataDialog";
import useJobApps from "hooks/useJobApps";
import Footer from "components/Footer";
import Notification from "components/Notification";

import { styles } from "./styles";
import useNotification from "hooks/useNotification";
import SearchBar from "components/SearchBar";
import { useMediaQuery } from "@mui/material";

const Layout = () => {
  const { handleOpenNotification, snackbarProps, alertProps, message } =
    useNotification();

  const {
    jobApps,
    setJobApps,
    updateStatus,
    handleDeleteJobApp,
    refreshJobApps,
    activeSortingOption,
    handleSetActiveSortingOption,
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
    syncDataDialogProps,
    handleOpenSyncDataDialog,
    handleClose: handleSyncDataDialogClose,
    handleSyncData,
    loading: syncDataLoading,
  } = useSyncDataDialog(refreshJobApps, handleOpenNotification);

  const {
    uniqueIdDialogProps,
    handleOpenUniqueIdDialog,
    handleClose: handleUniqueIdDialogClose,
    userId,
  } = useUniqueIdDialog();

  const isSearchBarAndActionButtonsOverlapping =
    useMediaQuery("(max-width:750px)");
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

        <Grid xs={9.5} container item justifyContent={"space-between"}>
          <Grid
            xs={isSearchBarAndActionButtonsOverlapping && 12}
            item
            sx={styles.searchBarHolder}
          >
            <SearchBar />
          </Grid>
          <Grid
            xs={isSearchBarAndActionButtonsOverlapping && 12}
            item
            sx={isSearchBarAndActionButtonsOverlapping && { py: 2 }}
          >
            <ActionButtons
              jobApps={jobApps}
              activeSortingOption={activeSortingOption}
              handleSetActiveSortingOption={handleSetActiveSortingOption}
              handleClickCreate={handleOpenCreateDialog}
              handleClickSyncData={handleOpenSyncDataDialog}
              handleClickGetUniqueId={handleOpenUniqueIdDialog}
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
      <SyncDataDialog
        dialogProps={syncDataDialogProps}
        handleClose={handleSyncDataDialogClose}
        handleSyncData={handleSyncData}
        loading={syncDataLoading}
      />
      <UniqueIdDialog
        dialogProps={uniqueIdDialogProps}
        userId={userId}
        handleClose={handleUniqueIdDialogClose}
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
