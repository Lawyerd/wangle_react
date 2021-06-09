import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
// import "../css/Create.css";
import axios from "axios";
import base_url from "../data/base_url.js";
import { Row, Col } from "react-bootstrap";
import { useCookies } from "react-cookie";

function Profile() {
  const [cookies] = useCookies(["user"]);
  const [user, setUser] = useState(cookies.user);

  useEffect(() => {
    const get_data = async page => {
      const res_data = await axios.get(base_url + `/user/${page}`);
      const data = res_data.data[0];
      data.password = "";
      setUser(data);
    };
    get_data(user.id);
    console.log(user);
  }, []);

  // useEffect(() => {
  //   console.log(cookies.user);
  // });
  return (
    <Row>
      <Col md={2}></Col>
      <Col md={8}>
        <Card>
          <Card.Body>
            <img
              src={user.profile_image}
              alt="profile_image"
              style={{ height: "200px" }}
            />
            <Card.Text>id : {user.id}</Card.Text>
            <Card.Text>authority : {user.authority}</Card.Text>
            <Card.Text>name : {user.name}</Card.Text>
            <Card.Text>email : {user.email}</Card.Text>
            <Card.Text>country : {user.country}</Card.Text>
            <Card.Text>birth : {user.birth}</Card.Text>
          </Card.Body>
        </Card>
      </Col>
      <Col md={2}></Col>
    </Row>
  );
}

export default Profile;
