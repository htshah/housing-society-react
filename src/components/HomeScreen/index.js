import React, { useState, useEffect } from "react";
import { Grid, Typography, Drawer } from "@material-ui/core";
import styled from "styled-components";

// Common components
import { PageWrapper } from "../../common/Wrapper";
import SimplePageGrid from "../../common/SimplePageGrid";

import SimpleItemCard from "./components/SimpleItemCard";

import { ColorPalette } from "../../common/Theme";
import ApiNotice from "../../api/Notice.js";

const StyledSectiontitle = styled(Typography)`
  color: ${ColorPalette.text.tertiary};
  padding: 5px 0px;
  text-transform: uppercase;
`;
const SectionTitle = props => (
  <StyledSectiontitle variant="subtitle2" {...props} />
);

export default function() {
  const [noticeList, setNoticeList] = useState([]);
  const [isBottomDrawerVisible, setBottomDrawerVisible] = useState(false);
  const [selectedNotice, setSelectedNotice] = useState(null);

  useEffect(() => {
    ApiNotice.getAll().then(res => setNoticeList(res.notice));
  }, []);

  useEffect(() => {
    if (selectedNotice !== null) setBottomDrawerVisible(true);
  }, [selectedNotice]);

  const renderNotice = ({ id, title, description }, onClick = () => {}) => (
    <SimpleItemCard
      key={id}
      title={title}
      subtitle={description}
      onClick={onClick}
    />
  );
  return (
    <React.Fragment>
      {/* Notice detailed card */}
      {selectedNotice && (
        <Drawer
          anchor="bottom"
          open={isBottomDrawerVisible}
          onClose={() => {
            setBottomDrawerVisible(false);
          }}
        >
          <div style={{ padding: "30px 15px" }}>
            <Typography variant="h4" style={{ marginBottom: "20px" }}>
              {selectedNotice.title}
            </Typography>
            <Typography variant="h6" color="textSecondary">
              {selectedNotice.description}
            </Typography>
          </div>
        </Drawer>
      )}
      <PageWrapper>
        <SimplePageGrid showSideNavBtn title="Home" justify="flex-start">
          <Grid
            item
            style={{
              position: "sticky",
              background: "#fff",
              paddingBottom: "0",
              paddingTop: "0"
            }}
          >
            <SectionTitle>notices</SectionTitle>
          </Grid>
          {!noticeList.length ? (
            <Grid item>
              <Typography
                variant="body1"
                align="center"
                style={{ padding: "2rem" }}
              >
                All notices will appear here.
              </Typography>
            </Grid>
          ) : (
            noticeList.map(notice =>
              renderNotice(notice, () => {
                setSelectedNotice(notice);
              })
            )
          )}
        </SimplePageGrid>
      </PageWrapper>
    </React.Fragment>
  );
}
