import React from "react";
// import logo from './logo.svg';
// import './App.css';
import Title from "./components/Title";
import GoogleMap from "./components/GoogleMap";

function App() {
  return (
    <div>
      <header>
        <Title />
      </header>
      <GoogleMap />
    </div>
  );
}

export default App;
