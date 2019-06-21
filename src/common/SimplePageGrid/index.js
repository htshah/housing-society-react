import React from "react";
import { Grid } from "@material-ui/core";
import NavBar from "./NavBar";

export default function({
  justify,
  direction,
  alignItems,
  gridSpacing,
  children,
  ...navBarProps
}) {
  return (
    <Grid
      container
      direction={direction || "column"}
      justify={justify || "space-between"}
      alignItems={alignItems || "stretch"}
      spacing={gridSpacing || 32}
      style={{ minHeight: "inherit" }}
    >
      {/* Nav Bar */}
      <Grid item>
        <NavBar {...navBarProps} />
      </Grid>

      {children}
    </Grid>
  );
}
