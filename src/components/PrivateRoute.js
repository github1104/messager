import React from "react";
import { Route, Redirect } from "react-router-dom";


const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      component={(props) => {
        const user = localStorage.getItem("user")
          ? JSON.parse(localStorage.getItem("user"))
          : null;
        console.log(user);
        if (user) {
          console.log(14)
          return <Component {...props} />;
        } else {
          console.log(16)

          return <Redirect to={"/login"} />;
        }
      }}
    />
  );
};

export default PrivateRoute;
