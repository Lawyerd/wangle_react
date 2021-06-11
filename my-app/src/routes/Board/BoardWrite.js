import React, { useState, useEffect } from "react";

import "codemirror/lib/codemirror.css";
import "@toast-ui/editor/dist/toastui-editor.css";

import { Editor, Viewer } from "@toast-ui/react-editor";
import { Card, Button, ButtonGroup } from "react-bootstrap";
import "tui-pagination/dist/tui-pagination.css";
import base_url from "../../data/base_url.js";

function BoardWrite() {
  function onClick(e) {
    // console.log(e.target.parentElement);
    var content = e.target.parentElement.childNodes[0].getMarkdown();
    console.log(content);
  }
  return (
    <Card>
      <Card.Body>
        <div>
          <Editor
            initialValue="hello react editor world!"
            previewStyle="tab"
            initialEditType="markdown"
            useCommandShortcut={true}
          />
          <Viewer initialValue="content"></Viewer>
          {/* <Button onClick={onClick}>hi</Button> */}
        </div>
        {/* https://1nnovator.tistory.com/56 */}
      </Card.Body>
    </Card>
  );
}

export default BoardWrite;
