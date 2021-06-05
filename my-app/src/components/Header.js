import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Button } from "react-bootstrap";
import "../css/Navigation.css";
import LogoutButton from "./Login/LogoutButton.js";
import { useCookies } from "react-cookie";

function Header() {
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  console.log("header");
  console.log(cookies);

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="/">Navbar</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/">
            Home
          </Nav.Link>
          <Nav.Link as={Link} to="/admin">
            Admin
          </Nav.Link>
          <Nav.Link as={Link} to="/about">
            About
          </Nav.Link>
        </Nav>
        {cookies.user !== undefined ? (
          <LogoutButton logout={removeCookie} />
        ) : (
          <Link
            to={{
              pathname: "/login",
            }}
          >
            <Button variant="secondary">Login</Button>
          </Link>
        )}
      </Navbar>
    </>
  );
}

export default Header;
