import "../css/App.css";
import { Route, BrowserRouter, Switch } from "react-router-dom";

import Header from "../components/Header.js";
import About from "./About.js";
import Index from "./Index.js";

import Admin from "./Admin/Admin.js";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Switch>
          <Route exact path="/" component={Index} />
          <Route path="/admin" component={Admin} />
          <Route path="/about" component={About} />
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
