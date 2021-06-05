import React, { useState, useEffect } from "react";
import "../../../css/Home.css";
import { Redirect } from "react-router-dom";

import { Link } from "react-router-dom";
import "tui-grid/dist/tui-grid.css";
import Grid from "@toast-ui/react-grid";
import { Container, Spinner, Button } from "react-bootstrap";
import axios from "axios";
import base_url from "../../../data/base_url.js";

function User_list() {
  const [users, setUsers] = useState({
    id: "",
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
    var data = await axios.get(base_url + "/user/all");
    setUsers(data.data);
    setIsLoading(false);
  }; // getMovies라는 함수 정의
  const [next, setNext] = useState(-1);

  const handleClick = e => {
    // const clicked_cell = e.nativeEvent.target.innerText;
    const row_number = e.rowKey;
    // console.log(clicked_cell);
    // console.log(row_number);
    if (row_number !== undefined) {
      setNext(users[row_number].id);
    }
  };

  const columns = [
    { name: "id", header: "ID" },
    { name: "name", header: "Name" },
    { name: "phone", header: "Phone" },
    { name: "email", header: "Email" },
    { name: "country", header: "Country" },
    { name: "birth", header: "Birth" },
  ];

  if (next > -1) {
    return <Redirect to={"/admin/user/" + next} />;
  }

  return (
    <>
      {!isLoading ? (
        <Container style={{ textAlign: "center" }}>
          <h1 style={{ marginTop: "10px" }}>User</h1>

          <div className="d-flex flex-row-reverse ">
            <Button
              as={Link}
              to="/admin/user/create"
              variant="dark"
              style={{ marginBottom: "10px" }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-person-plus-fill"
                viewBox="0 0 16 16"
              >
                <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"></path>
                <path
                  fillRule="evenodd"
                  d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z"
                ></path>
              </svg>
            </Button>
          </div>
          <Grid
            data={users}
            columns={columns}
            rowHeight={25}
            bodyHeight={100}
            virtualScrolling={true}
            heightResizable={true}
            rowHeaders={["rowNum"]}
            onClick={handleClick}
          />
        </Container>
      ) : (
        <Spinner animation="border" role="status" />
      )}
    </>
  );
}
export default User_list;
