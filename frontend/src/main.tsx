import React from "react";
import ReactDOM from "react-dom/client";
import MainRouter from "./routers/MainRouter";

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <React.StrictMode>
//     <MainRouter />
//   </React.StrictMode>
// );

const rootElement = document.getElementById("root");

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <MainRouter />
    </React.StrictMode>
  );
} else {
  console.error("Root element not found");
}
