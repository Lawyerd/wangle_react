import React from "react";
import { Route, Redirect } from "react-router-dom";

function AuthRoute({ authority, component: Component, render, ...rest }) {
  return (
    <>
      <Route
        {...rest}
        render={props =>
          authority === "admin" ? (
            <Component {...props} />
          ) : (
            <Redirect to={{ pathname: "/", state: { from: props.location } }} />
          )
        }
      />
    </>
  );
}

export default AuthRoute;
