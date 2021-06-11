import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useCookies } from "react-cookie";

function AuthRoute({ auth: license, component: Component, render, ...rest }) {
  console.log("Allow member : ");
  console.log(license);
  const [cookies] = useCookies(["user"]);
  let auth = "";
  if (cookies.user !== undefined) {
    auth = cookies.user.authority;
    console.log("This user's authority is : ");
    console.log(auth);
  }
  function id_verification(license) {
    for (var i = 0; i < license.length; i++) {
      if (license[i] === auth) {
        return true;
      }
    }
    return false;
  }
  const verified = id_verification(license);
  return (
    <>
      <Route
        {...rest}
        render={props =>
          verified ? (
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
