import "../css/App.css";
import { HashRouter as Router, Route } from "react-router-dom";
import Home from "../routes/Home";
import Navigation from "../components/Navigation.js";
import Detail from "../routes/Detail.js";
import About from "../routes/About.js";
import Create from "../routes/Create.js";
import Update from "../routes/Update.js";

function App() {
  return (
    <Router>
      <Navigation />
      <Route path="/" exact={true} component={Home} />
      <Route path="/user/:id" component={Detail} />
      <Route path="/about" component={About} />
      <Route path="/create" component={Create} />
      <Route path="/update/:id" component={Update} />

      {/* <Route path="/:id" component={Detail} /> */}
    </Router>
  );
}

export default App;
