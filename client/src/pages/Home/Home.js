import Button from "../../components/button/Button";
import Card from "../../components/card/Card";
import Input from "../../components/utils/Input";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import styled from "styled-components";

const StyledTextarea = styled.textarea`
  width: 400px;
  height: 80px;
  border-radius: 6px;
`;
const Home = () => {
  const [question, setQuestion] = useState("");
  const navigate = useNavigate();
  const handleAddQuestion = () => {
    if (question) {
      const option = {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          question,
          user_id: Number(localStorage.getItem("user_id")),
        }),
      };
      console.log(option);

      fetch("http://localhost:3001/questions", option)
        .then((resp) => resp.json())
        .then((response) => {
          setQuestion("");
          if (response.error) {
            alert("Kažkas negerai :(");
          } else {
            alert("Sėkmingai išsiųsta!");
            navigate("/questions");
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  return (
    <>
      <Link to="/">
        <Button type="contained">Užduoti klausimą</Button>
      </Link>

      <Card>
        <Input type="styled" placeholder="Tema" />
        <br />
        <br />
        <StyledTextarea onChange={(e) => setQuestion(e.target.value)} />

        <br />
        <br />

        <Button onClick={handleAddQuestion} type="contained">
          Išsiųsti
        </Button>

        <Button type="outlined">Ištrinti</Button>
      </Card>
    </>
  );
};
export default Home;
