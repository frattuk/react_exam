import React from "react";
import styled from "styled-components";

const AuthInput = styled.input`
  border: none;
  border-bottom: #9191af solid 1px;
  background: transparent;
  width: 100%;
  padding: 5px;
`;
const StyledInput = styled(AuthInput)`
  border-style: 1px solid #9999b9;
  width: 100%;
  padding: 5px;
`;

const Input = (props, children, type) => {
  if (type === "styled") {
    return <StyledInput>{children}</StyledInput>;
  } else {
    return (
      <AuthInput
        onChange={(event) => props.setValue(event.target.value)}
        value={props.value}
        type={props.type}
        placeholder={props.placeholder}
      />
    );
  }
};

export default Input;
