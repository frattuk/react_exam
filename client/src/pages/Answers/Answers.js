import React, { useState, useEffect } from "react";
import Card from "../../components/card/Card";
import Button from "../../components/button/Button";

const Answers = () => {
  const [answers, SetAnswers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/questions")
      .then((resp) => resp.json())
      .then((response) => {
        SetAnswers(response);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  return (
    <div>
      {answers.map((answer) => (
        <Card>
          <div key={answer.id}>
            ({answer.user_id}) {answer.question}{" "}
          </div>
          <br />

          <Button type="outlined">Ištrinti</Button>
        </Card>
      ))}
    </div>
  );
};

export default Answers;
