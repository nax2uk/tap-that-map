import React from "react";
import { Link } from "@reach/router";
import Leaderboard from "./Leaderboard";

const ResultsPage = ({ scoreArr, totalScore }) => {
  return (
    <div>
      <h1>{"Thanks for playing TAP THAT MAP 🌎"}</h1>;
      <h2>Here are your results:</h2>
      <ul>
        <li>Round 1:{scoreArr[0]}</li>
        <li>Round 2:{scoreArr[1]}</li>
        <li>Round 3:{scoreArr[2]}</li>
        <li>Round 4:{scoreArr[3]}</li>
        <li>Round 5:{scoreArr[4]}</li>
        <li>Round 6:{scoreArr[5]}</li>
        <li>Round 7:{scoreArr[6]}</li>
        <li>Round 8:{scoreArr[7]}</li>
        <li>Round 9:{scoreArr[8]}</li>
        <li>Round 10:{scoreArr[9]}</li>
        <li>Total: {totalScore}</li>
      </ul>
      <button>
        <Link to="/">BACK HOME</Link>
      </button>
      <Leaderboard />
    </div>
  );
};

export default ResultsPage;
