import styled from "styled-components";

const ContainedButton = styled.button`
  border: none;
  background-color: #9999b9;
  border-radius: 8px;
  color: white;
  font-weight: 500;
  padding: 7px 12px;
  align-self: center;
  margin-top: 10px;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
`;

const Outlined = styled(ContainedButton)`
  background-color: #f8f2e9;
  border: 1px solid #9999b9;
  color: #9999b9;
  margin-left: 12px;
`;

const Button = ({ onClick, children, type }) => {
  if (type === "outlined") {
    return <Outlined onClick={onClick}>{children}</Outlined>;
  } else {
    return <ContainedButton onClick={onClick}>{children}</ContainedButton>;
  }
};

export default Button;
