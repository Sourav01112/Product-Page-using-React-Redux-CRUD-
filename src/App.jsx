import "./App.css";
import { MainRoutes } from "./pages/MainRoutes";
import { Navbar } from "./components/Navbar";
import { FaArrowUp } from "react-icons/fa";
import { useState, useEffect } from "react";

function App() {
 

  return (
    <div className="App" id="light">
      <Navbar />
      <MainRoutes />
     
    </div>
  );
}

export default App;
