import React from "react";
import Title from "./components/Title";
import GoogleMap from "./components/GoogleMap";
// import database from "./firebaseInitialise";

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
