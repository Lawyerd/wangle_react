import React, { useState, useEffect, useRef } from "react";
import { useCookies } from "react-cookie";
import { Viewer } from "@toast-ui/react-editor";
import { Card, Button, ButtonGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import base_url from "../../data/base_url.js";

function BoardView() {
  const [cookies, setCookie] = useCookies(["post"]);
  const [isLoading, setIsLoading] = useState(true);
  const [content, setContent] = useState("");
  const id = 1;
  useEffect(async () => {
    console.log(cookies.post);
    setContent(cookies.post);
    const res = await axios.get(base_url + "/post/" + id);
    // console.log(res.data);
    setContent(res.data.description);

    // setContent(db_data);
    setIsLoading(false);
  }, []);

  //   if (isSubmit) return <Redirect to={"/board"} />;

  return (
    <Card>
      <Card.Body>
        {isLoading ? (
          "loading..."
        ) : (
          <div>
            <Viewer initialValue={content} />

            <div
              className="d-flex justify-content-end"
              style={{ marginBottom: "10px" }}
            >
              <ButtonGroup size="sm">
                <Button variant="dark">
                  <Link to="/board">Back</Link>
                </Button>
                {/* <Button variant="dark">Delete</Button> */}
              </ButtonGroup>
            </div>
          </div>
        )}
      </Card.Body>
    </Card>
  );
}

export default BoardView;
