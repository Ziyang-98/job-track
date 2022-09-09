import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import Title from "components/Title";
import CreateButton from "components/CreateButton";

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

        <Grid xs={11} container item justifyContent={"flex-end"}>
          <Grid item>
            <CreateButton />
          </Grid>
        </Grid>

        <Grid item xs={10} justifyContent={"center"}>
          {/* <Grid item lg={2.2} sm={5.5} xs={11}>
            <Item>Planning to apply</Item>
          </Grid>
          <Grid item lg={2.2} sm={5.5} xs={11}>
            <Item>Applied</Item>
          </Grid>
          <Grid item lg={2.2} sm={5.5} xs={11}>
            <Item>Assessment/Interview</Item>
          </Grid>
          <Grid item lg={2.2} sm={5.5} xs={11}>
            <Item>Offered</Item>
          </Grid>
          <Grid item lg={2.2} sm={5.5} xs={11}>
            <Item>Rejected</Item>
          </Grid> */}
        </Grid>
      </Grid>
    </Box>
  );
};

export default Layout;
