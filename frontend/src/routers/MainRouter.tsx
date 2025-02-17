import React from "react";
import MainPage from "../pages/Main.page";
import { ROUTER_KEYS } from "./routerKeys";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import LoginPage from "../pages/Login.page";

const MainRouter: React.FC = () => {
  const Rout = [
    {
      path: ROUTER_KEYS.WELCOME,
      render: () => <MainPage />,
    },
    {
      path: ROUTER_KEYS.LOGIN,
      render: () => <LoginPage />,
    },
  ];

  return (
    <BrowserRouter>
      <Routes>
        {Rout.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            element={route.render()}
          />
        ))}
        {/* <Route
          path="/"
          element={<MainPage />}
        /> */}
      </Routes>
    </BrowserRouter>
  );
};

export default MainRouter;
