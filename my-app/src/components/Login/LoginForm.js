import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { Card, Button } from "react-bootstrap";

function LoginForm({ authenticated, login, location }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleClick = () => {
    try {
      login({ email, password });
    } catch (e) {
      alert("Failed to login");
      setEmail("");
      setPassword("");
    }
  };
  console.log(login);

  // const { from } = location.state || { from: { pathname: "/" } };
  if (authenticated) return <Redirect to={"/"} />;

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
            onChange={({ target: { value } }) => setPassword(password)}
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
