import React from "react";
import { Nav, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

import "../css/Navigation.css";

function navigation(props) {
  const navigation_list = props.list;
  const default_route = props.home;

  return (
    <>
      <Card
        style={{ position: "fixed", marginLeft: "20px", marginTop: "40px" }}
      >
        <Card.Body
          className="card-body text-center"
          style={{ padding: "0px", margin: "0px" }}
        >
          <Nav defaultActiveKey={default_route} className="flex-column">
            {navigation_list.map(navigation => {
              return (
                <Nav.Link
                  key={navigation.title}
                  as={Link}
                  to={navigation.link}
                  disabled={navigation.disable}
                >
                  {navigation.title}
                </Nav.Link>
              );
            })}
          </Nav>
        </Card.Body>
      </Card>
    </>
  );
}

export default navigation;
