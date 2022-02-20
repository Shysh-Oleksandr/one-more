import React from "react";
import "./App.css";
import Habits from "./Components/Habits";
import Navbar from "./Components/Navbar";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Habits />
    </div>
  );
}

export default App;
