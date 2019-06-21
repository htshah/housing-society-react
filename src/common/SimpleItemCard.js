import React from "react";
import styled from "styled-components";
import { Paper, Grid, Typography } from "@material-ui/core";
import { ColorPalette } from "./Theme";

const StyledSubtitle = styled(Typography)`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: calc(60vw);
  float: left;
`;
const Title = props => <StyledSubtitle variant="body2" {...props} />;
const Subtitle = props => <StyledSubtitle variant="caption" {...props} />;

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  margin: 0;
`;

const CircleDiv = styled.div`
  display: block;
  width: 40px;
  height: 40px;
  border-radius: 50%;
`;

const SimpleItemCard = styled(Paper)`
  padding: 10px 15px;
  border-radius: 0 !important;
  cursor: pointer;
  :active {
    background-color: ${ColorPalette.other.lightGrey};
  }
`;

export default ({ title, subtitle, price, onClick }) => {
  const colors = ["#f44242", "#769b11", "#119b94", "#721eb2"];
  const ALPHABET = "abcdefghijklmnopqrstuvwxyz".split("");
  const titleInitial = title.toLowerCase().charAt(0);

  return (
    <SimpleItemCard elevation={0} onClick={onClick}>
      <Grid container justify="space-between" alignItems="flex-start">
        {!price && (
          <Grid item>
            <CircleDiv
              style={{
                backgroundColor:
                  colors[
                    Math.floor(
                      (ALPHABET.indexOf(titleInitial) + 1) % colors.length
                    )
                  ]
              }}
            >
              <Typography
                variant="h6"
                align="center"
                style={{ color: "white", lineHeight: "40px" }}
              >
                {title.toUpperCase().charAt(0)}
              </Typography>
            </CircleDiv>
          </Grid>
        )}
        {/* Left section */}
        <Grid item container direction="column" xs={9}>
          <Grid item>
            <TitleWrapper>
              <Title>{title}</Title>
            </TitleWrapper>
            <Subtitle>{subtitle}</Subtitle>
          </Grid>
        </Grid>
        {/* Right section */}
        {price && (
          <Grid item xs>
            <Typography variant="h4" align="right">
              ₹{price}
            </Typography>
          </Grid>
        )}
      </Grid>
    </SimpleItemCard>
  );
};
