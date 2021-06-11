import React from "react";
import ReactDOM from "react-dom";
import "./css/index.css";
import App from "./routes/App.js";
import "bootstrap/dist/css/bootstrap.css";
import { CookiesProvider } from "react-cookie";

ReactDOM.render(
  <React.StrictMode>
    <CookiesProvider>
      <App />
    </CookiesProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
