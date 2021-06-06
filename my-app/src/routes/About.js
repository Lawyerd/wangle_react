import React from "react";
import "../css/About.css";
import { Card } from "react-bootstrap";
import { Row, Col, Container } from "react-bootstrap";

function About() {
  return (
    <Row>
      <Col md={2}></Col>
      <Col md={8}>
        <Container>
          <Card style={({ width: "18rem" }, { justifyContent: "center" })}>
            <Card.Body>
              <Card.Title>Tommorrow never comes</Card.Title>
              <Card.Text>
                <list>
                  <ol>email validation</ol>
                  <ol>user profile</ol>
                  <ol>sign up</ol>
                </list>
              </Card.Text>
            </Card.Body>
          </Card>
        </Container>
      </Col>
      <Col md={2}></Col>
    </Row>
  );
}

export default About;
