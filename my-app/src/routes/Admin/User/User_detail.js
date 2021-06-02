import React, { useState, useEffect, useCallback } from "react";
import { Redirect } from "react-router-dom";
import { Card, Button, Spinner } from "react-bootstrap";
import "../../../css/Detail.css";
import { Link } from "react-router-dom";
import axios from "axios";
const base_url =
  "http://ec2-13-124-149-215.ap-northeast-2.compute.amazonaws.com:9000";

function User_detail(params) {
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
    const user_data = await axios.get(base_url + `/${page}`);
    const user = user_data.data[0];
    setValues(user);
  }, [page]);
  const handleClick = () => {
    if (window.confirm(`Delete ${values.name}?`)) {
      axios({
        method: "post",
        url: base_url + "/delete",
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
    return <Redirect to={"/admin/user"} />;
  }

  if (params.match.params.id === "create") {
    return <></>;
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
          <Spinner animation="border" role="status" />
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

            <Link
              to={{
                pathname: `/admin/user/update/${values.id}`,
                state: { page },
              }}
            >
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
export default User_detail;
