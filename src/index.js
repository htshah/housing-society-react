import React from "react";
import ReactDOM from "react-dom";

import GlobalStyles from "./styled";
import Router from "./common/Router";

import { MuiThemeProvider } from "@material-ui/core";
import Theme from "./common/Theme";

import { AuthProvider } from "./common/Providers/Auth";

const App = () => (
  <MuiThemeProvider theme={Theme}>
    <GlobalStyles />
    <AuthProvider>
      <Router />
    </AuthProvider>
  </MuiThemeProvider>
);

ReactDOM.render(<App />, document.getElementById("root"));
