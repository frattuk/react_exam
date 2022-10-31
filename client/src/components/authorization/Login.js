import React, { useState } from "react";
import "./registration.css";
import Input from "../../utils/Input";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginFunction = (e) => {
    e.preventDefault();
    const option = {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        email: e.target.elements[0].value,
        password: e.target.elements[1].value,
      }),
    };

    fetch("http://localhost:3001/login", option)
      .then((res) => res.json())
      .then((data) => {
        if (data.err) {
          return alert("Incorrect details");
        } else {
          localStorage.setItem("token", data.token);
          alert("Logged in");
        }
      });
  };

  return (
    <form onSubmit={(e) => loginFunction(e)}>
      <div className="authorization">
        <div className="authorization__header">Prisijungti</div>
        <Input
          value={email}
          setValue={setEmail}
          type="text"
          placeholder="El.paštas..."
        />
        <Input
          value={password}
          setValue={setPassword}
          type="password"
          placeholder="Slaptažodis..."
        />
        <button type="submit" className="authorization__btn">
          Prisijungti
        </button>
      </div>
    </form>
  );
};
export default Login;
