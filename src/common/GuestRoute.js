import React from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthConsumer } from "./Providers/Auth";

export default props => (
  <AuthConsumer>
    {({ isAuth }) => {
      return isAuth === false ? <Route {...props} /> : <Redirect to="/home" />;
    }}
  </AuthConsumer>
);
