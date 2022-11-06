import React, { useState } from "react";
import "./registration.css";
import Input from "../utils/Input";
import Button from "../button/Button";
import { Link } from "react-router-dom";

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
        if (data.error) {
          alert("Netinkamas el paštas ar slaptažodis");
        } else {
          localStorage.setItem("token", data.token);
          console.log(data);
          alert("Sėkmingai prisijungėte!");
          window.location.reload();
        }
      })
      .catch((err) => {
        console.error(err);
        alert("Kažkas negerai :(");
      });
  };

  return (
    <>
      <form onSubmit={(event) => loginFunction(event)}>
        <div className="authorization">
          <div className="authorization__header">Prisijungti</div>
          <Input
            type="auth"
            value={email}
            setValue={setEmail}
            placeholder="El.paštas..."
          />
          <Input
            value={password}
            setValue={setPassword}
            type="password"
            placeholder="Slaptažodis..."
          />
          <Button className="authorization__btn"> Prisijungti </Button>

          <Link to="/registration">
            <Button type="outlined" className="authorization__btn">
              Registruotis
            </Button>
          </Link>
        </div>
      </form>
    </>
  );
};
export default Login;
