import { Route, Switch } from "react-router-dom";

import { Row, Col, Container } from "react-bootstrap";
import Navigation from "../../components/Navigation.js";
import Index from "./BoardIndex.js";
import Write from "./BoardWrite";
import View from "./BoardView";

function Admin({ match }) {
  // const navigation_list = [
  //   {
  //     title: "User",
  //     link: "/admin/user",
  //     disable: false,
  //   },
  //   {
  //     title: "Item",
  //     link: "/",
  //     disable: true,
  //   },
  // ];
  const default_route = "/";
  return (
    <Row>
      <Col md={1}>
        {/* <Navigation list={navigation_list} home={default_route} /> */}
      </Col>
      <Col md={10}>
        <Switch>
          <Route exact path={`${match.path}`} component={Index} />
          <Route exact path={`${match.path}/post/write`} component={Write} />
          <Route exact path={`${match.path}/post/:id`} component={View} />

          {/* <Route path={`${match.path}/create`} component={User} /> */}
        </Switch>
      </Col>
      <Col md={1}></Col>
    </Row>
  );
}

export default Admin;
