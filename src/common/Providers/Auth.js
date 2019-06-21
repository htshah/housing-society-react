import React, { useState, useContext } from "react";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";

import ApiAuth from "../../api/Auth";

const AuthContext = React.createContext();
const userCookieName = "token";

const isUserAdmin = () => {
  const token = Cookies.get(userCookieName);
  const payload = jwtDecode(token);
  return payload["sub"] === "admin";
};

const AuthProvider = props => {
  const [isAuth, setAuth] = useState(
    typeof Cookies.get(userCookieName) !== "undefined"
  );

  const [isAdmin] = useState(!isAuth ? false : isUserAdmin());

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
        .then(res => resolve(res.data))
        .catch(err => reject(err));
    });
  };

  const logout = () => {
    Cookies.remove(userCookieName);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuth: isAuth,
        isAdmin: isAdmin,
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

const useAuth = () => {
  const context = useContext(AuthContext);
  return context;
};

export default AuthContext;
export { AuthProvider, AuthConsumer, useAuth };
