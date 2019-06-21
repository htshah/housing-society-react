import React, { useState, useEffect } from "react";
import { Grid, Typography, Drawer } from "@material-ui/core";
import styled from "styled-components";

// Common components
import { PageWrapper } from "../../common/Wrapper";
import SimplePageGrid from "../../common/SimplePageGrid";
import { useAuth } from "../../common/Providers/Auth";

import SimpleItemCard from "../../common/SimpleItemCard";

import { ColorPalette } from "../../common/Theme";
import ApiNotice from "../../api/Notice.js";

import NoticeAddForm from "./components/Form";

const StyledSectiontitle = styled(Typography)`
  color: ${ColorPalette.text.tertiary};
  padding: 5px 0px;
  text-transform: uppercase;
`;
const SectionTitle = props => (
  <StyledSectiontitle variant="subtitle2" {...props} />
);

const renderNotice = ({ id, title, description }, onClick = () => {}) => (
  <SimpleItemCard
    key={id}
    title={title}
    subtitle={description}
    onClick={onClick}
  />
);
const renderSelectedNotice = ({ title, description }) => (
  <div style={{ padding: "30px 15px" }}>
    <Typography variant="h4" style={{ marginBottom: "20px" }}>
      {title}
    </Typography>
    <Typography variant="h6" color="textSecondary">
      {description}
    </Typography>
  </div>
);

export default function() {
  const [noticeList, setNoticeList] = useState([]);
  const [isBottomDrawerVisible, setBottomDrawerVisible] = useState(false);
  const [bottomDrawerContentType, setBottomDrawerContentType] = useState(null);
  const [selectedNotice, setSelectedNotice] = useState(null);

  const { isAdmin } = useAuth();

  useEffect(() => {
    ApiNotice.getAll().then(res => setNoticeList(res.notice));
  }, []);

  useEffect(() => {
    if (selectedNotice !== null) {
      setBottomDrawerVisible(true);
      setBottomDrawerContentType("notice");
    }
  }, [selectedNotice]);

  useEffect(() => {
    if (bottomDrawerContentType !== null) setBottomDrawerVisible(true);
  }, [bottomDrawerContentType]);

  return (
    <React.Fragment>
      {/* Notice detailed card */}
      <Drawer
        anchor="bottom"
        open={isBottomDrawerVisible}
        onClose={() => {
          setBottomDrawerVisible(false);
          setBottomDrawerContentType(null);
          setSelectedNotice(null);
        }}
      >
        {bottomDrawerContentType === "notice" &&
          selectedNotice &&
          renderSelectedNotice(selectedNotice)}
        {bottomDrawerContentType === "form" && (
          <NoticeAddForm
            onSuccessfulSubmit={notice => {
              setNoticeList([notice, ...noticeList]);
              setBottomDrawerVisible(false);
              setBottomDrawerContentType(null);
            }}
          />
        )}
      </Drawer>
      <PageWrapper>
        <SimplePageGrid showSideNavBtn title="Home" justify="flex-start">
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
              <SectionTitle>notices</SectionTitle>
            </Grid>

            {isAdmin && (
              <Grid item style={{ cursor: "pointer" }}>
                <Typography
                  variant="h4"
                  color="textSecondary"
                  onClick={() => setBottomDrawerContentType("form")}
                >
                  +
                </Typography>
              </Grid>
            )}
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
