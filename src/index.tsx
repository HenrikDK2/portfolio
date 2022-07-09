import "./styles/index.css";
import React from "react";
import { createRoot } from "react-dom/client";
import { setup } from "goober";
import { prefix } from "goober/prefixer";
import { App } from "./App";
setup(React.createElement, prefix);

const root = createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
