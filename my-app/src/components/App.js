import "../css/App.css";
import { HashRouter as Router, Route } from "react-router-dom";
import Home from "../routes/Home";
import Navigation from "../components/Navigation.js";
import Header from "../components/Header.js";

import Detail from "../routes/Detail.js";
import About from "../routes/About.js";
import Create from "../routes/Create.js";
import Update from "../routes/Update.js";

function App() {
  return (
    <div className="body">
      <Router>
        <Header />
        <div className="row">
          <div className="col-2">
            <Navigation />
          </div>
          <div className="col-8">
            <Route path="/" exact={true} component={Home} />
            <Route path="/user/:id" component={Detail} />
            <Route path="/about" component={About} />
            <Route path="/create" component={Create} />
            <Route path="/update/:id" component={Update} />
          </div>
          {/* <Route path="/:id" component={Detail} /> */}
        </div>
      </Router>
    </div>
  );
}

export default App;
