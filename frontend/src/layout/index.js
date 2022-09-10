import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import Title from "components/Title";
import ActionButtons from "components/ActionButtons";
import JobAppContent from "views/JobAppContent";
import CreateDialog from "components/CreateOrEditDialog";
import useCreateDialog from "hooks/useCreateDialog";
import { styles } from "./styles";

const Layout = () => {
  const {
    createDialogProps,
    handleOpenCreateDialog,
    handleClose,
    handleCreateJobApp,
    formContactSuite,
  } = useCreateDialog();

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
            <ActionButtons handleClickCreate={handleOpenCreateDialog} />
          </Grid>
        </Grid>

        <Grid item xs={11}>
          <JobAppContent />
        </Grid>
      </Grid>
      <CreateDialog
        dialogProps={createDialogProps}
        handleClose={handleClose}
        onSubmit={handleCreateJobApp}
        formContactSuite={formContactSuite}
        type={"create"}
      />
    </Box>
  );
};

export default Layout;
