import React, { useState } from "react";
import "./registration.css";
import Input from "../../utils/Input";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
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
      <button className="authorization__btn">Įeiti</button>
    </div>
  );
};

export default Login;
