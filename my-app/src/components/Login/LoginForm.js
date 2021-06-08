import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { Card, Button, Row } from "react-bootstrap";
import { signIn } from "./Auth.js";
import { useCookies } from "react-cookie";
import base_url from "../../data/base_url.js";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, setLogin] = useState(false);
  const [cookies, setCookie] = useCookies(["user"]);

  useEffect(() => {
    console.log("Login Form");
    console.log(cookies);
  }, [cookies]);

  const handleClick = async () => {
    try {
      const user = await signIn({ email, password });
      console.log("form");
      console.log(user);
      setCookie("user", user);
      setEmail("");
      setPassword("");
      setLogin(true);
      // setLogin(true);
    } catch (e) {
      alert("Failed to login");
      setEmail("");
      setPassword("");
    }
  };

  // const { from } = location.state || { from: { pathname: "/" } };
  if (login) return <Redirect to={"/"} />;

  return (
    <Card>
      <Card.Body>
        <h1>Login</h1>
        <div
          className="input-group flex-nowrap"
          style={{ marginBottom: "10px" }}
        >
          <span className="input-group-text" id="addon-wrapping">
            email
          </span>
          <input
            type="text"
            name="email"
            className="form-control"
            onChange={({ target: { value } }) => setEmail(value)}
            value={email}
            placeholder="email"
            style={{ borderRadius: "5px" }}
          ></input>
        </div>
        <div
          className="input-group flex-nowrap"
          style={{ marginBottom: "10px" }}
        >
          <span className="input-group-text" id="addon-wrapping">
            password
          </span>
          <input
            type="text"
            name="email"
            className="form-control"
            onChange={({ target: { value } }) => setPassword(value)}
            value={password}
            placeholder="password"
            style={{ borderRadius: "5px" }}
          ></input>
        </div>
        <Row style={{ justifyContent: "center" }}>
          <Button onClick={handleClick}>Login</Button>
          <div>
            <a href={base_url + "/auth/kakao"}>
              <img
                style={{ height: "40px" }}
                src="//k.kakaocdn.net/14/dn/btqCn0WEmI3/nijroPfbpCa4at5EIsjyf0/o.jpg"
              />
            </a>
          </div>
        </Row>
      </Card.Body>
    </Card>
  );
}

export default LoginForm;
