import React, { useState } from "react";
import "./registration.css";
import Input from "../utils/Input";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginFunction = (event) => {
    event.preventDefault();
    const option = {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        email: event.target.elements[0].value,
        password: event.target.elements[1].value,
      }),
    };

    fetch("http://localhost:3001/login", option)
      .then((res) => res.json())
      .then((data) => {
        if (data.err) {
          return alert("Incorrect details");
        } else {
          localStorage.setItem("token", data.token);
          alert("Sėkmingai prisijungėte!");
        }
      })
      .catch((error) => console.error(error));
  };

  return (
    <form onSubmit={(event) => loginFunction(event)}>
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
