import React from "react";
import questionData from "../Data/questions.json";

const Question = (props) => {
  const { generateQuestion, question } = props;
  if(question === {}){
    generateQuestion(questionData.questions);
  }
    return (
      <div>
      <h2>{`THIS IS THE LOCATION ${question.location}`}</h2>
    </div>
  );
};

export default Question;
