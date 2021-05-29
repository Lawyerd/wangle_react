import { Route, Switch } from "react-router-dom";

import { Row, Col, Container } from "react-bootstrap";
import Navigation from "../../components/Navigation.js";
import User from "./User/User.js";
import DashBoard from "./Admin_dashboard.js";

function Admin({ match }) {
  console.log(match.path);
  const navigation_list = [
    {
      title: "User",
      link: "/admin/user",
      disable: false,
    },
    {
      title: "Item",
      link: "/",
      disable: true,
    },
  ];
  const default_route = "/";
  return (
    <Row>
      <Col md={2}>
        <Navigation list={navigation_list} home={default_route} />
      </Col>
      <Col md={8}>
        <Container>
          <Switch>
            <Route exact path={`${match.path}`} component={DashBoard} />
            <Route path={`${match.path}/user`} component={User} />
          </Switch>
        </Container>
      </Col>
      <Col md={2}></Col>
    </Row>
  );
}

export default Admin;
