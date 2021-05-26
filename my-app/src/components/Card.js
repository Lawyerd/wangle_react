import React from "react";
import { Link } from "react-router-dom";
import { Card, Button } from "react-bootstrap";

function card({ id, title, description }) {
  const page = id;
  return (
    <Card style={{ minWidth: "11rem" }}>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{description}</Card.Text>
        <Link to={{ pathname: `/user/${id}`, state: { page } }}>
          <Button variant="dark">more</Button>
        </Link>
      </Card.Body>
    </Card>
  );
}

export default card;
