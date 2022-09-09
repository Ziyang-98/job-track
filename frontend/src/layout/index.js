import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import Title from "components/Title";
import CreateButton from "components/ActionButtons";
import JobAppContent from "views/JobAppContent";

import { styles } from "./styles";

const Layout = () => {
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
            <CreateButton />
          </Grid>
        </Grid>

        <Grid item xs={11}>
          <JobAppContent />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Layout;
