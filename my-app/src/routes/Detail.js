import React, { useState, useEffect, useCallback } from "react";
import { Redirect } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
import "../css/Detail.css";
import { Link } from "react-router-dom";
import axios from "axios";

function Detail(params) {
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [values, setValues] = useState({
    id: "",
    name: "",
    phone: "",
    email: "",
    country: "",
    birth: "",
  });
  const [deleted, setDeleted] = useState(false);
  const get_data = useCallback(async () => {
    const user_data = await axios.get(`http://localhost:2400/${page}`);
    const user = user_data.data[0];
    setValues(user);
  }, [page]);
  const handleClick = () => {
    if (window.confirm(`Delete ${values.name}?`)) {
      axios({
        method: "post",
        url: "http://localhost:2400/delete",
        data: { id: values.id },
      });
      setDeleted(true);
    }
  };
  useEffect(() => {
    if (params.match.params.id !== undefined) {
      setPage(params.match.params.id);
    }
  }, [params.match.params.id]);
  useEffect(() => {
    if (page !== 0) {
      get_data(page);
      setIsLoading(false);
    }
  }, [page, get_data]);

  if (deleted) {
    return <Redirect to={"/"} />;
  }

  return (
    <>
      <Card
        style={{
          justifyContent: "center",
          minWidth: "11rem",
        }}
      >
        {isLoading ? (
          <div className="spinner-border" role="status"></div>
        ) : (
          <Card.Body>
            <Card.Title>{values.name}</Card.Title>
            <Card.Text>{values.phone}</Card.Text>
            <Card.Text>{values.email}</Card.Text>
            <Card.Text>{values.country}</Card.Text>
            <Card.Text>{values.birth}</Card.Text>

            <Button
              type="button"
              onClick={handleClick}
              className="btn btn-dark"
              style={{ margin: "10px" }}
            >
              delete
            </Button>

            <Link to={{ pathname: `/update/${values.id}`, state: { page } }}>
              <Button
                type="button"
                className="btn btn-dark"
                style={{ margin: "10px" }}
              >
                update
              </Button>
            </Link>
          </Card.Body>
        )}
      </Card>
    </>
  );
}
export default Detail;
