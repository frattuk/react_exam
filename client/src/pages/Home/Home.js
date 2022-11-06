import Button from "../../components/button/Button";
import Card from "../../components/card/Card";
import Input from "../../components/utils/Input";
import { Link } from "react-router-dom";
import AutoHeightTextarea from "../../components/textarea/Textarea";
import { useEffect, useState } from "react";
import Questions from "../Guestions/Questions";

const Home = () => {
  const [questions, setQuestions] = useState([]);
  // const [answer, SetAnswer] = useState("");

  useEffect(() => {
    fetch("http://localhost:3001/questions")
      .then((resp) => resp.json())
      .then((response) => {
        setQuestions(response);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleAddQuestion = () => {
    if (questions) {
      setQuestions((prevQuestions) => [...prevQuestions, questions]);
      setQuestions([]);
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
        <AutoHeightTextarea
          value={questions}
          onChange={(event) => setQuestions(event.target.value)}
        />
        <Link to="/questions">
          <Button onClick={handleAddQuestion} type="contained">
            Išsiųsti
          </Button>
        </Link>
        <Button type="outlined">Ištrinti</Button>
      </Card>
      <ul>
        {questions.map((question) => (
          <Questions key={question.id} {...question} />
        ))}
      </ul>
    </>
  );
};
export default Home;
