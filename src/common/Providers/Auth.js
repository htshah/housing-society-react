import React, { useState } from "react";
import Cookies from "js-cookie";

import ApiAuth from "../../api/Auth";

const AuthContext = React.createContext();
const userCookieName = "token";

const AuthProvider = props => {
  const [isAuth, setAuth] = useState(
    typeof Cookies.get(userCookieName) !== "undefined"
  );

  const login = (email, password) => {
    return new Promise((resolve, reject) => {
      ApiAuth.login(email, password)
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  };

  const register = data => {
    return new Promise((resolve, reject) => {
      ApiAuth.register(data)
        .then(response => resolve(response))
        .catch(err => reject(err));
    });
  };

  const logout = () => {
    return new Promise((resolve, reject) => {
      ApiAuth.logout()
        .then(res => {
          setAuth(false);
          resolve(true);
        })
        .catch(error => {
          reject(false);
        });
    });
  };

  return (
    <AuthContext.Provider
      value={{
        isAuth: isAuth,
        register: register,
        login: login,
        logout: logout,
        setAuth: setAuth
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

const AuthConsumer = AuthContext.Consumer;
export default AuthContext;
export { AuthProvider, AuthConsumer };
