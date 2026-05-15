import React, { useState } from "react";
import { Button, Table, Container } from "react-bootstrap";
import MyNavbar from "./components/MyNavbar";
import CO2Table from "./components/CO2Table";
import CO2RankTable from "./components/CO2SortTable";
import emissionsData from "./data/emissionsData";
import { FilterSuche } from "./components/SortFilter";
import Header from "./components/SearchHeader";
import Footer from "./components/Footer";

function App() {
  // const [filteredData, setFilteredData] = useState(emissionsData);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc"); // Standard: Aufsteigend A-Z
  const [sortByEmission, setSortByEmission] = useState(false);
  const datenMitIds = emissionsData.map((landGruppe, landIdx) => ({
    ...landGruppe,
    id: `land-${landIdx}`, // Generiert z.B. land-0, land-1
    unternehmen: landGruppe.unternehmen.map((u, uIdx) => ({
      ...u,
      id: `u-${landIdx}-${uIdx}`, // Generiert eindeutige ID wie u-0-1
    })),
  }));
  // 2. Die Suchfunktion aktualisiert jetzt einfach direkt den Such-State
  const handleSearch = (value) => {
    setSearchTerm(value); // Hier wird setSearchTerm nun korrekt verwendet!
    {
      /*}}
    const results = emissionsData.filter((item) =>
      Object.values(item).some((val) =>
        String(val).toLowerCase().includes(query)
      )
    );
    setFilteredData(results); {/*Update löst Neu-Rendern der Tabelle aus*/
    }
  };
  return (
    <>
      <div className="App">
        <div id="Header">
          <header>
            <h1>CO2 Footprint</h1>
          </header>
          <MyNavbar />
          <Header onSearch={handleSearch} />
          {/* Beispiel-Buttons, um die Sortierung live zu testen */}
          <div className="container mt-2 d-flex justify-content-between align-items-center">
            {/* Linke Seite: Sortierung (A-Z / Z-A oder Min/Max je nach Modus) */}
            <div>
              <button
                className={`btn btn-sm me-2 ${sortOrder === "asc" ? "btn-secondary" : "btn-outline-secondary"}`}
                onClick={() => setSortOrder("asc")}
              >
                {sortByEmission ? "Wenig CO₂ zuerst" : "A-Z (Länder)"}
              </button>
              <button
                className={`btn btn-sm ${sortOrder === "desc" ? "btn-secondary" : "btn-outline-secondary"}`}
                onClick={() => setSortOrder("desc")}
              >
                {sortByEmission ? "Viel CO₂ zuerst" : "Z-A (Länder)"}
              </button>
            </div>

            {/* Rechte Seite: Umschalter für die Tabellen-Ansicht */}
            <div>
              <button
                className={`btn btn-sm me-2 ${!sortByEmission ? "btn-primary" : "btn-outline-primary"}`}
                onClick={() => setSortByEmission(false)}
              >
                Nach Ländern gruppiert
              </button>
              <button
                className={`btn btn-sm ${sortByEmission ? "btn-primary" : "btn-outline-primary"}`}
                onClick={() => setSortByEmission(true)}
              >
                Globale CO₂-Rangliste
              </button>
            </div>
          </div>
        </div>
        <main className="container">
          <p>Hier sind die aktuellen Daten:</p>
          {/* Die Tabelle erhält NUR noch die gefilterten Daten als Prop */}
          {/* 
            Hier passiert die Magie: Wir übergeben die rohen Daten, den Suchbegriff 
            und die Sortierung an die FilterSuche. Diese filtert alles im Hintergrund 
            und rendert automatisch die CO2Table!
          */}
          <FilterSuche
            data={datenMitIds}
            searchTerm={searchTerm}
            sortOrder={sortOrder}
            sortByEmission={sortByEmission}
          />
        </main>
      </div>
      <p>Lorem, ipsum dolor.</p>
      <Footer />
    </>
  );
}

export default App;
