import React, {useState} from "react";
import { Button, Table, Container } from "react-bootstrap";
import MyNavbar from "./components/MyNavbar";
import CO2Table from "./components/CO2Table";
import emissionsData from "./data/emissionsData";

function App() {
  const [filderedData, setFilteredData] = useState(tableData);
  const handleSearch = (searchTerm) => {
    const results = tableData.filter((item) =>
      Object.values(item).some((val) =>
        String(val).toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    setFilteredData(results); {*Update löst Neu-Rendern der Tabelle aus*}
  };
  return (
    <>
    <div className="App">
    <div id="Header">
      <header>
        <h1>CO2 Footprint</h1>
      </header>
      <MyNavbar/>
      <SearchBar onSearch={handleSearch} />
      </div>
      <main className="container">
        <p>Hier sind die aktuellen Daten:</p>
        {/* Die Tabelle erhält NUR noch die gefilterten Daten als Prop */}
        <CO2Table data={filteredData} />
      </main>
    
    </div>
    <p>Lorem, ipsum dolor.</p>

    </>
  );
}



export default App;
