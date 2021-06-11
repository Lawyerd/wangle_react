import { useCookies } from "react-cookie";
import { Redirect } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";

function Oauth() {
  const [cookies, setCookie, removeCookie] = useCookies([]);
  const [login, setLogin] = useState(false);

  useEffect(() => {
    console.log(cookies.kakao_user);
    setCookie("user", cookies.kakao_user);
    removeCookie("kakao_user");
    setLogin(true);
  }, []);

  if (login) {
    return <Redirect to={{ pathname: "/" }} />;
  }
  return (
    <div style={{ justifyContent: "center" }}>
      <Spinner></Spinner>
    </div>
  );
}
export default Oauth;
