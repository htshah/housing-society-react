import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import NotFound from "./NotFound";
// import RegisterScreen from "../components/RegisterScreen";
import LoginScreen from "../components/LoginScreen";
// import HomeScreen from "../components/LoginScreen";

import PrivateRoute from "./PrivateRoute";
import GuestRoute from "./GuestRoute";

const Router = () => (
  <BrowserRouter>
    <Switch>
      {/* <GuestRoute exact path="/register" component={RegisterScreen} /> */}
      <GuestRoute exact path="/login" component={LoginScreen} />

      {/* <PrivateRoute exact path="/home" component={HomeScreen} /> */}
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
);

export default Router;
