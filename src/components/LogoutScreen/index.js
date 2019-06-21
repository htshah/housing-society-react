import React from "react";

import { AuthConsumer } from "../../common/Providers/Auth";

export default () => {
  return (
    <AuthConsumer>
      {({ isAuth, logout }) => {
        logout();
        window.location.reload();
        return "Logging out...";
      }}
    </AuthConsumer>
  );
};
