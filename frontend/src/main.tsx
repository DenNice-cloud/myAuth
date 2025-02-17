import React from "react";
import ReactDOM from "react-dom/client";
import MainRouter from "./routers/MainRouter";

// const rootElement = document.getElementById("root");

// if (rootElement) {
// const root = ReactDOM.createRoot(document.getElementById("root"));

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <MainRouter />
  </React.StrictMode>
);
// } else {
//   console.error("Root element not found");
// }
