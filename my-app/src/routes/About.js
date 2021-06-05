import React, { useEffect } from "react";
// import { useCookies } from "react-cookie";
import "../css/About.css";
import { Card } from "react-bootstrap";
import { Row, Col, Container } from "react-bootstrap";

function About() {
  // const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  // useEffect(() => {
  //   if (cookies.user === undefined) {
  //     setCookie("user", "hello");
  //   }
  // }, []);

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

export default About;
