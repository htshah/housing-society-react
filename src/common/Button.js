import React from "react";
import styled from "styled-components";
import { Button as MuiButton, Fab, Icon } from "@material-ui/core";
import { Link } from "react-router-dom";

export const Button = styled(({ noGutterBottom, white, ...props }) => (
  <MuiButton {...props} />
)).attrs(({ variant, white, full, size }) => ({
  variant: variant || "contained",
  color: white ? "default" : "primary",
  size: size || "large",
}))`
  ${props => (props.white ? "background:#fff !important" : "")}
  ${props => (props.noGutterBottom ? "" : "margin-bottom:20px !important")}
`;

export const IconButton = function({
  buttonColor,
  icon,
  iconColor,
  link,
  size,
  background,
  className,
  ...restProps
}) {
  return (
    <Fab
      className={className}
      component={Link}
      to={link || "#"}
      color={buttonColor || "secondary"}
      size={size || "medium"}
      //Conditionally add background prop
      {...background && { style: { background: background } }}
      {...restProps}
    >
      {/* Use Icons if string else render given component */}
      {typeof icon === "string" ? (
        <Icon style={{ color: iconColor || "#ffffff" }}>{icon}</Icon>
      ) : (
        icon
      )}
    </Fab>
  );
};
