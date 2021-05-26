import React from "react";
import { Nav, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

import "../css/Navigation.css";

function navigation() {
  return (
    <>
      <Card
        style={{ position: "fixed", marginLeft: "20px", marginTop: "40px" }}
      >
        <Card.Body
          className="card-body text-center"
          style={{ padding: "0px", margin: "0px" }}
        >
          <Nav defaultActiveKey="/home" className="flex-column">
            <Nav.Link as={Link} to="/create">
              Create
            </Nav.Link>
            <Nav.Link eventKey="disabled" disabled>
              Disabled
            </Nav.Link>
          </Nav>
        </Card.Body>
      </Card>
    </>
  );
}

export default navigation;
