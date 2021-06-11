import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import LoginForm from "../../components/Auth/LoginForm";

function Login() {
  return (
    <Row>
      <Col md={2}></Col>
      <Col md={8}>
        <Container>
          <LoginForm />
        </Container>
      </Col>
      <Col md={2}></Col>
    </Row>
  );
}

export default Login;
