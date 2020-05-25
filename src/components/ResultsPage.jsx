import React from "react";

const ResultsPage = ({ scoreArr, totalScore }) => {
  return (
    <div>
      <h1>{"Thanks for playing TAP THAT MAP 🌎"}</h1>;
      <h2>Here are your results:</h2>
      <ul>
        <li>Round 1:{scoreArr[0]}</li>
      </ul>
      <ul>
        <li>Round 2:{scoreArr[1]}</li>
      </ul>
      <ul>
        <li>Round 3:{scoreArr[2]}</li>
      </ul>
      <ul>
        <li>Round 4:{scoreArr[3]}</li>
      </ul>
      <ul>
        <li>Round 5:{scoreArr[4]}</li>
      </ul>
      <ul>
        <li>Round 6:{scoreArr[5]}</li>
      </ul>
      <ul>
        <li>Round 7:{scoreArr[6]}</li>
      </ul>
      <ul>
        <li>Round 8:{scoreArr[7]}</li>
      </ul>
      <ul>
        <li>Round 9:{scoreArr[8]}</li>
      </ul>
      <ul>
        <li>Round 10:{scoreArr[9]}</li>
      </ul>
      <ul>
        <li>Total: {totalScore}</li>
      </ul>
    </div>
  );
};

export default ResultsPage;
