import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
import { signIn } from "./Auth.js";
import { useCookies } from "react-cookie";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, setLogin] = useState(false);
  const [cookies, setCookie] = useCookies(["user"]);

  useEffect(() => {
    console.log("Login Form");
    console.log(cookies);
  }, []);

  const handleClick = () => {
    try {
      const user = signIn({ email, password });
      setCookie("user", user);
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
        <Button onClick={handleClick}>Login</Button>
      </Card.Body>
    </Card>
  );
}

export default LoginForm;
