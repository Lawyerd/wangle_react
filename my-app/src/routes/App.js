import "../css/App.css";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import AuthRoute from "../components/Auth/AuthRoute";

import Header from "../components/Header.js";
import About from "./About.js";
import Index from "./Index.js";
import Login from "./Auth/Login.js";
import SignUp from "./Auth/SignUp.js";
import Profile from "./Profile.js";
import Oauth from "./Auth/Oauth.js";
import BoardRouter from "./Board/BoardRouter.js";
import AdminRouter from "./Admin/AdminRouter.js";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Switch>
          <Route exact path="/" component={Index} />
          <AuthRoute auth={["admin"]} path="/admin" component={AdminRouter} />
          <Route path="/about" component={About} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={SignUp} />
          <Route path="/oauth" component={Oauth} />
          <AuthRoute
            auth={["user", "user_kakao", "admin"]}
            path="/board"
            component={BoardRouter}
          />
          <AuthRoute
            auth={["user", "admin", "user_kakao"]}
            path="/profile"
            component={Profile}
          />
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
