import React from "react";
import Box from "@mui/material/Box";
import Title from "components/Title";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { styles } from "./styles";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const Layout = () => {
  return (
    <Box sx={styles.mainContainer}>
      <Grid
        container
        spacing={2}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Grid xs={12} item />

        <Grid xs={11} item>
          <Title />
        </Grid>

        <Grid xs={11} container item justifyContent={"flex-end"}>
          <Grid>
            <Item>Create button</Item>
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
