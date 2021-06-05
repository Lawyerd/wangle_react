import "../css/App.css";
import { Route, BrowserRouter, Switch } from "react-router-dom";

import AuthRoute from "../components/Login/AuthRoute";
import React, { useState, useEffect } from "react";
import Header from "../components/Header.js";
import About from "./About.js";
import Index from "./Index.js";
import Login from "./Login.js";
import { useCookies } from "react-cookie";

import Admin from "./Admin/Admin.js";

function App() {
  const [cookies] = useCookies(["user"]);
  console.log("app");
  console.log(cookies);

  return (
    <>
      <BrowserRouter>
        <Header />
        <Switch>
          <Route exact path="/" component={Index} />
          {/* <AuthRoute
            // authority={user.authority}
            path="/admin"
            component={Admin}
          /> */}
          <Route path="/admin" component={Admin} />
          {/* <Route path="/admin" component={Admin} /> */}
          <Route path="/about" component={About} />
          <Route path="/login" component={Login} />
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
