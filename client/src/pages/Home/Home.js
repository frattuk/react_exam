import Button from "../../components/button/Button";
import Card from "../../components/card/Card";
// import Input from "../../components/utils/Input";
import { Link } from "react-router-dom";
import AutoHeightTextarea from "../../components/textarea/Textarea";
import { useState } from "react";
import Questions from "../Questions/Questions";

const Home = () => {
  const [user_id, setUser_id] = useState([]);
  const [question, setQuestion] = useState([]);

  // const [answer, SetAnswer] = useState("");
  const postingFunction = (event) => {
    event.preventDefault();

    const option = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: event.target.elements.value,
        question: event.target.elements.value,
      }),
    };

    fetch("http://localhost:3001/questions", option)
      .then((resp) => resp.json())
      .then((response) => {
        setQuestion();
        setUser_id(response);
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
        console.log(error);
      });
  };

  const handleAddQuestion = (event) => {
    event.preventDefault();
    if (question) {
      setQuestion((prevQuestion) => [...prevQuestion, question]);
    }
  };

  return (
    <>
      <form onSubmit={(event) => postingFunction(event)}>
        <Link to="/">
          <Button type="contained">Užduoti klausimą</Button>
        </Link>

        <Card>
          {/* <Input type="styled" placeholder="Tema" /> */}
          <br />
          <br />
          <AutoHeightTextarea
            value={question}
            onChange={(event) => setQuestion(event.target.value)}
          />
          <Link to="/questions">
            <Button onClick={handleAddQuestion} type="contained">
              Išsiųsti
            </Button>
          </Link>
          <Button type="outlined">Ištrinti</Button>
        </Card>

        {question.map((question) => (
          <Questions key={question.id} {...question} />
        ))}
      </form>
    </>
  );
};
export default Home;
