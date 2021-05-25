import React from "react";
import { Link } from "react-router-dom";
import "../css/Navigation.css";
import styled from "styled-components";

const StyledLink = styled(Link)`
  text-decoration: none;
  padding: 0px;
  margin: 0px;
  clear: both;
  float: left;
  color: #5f5f5f;
  left: initial;
  top: initial;
  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }
`;

function navigation() {
  return (
    <div className="">
      <div
        className="card position-fixed"
        style={{ margin: "30px", display: "flex" }}
      >
        <div
          className="card-body text-center"
          style={{ padding: "10px", margin: "0px" }}
        >
          <div className="navs m-10">
            <StyledLink to="/" style={{ marginBottom: "10px" }}>
              Home
            </StyledLink>
            <StyledLink to="/create" style={{ marginBottom: "10px" }}>
              Create
            </StyledLink>

            <StyledLink to="/about">About</StyledLink>
          </div>
        </div>
      </div>
    </div>
  );
}

export default navigation;
