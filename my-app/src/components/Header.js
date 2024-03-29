import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import "../css/Navigation.css";
import { useCookies } from "react-cookie";
import logo from "../img/TIME_WHITE_.gif";
import axios from "axios";
import base_url from "../data/base_url.js";

const REST_API_KEY = "c6252e6cd654811488e77d0e1dcfb696";
const LOGOUT_REDIRECT_URI = "http://localhost:3000/oauth";
const APP_ADMIN_KEY = "d1c5e406fa8041fc0d45a2597e9a1457";

function Header() {
  const [cookies, removeCookie] = useCookies(["user"]);
  console.log(cookies);
  const handleClick = async () => {
    removeCookie("user");
    const req = await axios({
      //Promise 객체를 unlink에 넘겨주고
      method: "post",
      url: base_url + "/auth/kakao_logout",
      data: { logout: "ok" },
      // headers: {
      //   Authorization: `KakaoAK ${APP_ADMIN_KEY}`,
      // },
    });
    console.log(cookies);
  };

  const handleClick_unlink = async () => {
    removeCookie("user");
    const req = await axios({
      //Promise 객체를 unlink에 넘겨주고
      method: "post",
      url: base_url + "/auth/kakao_unlinked",
      data: { user: cookies.user },
      // headers: {
      //   Authorization: `KakaoAK ${APP_ADMIN_KEY}`,
      // },
    });
  };
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="/" style={{ margin: "0px" }}>
          <img src={logo} style={{ height: "27px" }} alt="banner"></img>
        </Navbar.Brand>
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
          {cookies.user === undefined || cookies.user === "undefined" ? (
            <Nav.Link as={Link} to="/signup">
              Sign up
            </Nav.Link>
          ) : (
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
          )}
          {cookies.user === undefined || cookies.user === "undefined" ? (
            // <div>
            //   <LogoutButton logout={removeCookie} />
            <Nav.Link as={Link} to="/login">
              Login
            </Nav.Link>
          ) : (
            // </div>
            <Nav.Link as={Link} onClick={handleClick} to="/">
              Logout
            </Nav.Link>
          )}
        </Nav>
      </Navbar>
    </>
  );
}

export default Header;
