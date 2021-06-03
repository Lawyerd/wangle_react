import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import LoginForm from "../components/Login/LoginForm";

function Login({ authenticated, login, location }) {
  return (
    <Row>
      <Col md={2}></Col>
      <Col md={8}>
        <Container>
          <LoginForm authenticated={authenticated} login={login} />
        </Container>
      </Col>
      <Col md={2}></Col>
    </Row>
  );
}

export default Login;
