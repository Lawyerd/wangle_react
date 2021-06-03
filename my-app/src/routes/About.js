import React from "react";
import "../css/About.css";
import { Card } from "react-bootstrap";
import { Row, Col, Container } from "react-bootstrap";

class About extends React.Component {
  render() {
    return (
      <Row>
        <Col md={2}></Col>
        <Col md={8}>
          <Container>
            <Card style={({ width: "18rem" }, { justifyContent: "center" })}>
              <Card.Body>
                <Card.Title>Slowly But Steady</Card.Title>
                <Card.Text>made by Lawyerd</Card.Text>
              </Card.Body>
            </Card>
          </Container>
        </Col>
        <Col md={2}></Col>
      </Row>
    );
  }
}

export default About;
