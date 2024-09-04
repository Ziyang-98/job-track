import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { styles } from "./styles";
import { useMediaQuery } from "@mui/material";

import Title from "components/Title";
import ActionButtons from "components/ActionButtons";
import JobAppContent from "views/JobAppContent";
import CreateDialog from "components/CreateOrEditDialog";
import ManageProfileDialog from "components/ManageProfileDialog";
import SyncDataDialog from "components/SyncDataDialog";
import SearchBar from "components/SearchBar";
import Footer from "components/Footer";
import Notification from "components/Notification";

import useJobApps from "hooks/useJobApps";
import useCreateDialog from "hooks/useCreateDialog";
import useFilteredJobApps from "hooks/useFilteredJobApps";
import useSyncDataDialog from "hooks/useSyncDataDialog";
import useManageProfileDialog from "hooks/useManageProfileDialog";
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
    activeSortingOption,
    handleSetActiveSortingOption,
  } = useJobApps(handleOpenNotification);

  const { filteredJobApps, searchFilter, setSearchFilter } =
    useFilteredJobApps(jobApps);

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
    manageProfileProps,
    handleOpenManageProfileDialog,
    handleClose: handleManageProfileDialogClose,
    userId,
    handleDeleteUser,
    loadingDeleteUser,
    handleResetUserId,
    loadingResetUserId,
  } = useManageProfileDialog(refreshJobApps, handleOpenNotification);

  const isSearchBarAndActionButtonsOverlapping =
    useMediaQuery("(max-width:840px)");
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
            <SearchBar
              searchFilter={searchFilter}
              setSearchFilter={setSearchFilter}
            />
          </Grid>
          <Grid
            xs={isSearchBarAndActionButtonsOverlapping && 12}
            item
            sx={isSearchBarAndActionButtonsOverlapping ? { py: 2 } : {}}
          >
            <ActionButtons
              jobApps={jobApps}
              activeSortingOption={activeSortingOption}
              handleSetActiveSortingOption={handleSetActiveSortingOption}
              handleClickCreate={handleOpenCreateDialog}
              handleClickSyncData={handleOpenSyncDataDialog}
              handleOpenManageProfileDialog={handleOpenManageProfileDialog}
            />
          </Grid>
        </Grid>

        <Grid item xs={11}>
          <JobAppContent
            jobApps={jobApps}
            filteredJobApps={filteredJobApps}
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
      <ManageProfileDialog
        dialogProps={manageProfileProps}
        userId={userId}
        handleClose={handleManageProfileDialogClose}
        handleDeleteUser={handleDeleteUser}
        loadingDeleteUser={loadingDeleteUser}
        handleResetUserId={handleResetUserId}
        loadingResetUserId={loadingResetUserId}
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
