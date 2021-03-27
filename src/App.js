import React, { Component } from "react";
import "./App.css";
import Counters from "./modules/counters";
import NavBar from "./modules/navBar";

function App() {
  return (
    <React.Fragment>
      <NavBar />
      <main className="container">
        <Counters />
      </main>
    </React.Fragment>
  );
}

export default App;
