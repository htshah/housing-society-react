import React, { useState, useEffect } from "react";
import { Grid, Typography, Drawer } from "@material-ui/core";
import styled from "styled-components";

// Common components
import { PageWrapper } from "../../common/Wrapper";
import SimplePageGrid from "../../common/SimplePageGrid";
import SimpleItemCard from "../../common/SimpleItemCard";

import { ColorPalette } from "../../common/Theme";
import ApiEvent from "../../api/Event.js";

import EventAddForm from "./components/Form";
import EventRegisterForm from "./components/RegisterForm";

const StyledSectiontitle = styled(Typography)`
  color: ${ColorPalette.text.tertiary};
  padding: 5px 0px;
  text-transform: uppercase;
`;
const SectionTitle = props => (
  <StyledSectiontitle variant="subtitle2" {...props} />
);

const renderEvent = (
  { id, title, description, amount },
  onClick = () => {}
) => (
  <SimpleItemCard
    key={id}
    title={title}
    subtitle={description}
    price={amount}
    onClick={onClick}
  />
);

export default function() {
  const [eventList, setEventList] = useState([]);
  const [isBottomDrawerVisible, setBottomDrawerVisible] = useState(false);
  const [bottomDrawerContentType, setBottomDrawerContentType] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    ApiEvent.getAll().then(res => setEventList(res.event));
  }, []);

  useEffect(() => {
    if (selectedEvent !== null) {
      setBottomDrawerVisible(true);
      setBottomDrawerContentType("event");
    }
  }, [selectedEvent]);

  useEffect(() => {
    if (bottomDrawerContentType !== null) setBottomDrawerVisible(true);
  }, [bottomDrawerContentType]);

  return (
    <React.Fragment>
      {/* Event detailed card */}
      <Drawer
        anchor="bottom"
        open={isBottomDrawerVisible}
        onClose={() => {
          setBottomDrawerVisible(false);
          setBottomDrawerContentType(null);
          setSelectedEvent(null);
        }}
      >
        {bottomDrawerContentType === "event" && selectedEvent && (
          <EventRegisterForm
            event={selectedEvent}
            onSuccessfulSubmit={() => {
              setTimeout(() => {
                setBottomDrawerVisible(false);
                setBottomDrawerContentType(null);
              }, 500);
            }}
          />
        )}
        {bottomDrawerContentType === "form" && (
          <EventAddForm
            onSuccessfulSubmit={event => {
              setEventList([event, ...eventList]);
              setBottomDrawerVisible(false);
              setBottomDrawerContentType(null);
            }}
          />
        )}
      </Drawer>
      <PageWrapper>
        <SimplePageGrid showSideNavBtn title="Events" justify="flex-start">
          <Grid
            item
            container
            style={{
              paddingBottom: "0",
              paddingTop: "0"
            }}
            justify="space-between"
          >
            <Grid item>
              <SectionTitle>Events</SectionTitle>
            </Grid>

            <Grid item style={{ cursor: "pointer" }}>
              <Typography
                variant="h4"
                color="textSecondary"
                onClick={() => setBottomDrawerContentType("form")}
              >
                +
              </Typography>
            </Grid>
          </Grid>
          {!eventList || !eventList.length ? (
            <Grid item>
              <Typography
                variant="body1"
                align="center"
                style={{ padding: "2rem" }}
              >
                All Events will appear here.
              </Typography>
            </Grid>
          ) : (
            eventList.map(event =>
              renderEvent(event, () => {
                setSelectedEvent(event);
              })
            )
          )}
        </SimplePageGrid>
      </PageWrapper>
    </React.Fragment>
  );
}
