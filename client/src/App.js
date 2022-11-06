import React from "react";
import Navbar from "./components/navbar/Navbar";
import "./app.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Registration from "./components/authorization/Registration";
import Login from "./components/authorization/Login";
import Home from "./pages/Home/Home";
import Questions from "./pages/Guestions/Questions";

const App = () => {
  const isAuthenticated = localStorage.getItem("token");
  // const routes = isAuthenticated ? <Home/> : <Registration/>
  const authRoutes = [
    { path: "/", Component: Login },
    { path: "/registration", Component: Registration },
  ];
  const mainRoutes = [
    { path: "/", Component: Home },
    { path: "/questions", Component: Questions },
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

            {/* <Route path="/" element={<Home />} />
            <Route path="/registration" element={<Registration />} />

            <Route path="/login" element={<Login />} /> */}
          </Routes>
          {/* <Questions /> */}
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
