import React from "react";
import Card from "../../components/card/Card";
// import AutoHeightTextarea from "../../components/textarea/Textarea";

const Questions = () => {
  const headers = { "Access-Control-Allow-Headers": "*" };

  fetch("http://localhost:3001/questions", headers)
    .then((resp) => resp.json())
    .then((response) => {
      const ul = document.createElement("ul");
      response.forEach((question) => {
        const li = document.createElement("li");
        li.textContent = `${question.user_id} ${question.question}`;
        ul.append(li);
      });

      document.body.append(ul);
    })
    .catch((error) => console.error(error));
  return <Card>{/* <AutoHeightTextarea /> */}</Card>;
};

export default Questions;
