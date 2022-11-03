import styled from "styled-components";

const StyledCard = styled.div`
  display: flex;
  flex-direction: column;
  width: 600px;
  align-items: center;
  background-color: #f8f2e9;
  border-radius: 30px;
  padding: 30px;
  align-self: center;
  margin-top: 100px;
`;
const Inter = styled.div``;

const CardInputTitle = styled.div`
  font-size: 20px;
  font-weight: 500;
  margin-bottom: 16px;
`;

const CardInputSubtitle = styled.div`
  font-size: 16px;
  margin-bottom: 8px;
`;

const Card = ({ title, subtitle, children }) => {
  return (
    <StyledCard>
      <Inter>
        <CardInputTitle>{title}</CardInputTitle>
        <CardInputSubtitle>{subtitle}</CardInputSubtitle>

        {children}
      </Inter>
    </StyledCard>
  );
};

export default Card;
