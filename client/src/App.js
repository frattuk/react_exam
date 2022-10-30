import React, { useState, useEffect } from "react";
import Navbar from "./components/navbar/Navbar";
import "./app.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Registration from "./components/authorization/Registration";
import Login from "./components/authorization/Login";

const App = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("./api")
      .then((response) => response.json())
      .then((response) => setData(response.msg));
  }, []);
  return (
    <BrowserRouter>
      <div className="app">
        <Navbar />
        <div className="wrap">
          <Routes>
            <Route path="/registration" element={<Registration />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </div>
      <p>{!data ? "Loading.." : data}</p>
    </BrowserRouter>
  );
};

export default App;
