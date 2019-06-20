import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => (
  <React.Fragment>
    <h1>404</h1>
    <h2>Page Not Found!</h2>
    <Link to="/home">Go to home page..</Link>
  </React.Fragment>
);

export default NotFound;
