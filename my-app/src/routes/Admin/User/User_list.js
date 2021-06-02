import React, { useState, useEffect } from "react";
import "../../../css/Home.css";
import { Redirect } from "react-router-dom";

import { Link } from "react-router-dom";
import "tui-grid/dist/tui-grid.css";
import Grid from "@toast-ui/react-grid";
import { Container, Spinner, Button } from "react-bootstrap";
import axios from "axios";
const base_url =
  "http://ec2-13-124-149-215.ap-northeast-2.compute.amazonaws.com:9000";

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
    var data = await axios.get(base_url + "/pages");
    setUsers(data.data);
    setIsLoading(false);
  }; // getMovies라는 함수 정의
  const [next, setNext] = useState(-1);

  const handleClick = e => {
    const clicked_cell = e.nativeEvent.target.innerText;
    const row_number = e.rowKey;
    console.log(clicked_cell);
    console.log(row_number);
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
          <h1>User</h1>
          <Button
            as={Link}
            className="btn btn-dark"
            to="/admin/user/create"
            style={{ marginBottom: "10px" }}
          >
            Add New User
          </Button>
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
