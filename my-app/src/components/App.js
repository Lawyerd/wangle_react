import "../css/App.css";
import { Route, BrowserRouter } from "react-router-dom";
// import { HashRouter as Router} from "react-router-dom";

import Home from "../routes/Home";
import Navigation from "../components/Navigation_.js";
import Header from "../components/Header.js";
import { Row, Col } from "react-bootstrap";
import Detail from "../routes/Detail.js";
import About from "../routes/About.js";
import Create from "../routes/Create.js";
import Update from "../routes/Update.js";

function App() {
  const navigation_list = [
    {
      title: "Create",
      link: "/create",
      disable: false,
    },
    {
      title: "Disabled",
      link: "/",
      disable: true,
    },
  ];

  const default_route = "/";
  return (
    <>
      <BrowserRouter>
        <Header />
        <Row>
          <Col md={2}>
            <Navigation list={navigation_list} home={default_route} />
          </Col>
          <Col md={8}>
            <Route path="/" exact={true} component={Home} />
            <Route path="/user/:id" component={Detail} />
            <Route path="/about" component={About} />
            <Route path="/create" component={Create} />
            <Route path="/update/:id" component={Update} />
          </Col>
          <Col md={2} style={{ padding: "0px" }}></Col>
          {/* <Route path="/:id" component={Detail} /> */}
        </Row>
      </BrowserRouter>
    </>
  );
}

export default App;
