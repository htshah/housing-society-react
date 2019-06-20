import React from "react";
import { Grid, Typography } from "@material-ui/core";

export default function({
  title,
  justify,
  direction,
  alignItems,
  gridSpacing,
  children,
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
      {/* Render title as component if not passed as string */}
      {typeof title === "string" ? (
        <Grid item>
          <Typography variant="h2" align="left">
            {title}
          </Typography>
        </Grid>
      ) : (
        title
      )}

      {children}
    </Grid>
  );
}
