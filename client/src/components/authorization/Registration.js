import React, { useState } from "react";
import "./registration.css";
import Input from "../utils/Input";

const Registration = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
        if (response.err) {
          return alert("Incorrect details");
        } else {
          alert("Sėkmingai užsiregitravote!");
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
        <button
          type="submit"
          className="registration__btn"
          // onClick={() => registerFunction(email, password)}
        >
          Registruotis
        </button>
      </div>
    </form>
  );
};

export default Registration;
