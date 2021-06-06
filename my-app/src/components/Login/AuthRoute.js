import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useCookies } from "react-cookie";

function AuthRoute({ component: Component, render, ...rest }) {
  const [cookies] = useCookies(["user"]);
  let auth = "";
  if (cookies.user !== undefined) {
    auth = cookies.user.authority;
  }
  console.log(auth);

  return (
    <>
      <Route
        {...rest}
        render={props =>
          auth === "admin" ? (
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
