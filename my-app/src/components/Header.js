import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import "../css/Navigation.css";
import { useCookies } from "react-cookie";

function Header() {
  const [cookies, removeCookie] = useCookies(["user"]);
  const handleClick = () => {
    removeCookie("user");
  };
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="/">JR</Navbar.Brand>
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
        <Nav>
          {cookies.user !== undefined ? (
            <Nav.Link as={Link} to="profile">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-person"
                viewBox="0 0 16 16"
              >
                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
              </svg>
            </Nav.Link>
          ) : (
            <Nav.Link as={Link} to="/signup">
              Sign up
            </Nav.Link>
          )}
          {cookies.user !== undefined ? (
            // <div>
            //   <LogoutButton logout={removeCookie} />
            <Nav.Link onClick={handleClick}>Logout</Nav.Link>
          ) : (
            // </div>
            <Nav.Link as={Link} to="/login">
              Login
            </Nav.Link>
          )}
        </Nav>
      </Navbar>
    </>
  );
}

export default Header;
