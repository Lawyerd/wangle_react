import React, { useState, useEffect } from "react";
import "../css/Home.css";
import Card from "../components/Card.js";
import { Row, Container, Col, Spinner } from "react-bootstrap";

import axios from "axios";

function Home() {
  const [users, setUsers] = useState({
    name: "",
    phone: "",
    email: "",
    country: "",
    birth: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    get_users();
  }, []);
  const get_users = async () => {
    var data = await axios.get("http://localhost:2400/pages");
    setUsers(data.data);
    setIsLoading(false);
  }; // getMovies라는 함수 정의

  return (
    <>
      <Container style={{ textAlign: "center" }}>
        <h1>Main</h1>
      </Container>

      <Container style={{ textAlign: "center" }}>
        <div className="mt-3">
          {isLoading ? (
            <Spinner animation="border" role="status" />
          ) : (
            <Row>
              {users.map(user => (
                <Col md={4} key={String(user.id)}>
                  <Card
                    key={user.id}
                    id={user.id}
                    title={user.name}
                    description={user.phone}
                  />
                </Col>
              ))}
            </Row>
          )}
        </div>
      </Container>
    </>
  );
}
export default Home;
