import React from "react";
import "../css/About.css";
import { Card } from "react-bootstrap";
import { Row, Col, Container } from "react-bootstrap";
import newyork from "../img/newyork.jpg";

class Index extends React.Component {
  render() {
    return (
      <Row>
        <Col md={2}></Col>
        <Col md={8}>
          <Container>
            <Card style={({ width: "18rem" }, { justifyContent: "center" })}>
              <Card.Body>
                <img
                  src={newyork}
                  alt="newyork"
                  style={{ width: "58rem" }}
                ></img>
              </Card.Body>
            </Card>
          </Container>
        </Col>
        <Col md={2}></Col>
      </Row>
    );
  }
}

export default Index;
