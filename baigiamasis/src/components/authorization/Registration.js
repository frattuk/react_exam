import React, { useState } from "react";
import "./registration.css";
import Input from "../../utils/Input";
import { registration } from "../../actions/user";

const Registration = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="registration">
      <div className="registration__header">Registracija</div>
      <Input
        value={name}
        setValue={setName}
        type="text"
        placeholder="Vardas..."
      />
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
      <button
        className="registration__btn"
        onClick={() => registration(email, password)}
      >
        Įvesti
      </button>
    </div>
  );
};

export default Registration;
