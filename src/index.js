import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { makeServer } from "./server";
import { Server } from "miragejs";

if (window.Cypress) {
  // mirage cypress server
  let cyServer = new Server({
    routes() {
      ["get", "put", "patch", "post", "delete"].forEach(method => {
        this[method]("/*", (schema, request) => {
          return window.handleFromCypress(request);
        });
      });
    }
  });
  cyServer.logging = false;
} else {
  // mirage dev server
  makeServer();
}

ReactDOM.render(<App />, document.getElementById("root"));
