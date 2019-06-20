import React, { useState, useEffect } from "react";
import {
  SwipeableDrawer,
  List,
  ListItem,
  ListItemIcon,
  Icon,
  ListItemText,
  Grid,
  Typography,
  Divider,
} from "@material-ui/core";

import { StyledLink as Link } from "../common/Link";

import ApiProfile from "../api/Profile";

export default ({
  isOpened,
  onClose,
  disableSwipeToOpen = false,
  swipeAreaWidth = 15,
}) => {
  const [isOpen, setOpen] = useState(isOpened);
  const [profile, setProfile] = useState({
    first_name: "User",
    last_name: "",
    parkings: 0,
    vehicles: 0,
  });

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    onClose();
    setOpen(false);
  };

  const listItems = [
    { text: "Home", icon: "search", link: "/home" },
    { text: "Bookings", icon: "date_range", link: "/bookings" },
    { text: "Parkings", icon: "local_parking", link: "/parking" },
    { text: "Vehicles", icon: "directions_car", link: "/vehicles" },
    <Divider light style={{ margin: "5px 0 5px 45px" }} />,
    { text: "Profile", icon: "perm_identity", link: "/profile" },
    { text: "Logout", icon: "power_settings_new", link: "/logout" },
  ];

  useEffect(() => {
    setOpen(isOpened);
  }, [isOpened]);

  useEffect(() => {
    ApiProfile.get().then(res => {
      setProfile(res);
    });
  }, []);

  return (
    <SwipeableDrawer
      anchor="left"
      open={isOpen}
      onClose={() => handleClose()}
      onOpen={() => handleOpen()}
      swipeAreaWidth={swipeAreaWidth}
      disableSwipeToOpen={disableSwipeToOpen}
    >
      <div
        tabIndex={0}
        role="button"
        style={{
          width: "275px",
          padding: "15px 0",
        }}
      >
        <Grid
          container
          justify="flex-start"
          alignItems="center"
          style={{
            padding: "15px",
          }}
        >
          <Grid item style={{ paddingLeft: "15px" }}>
            <Typography variant="h5">
              {`${profile.first_name} ${profile.last_name}`}
            </Typography>
            <Typography variant="caption">
              {profile.parkings} parkings, {profile.vehicles} vehicles
            </Typography>
          </Grid>
        </Grid>
        <Divider light />

        <List style={{ padding: "15px 0" }}>
          {listItems.map((element, index) => {
            if (React.isValidElement(element)) {
              return <element.type {...element.props} key={index} />;
            }
            const { text, icon, link } = element;
            return (
              <Link key={index} to={link} style={{ width: "100%" }}>
                <ListItem
                  button
                  key={text}
                  style={{
                    width: "calc(100% - 15px)",
                    borderTopRightRadius: "30px",
                    borderBottomRightRadius: "30px",
                  }}
                >
                  <ListItemIcon>
                    <Icon fontSize="small">{icon}</Icon>
                  </ListItemIcon>
                  <ListItemText
                    primary={text}
                    primaryTypographyProps={{
                      variant: "subtitle2",
                      color: "textPrimary",
                    }}
                    style={{ paddingLeft: "0" }}
                  />
                </ListItem>
              </Link>
            );
          })}
        </List>
      </div>
    </SwipeableDrawer>
  );
};
