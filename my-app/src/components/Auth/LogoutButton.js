import React from "react";
import { withRouter } from "react-router-dom";
import { Button } from "react-bootstrap";

function LogoutButton({ logout, history }) {
  const handleClick = () => {
    logout("user");
    history.push("/");
  };
  return (
    <Button variant="secondary" onClick={handleClick}>
      Logout
    </Button>
  );
}

export default withRouter(LogoutButton);
