import React from "react";
import Navbar from "./components/navbar/Navbar";
import "./app.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Registration from "./components/authorization/Registration";
import Login from "./components/authorization/Login";
import Home from "./pages/Home/Home";
import Questions from "./pages/Questions/Questions";
import Answers from "./pages/Answers/Answers";

const App = () => {
  const isAuthenticated = localStorage.getItem("token");

  const authRoutes = [
    { path: "/", Component: Login },
    { path: "/registration", Component: Registration },
  ];
  const mainRoutes = [
    { path: "/", Component: Home },
    { path: "/questions", Component: Questions },
    { path: "/answers", Component: Answers },
  ];
  const routes = isAuthenticated ? mainRoutes : authRoutes;

  return (
    <BrowserRouter>
      <div className="app">
        <Navbar />
        <div className="wrap">
          <Routes>
            {routes.map((route) => (
              <Route path={route.path} element={<route.Component />} />
            ))}
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
