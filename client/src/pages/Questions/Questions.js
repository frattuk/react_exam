import React, { useState, useEffect } from "react";
import Card from "../../components/card/Card";

// import AutoHeightTextarea from "../../components/textarea/Textarea";

const Questions = () => {
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
  return (
    <Card>
      {questions.map((question) => (
        <div key={question.id}>
          ({question.user_id}) {question.question}
        </div>
      ))}
    </Card>
  );
};

export default Questions;
