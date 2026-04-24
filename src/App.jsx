import React from "react";
import { Button, Table, Container } from "react-bootstrap";
import MyNavbar from "./components/MyNavbar";
import CO2Table from "./components/CO2Table";

function App() {
  return (
    <>
    <div className="App">
    <div id="Header">
      <header>
        <h1>CO2 Footprint</h1>
      </header>
      <MyNavbar/>
      </div>
      <main className="container">
        <p>Hier sind die aktuellen Daten:</p>
        <CO2Table/>
      </main>
    
    </div>
    <p>Lorem, ipsum dolor.</p>

    </>
  );
}



export default App;
