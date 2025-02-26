import React from "react";
import MainPage from "../pages/Main.page";
import { ROUTER_KEYS } from "./routerKeys";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "../pages/Login.page";
import RegisterPage from "../pages/Register.page";
import ProfilePage from "../pages/Profile.page";

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
    {
      path: ROUTER_KEYS.REGISTER,
      render: () => <RegisterPage />,
    },
    {
      path: ROUTER_KEYS.PROFILE,
      render: () => <ProfilePage />,
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
      </Routes>
    </BrowserRouter>
  );
};

export default MainRouter;
