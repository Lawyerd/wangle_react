// import axios from "axios";
// import base_url from "../data/base_url.js";
import { useCookies } from "react-cookie";
import { Route, Redirect } from "react-router-dom";
import React, { useEffect, useState } from "react";
// import { Redirect } from "react-router";

function Oauth() {
  const [cookies, setCookie, removeCookie] = useCookies([]);
  const [login, setLogin] = useState(false);

  //   console.log(cookies);
  useEffect(() => {
    console.log(cookies.kakao_user);
    setCookie("user", cookies.kakao_user);
    removeCookie("kakao_user");
    setLogin(true);
  }, []);

  //   useEffect(() => {
  //     get_data();
  //   }, []);
  //   async function get_data() {
  //     const data = await axios({
  //       method: "get",
  //       url: base_url + `/auth/kakao/call`,
  //     });

  //     console.log(data);
  //   }
  if (login) {
    return <Redirect to={{ pathname: "/" }} />;
  }
  return <h1>data</h1>;
}
export default Oauth;
