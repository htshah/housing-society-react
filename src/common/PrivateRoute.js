import React from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthConsumer } from "./Providers/Auth";

export default props => (
  <AuthConsumer>
    {({ isAuth }) => {
      return isAuth === true ? (
        <Route {...props} />
      ) : (
        <Redirect to={{ pathname: "/", state: { from: props.location } }} />
      );
    }}
  </AuthConsumer>
);
