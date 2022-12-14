import React, { useState, useEffect } from "react";
import Card from "../../components/card/Card";
import Button from "../../components/button/Button";

const Questions = () => {
  const [questions, setQuestions] = useState([]);

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
  return (
    <div>
      {questions.map((question) => (
        <Card>
          <div key={question.id}>
            ({question.user_id}) {question.question}{" "}
          </div>
          <br />
          <Button type="contained">Atsakyti</Button>
          <Button type="outlined">Ištrinti</Button>
        </Card>
      ))}
    </div>
  );
};

export default Questions;
