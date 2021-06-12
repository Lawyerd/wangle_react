import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";

import { Link } from "react-router-dom";
import "tui-grid/dist/tui-grid.css";
import Grid from "@toast-ui/react-grid";
import { Card, Button, ButtonGroup } from "react-bootstrap";
import axios from "axios";
import "tui-pagination/dist/tui-pagination.css";
import base_url from "../../data/base_url.js";

function Board() {
  //   const [isLoading, setIsLoading] = useState(true);
  const [postID, setPostID] = useState(0);
  const columns = [
    // { name: "no", header: "ID" },
    { name: "title", header: "Name" },
    { name: "writer", header: "Writen By" },
    { name: "reporting_time", header: "Reporting Time" },
    { name: "views", header: "Views" },
    { name: "likes", header: "Likes" },
  ];
  const posts = [
    {
      id: 1823,
      title: "First Post",
      writer: "Lawyerd",
      reporting_time: "2021-06-11",
      views: 110,
      likes: 10,
    },
  ];

  const handleClick = e => {
    // const clicked_cell = e.nativeEvent.target.innerText;
    const row_number = e.rowKey;
    // console.log(clicked_cell);
    // console.log(row_number);
    // console.log(e);
    if (row_number !== undefined) {
      console.log(row_number);
      console.log(posts[row_number]);
      setPostID(posts[row_number].id);
      // setNext(users[row_number].id);
    }
  };
  if (postID > 0) {
    return <Redirect to={"/board/post/" + postID} />;
  }
  return (
    <Card>
      <Card.Body>
        <h1>Forum</h1>
        <div
          className="d-flex justify-content-end"
          style={{ marginBottom: "10px" }}
        >
          <ButtonGroup size="sm">
            <Button variant="dark">
              <Link to="/board/post/write">Write</Link>
            </Button>
            {/* <Button variant="dark">Delete</Button> */}
          </ButtonGroup>
        </div>
        <Grid
          data={posts}
          columns={columns}
          rowHeight={25}
          bodyHeight={100}
          virtualScrolling={true}
          heightResizable={true}
          onClick={handleClick}
          rowHeaders={["rowNum"]}
          pageOptions={{
            useClient: true,
            perPage: 100,
          }}
        />
      </Card.Body>
    </Card>
  );
}

export default Board;
