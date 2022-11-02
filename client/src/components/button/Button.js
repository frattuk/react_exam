import styled from "styled-components";

const ContainedButton = styled.button`
  background-color: lightgray;
  border: 1px solid lightgray;
  padding: 10px 24px;
  border-radius: 4px;
  color: white;
  font-size: 14px;
  text-transform: uppercase;
  font-weight: 500;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
`;
// const OutlinedButton = styled.button`
//   background-color: white;
//   border: 1px solid #eb5d05;
//   padding: 10px 24px;
//   border-radius: 4px;
//   color: #eb5d05;
//   font-size: 14px;
//   text-transform: uppercase;
// `;

// const Button = (props) => {
//   return props.variant === "contained" ? (
//     <StyledOrangeButton>{props.children}</StyledOrangeButton>
//   ) : (
//     <StyledWhiteButton>{props.children}</StyledWhiteButton>
//   );
// };

const Outlined = styled(ContainedButton)`
  background-color: #ffffff;
  color: #eb5d05;
`;

const Button = ({ children, type }) => {
  if (type === "outlined") {
    return <Outlined>{children}</Outlined>;
  } else {
    return <ContainedButton>{children}</ContainedButton>;
  }
};

export default Button;
