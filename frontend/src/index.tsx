import React from "react";
import ReactDOM from "react-dom/client";
import MainRouter from "./routers/MainRouter";
import './app.css'

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element not found");
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <MainRouter />
  </React.StrictMode>
);
