import React from "react";
import MainPage from "../pages/Main.page";
import { ROUTER_KEYS } from "./routerKeys";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";

const MainRouter: React.FC = () => {
  const Rout = [
    {
      path: ROUTER_KEYS.WELCOME,
      render: () => <MainPage />,
    },
  ];

  return (
    <BrowserRouter>
      <Routes>
        {/* {Rout.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            element={<MainPage />}
          />
        ))} */}
        <Route
          path="/"
          element={<MainPage />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default MainRouter;
