import React, { useState } from "react";
import "./registration.css";
import Input from "../utils/Input";
import { useNavigate } from "react-router-dom";
import Button from "../button/Button";

const Registration = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const registerFunction = (event) => {
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

    fetch("http://localhost:3001/registration", option)
      .then((res) => res.json())
      .then((response) => {
        if (response.error) {
          alert("Toks el.paštas jau užregistruotas");
        } else {
          alert("Sėkmingai užsiregitravote!");
          navigate("/");
        }
      })
      .catch((error) => console.error(error));
  };

  return (
    <form onSubmit={(event) => registerFunction(event)}>
      <div className="registration">
        <div className="registration__header">Registracija</div>

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
        <Button type="submit" className="registration__btn">
          Registruotis
        </Button>
      </div>
    </form>
  );
};

export default Registration;
