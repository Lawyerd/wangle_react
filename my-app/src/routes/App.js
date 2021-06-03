import "../css/App.css";
import { Link, Route, BrowserRouter, Switch } from "react-router-dom";
import { signIn } from "../components/Login/Auth.js";
import AuthRoute from "../components/Login/AuthRoute";
import LoginForm from "../components/Login/LoginForm";

import React, { useState } from "react";
import Header from "../components/Header.js";
import About from "./About.js";
import Index from "./Index.js";
import Login from "./Login.js";

import Admin from "./Admin/Admin.js";

function App() {
  const [user, setUser] = useState(null);
  const authenticated = user != null;
  // const authenticated = true;

  const login = ({ email, password }) => setUser(signIn({ email, password }));

  return (
    <>
      <BrowserRouter>
        <Header authenticated={authenticated} setUser={setUser} />

        <Switch>
          <Route exact path="/" component={Index} />
          <AuthRoute
            authenticated={authenticated}
            path="/admin"
            component={Admin}
          />
          {/* <Route path="/admin" component={Admin} /> */}
          <Route path="/about" component={About} />
          <Route path="/login" component={Login} />
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
