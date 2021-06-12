import React, { useState, useEffect, useRef } from "react";
import { useCookies } from "react-cookie";
import { Redirect } from "react-router-dom";
import axios from "axios";
import "codemirror/lib/codemirror.css";
import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/react-editor";
import { Card, Button, ButtonGroup } from "react-bootstrap";
import "tui-pagination/dist/tui-pagination.css";
import base_url from "../../data/base_url.js";

function BoardWrite() {
  const editorRef = useRef();
  const [cookies, setCookie, removeCookie] = useCookies(["post"]);
  const [isSubmit, setIsSubmit] = useState(false);
  const btnClickListener = async () => {
    const editorInstance = editorRef.current.getInstance();
    const getContent_md = editorInstance.getMarkdown();
    console.log("--Mark Down");
    console.log(getContent_md);
    const getContent_html = editorInstance.getHtml();
    console.log("--HTML--");
    console.log(getContent_html);
    removeCookie("post");
    setCookie("post", getContent_html);
    console.log(cookies);
    setIsSubmit(true);
    await send_data({ content: getContent_html });
  };
  async function send_data(data) {
    await axios.post(base_url + "/post/create", data);
  }
  if (isSubmit) return <Redirect to={"/board"} />;

  return (
    <Card>
      <Card.Body>
        <Editor
          initialValue="hello react editor world!"
          previewStyle="tab"
          initialEditType="markdown"
          useCommandShortcut={true}
          ref={editorRef}
        />
        {/* <Viewer initialValue="<h1>content</h1><p>hi my name is</p>">
          heelo
        </Viewer> */}
        <div
          className="d-flex justify-content-center"
          style={{ marginTop: "10px" }}
        >
          <ButtonGroup size="sm">
            <Button variant="dark" onClick={btnClickListener}>
              Submit
            </Button>
          </ButtonGroup>
        </div>

        {/* https://1nnovator.tistory.com/56 */}
      </Card.Body>
    </Card>
  );
}

export default BoardWrite;
