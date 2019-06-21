import React from "react";
import { Grid, Typography, Fab, Icon } from "@material-ui/core";

export default function({ title, showSideNavBtn, onSideNavBtnClick }) {
  return (
    <Grid container justify={"flex-start"} alignItems={"center"} spacing={8}>
      {/* Nav Bar */}
      {showSideNavBtn && (
        <Grid item>
          <Fab
            aria-label="Add"
            style={{
              background: "transparent",
              boxShadow: "none"
            }}
            size="small"
            onClick={onSideNavBtnClick}
          >
            <Icon>menu</Icon>
          </Fab>
        </Grid>
      )}
      {/* Render title as component if not passed as string */}
      <Grid item>
        <Typography variant="h4" align="left">
          {title}
        </Typography>
      </Grid>
    </Grid>
  );
}
