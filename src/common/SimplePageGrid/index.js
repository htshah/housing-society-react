import React, { useState } from "react";
import { Grid } from "@material-ui/core";
import NavBar from "./NavBar";
import SideNavBar from "./SideNavbar";

export default function({
  justify,
  direction,
  alignItems,
  gridSpacing,
  children,
  showSideNavBtn,
  title
}) {
  const [isSideBarVisible, setSideBarVisible] = useState(false);
  return (
    <React.Fragment>
      <SideNavBar
        isOpened={isSideBarVisible}
        onClose={() => setSideBarVisible(false)}
        disableSwipeToOpen
      />
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
          <NavBar
            showSideNavBtn
            onSideNavBtnClick={() => setSideBarVisible(true)}
            title={title}
          />
        </Grid>

        {children}
      </Grid>
    </React.Fragment>
  );
}
