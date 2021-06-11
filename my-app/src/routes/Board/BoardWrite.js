import React, { useState, useEffect } from "react";

import "codemirror/lib/codemirror.css";
import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/react-editor";
import { Card, Button, ButtonGroup } from "react-bootstrap";
import "tui-pagination/dist/tui-pagination.css";
import base_url from "../../data/base_url.js";

function BoardWrite() {
  return (
    <Card>
      <Card.Body>
        <Editor
          initialValue="hello react editor world!"
          previewStyle="vertical"
          height="600px"
          initialEditType="markdown"
          useCommandShortcut={true}
        />
      </Card.Body>
    </Card>
  );
}

export default BoardWrite;
