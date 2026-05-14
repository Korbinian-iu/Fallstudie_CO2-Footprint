// ============================================================================
// App.jsx
// ----------------------------------------------------------------------------
// Root-Komponente der Anwendung "CO2 Footprint" (Aufgabe 1.1 der Fallstudie).
//
// Verantwortlichkeiten dieser Komponente:
//   - Grundgerüst der Seite zusammensetzen
//       Titel + Logo + Navigation     -> <MyNavbar />              (1.1.b.a / 1.1.b.b)
//       Suchfeld im Header            -> <Header onSearch=...>     (1.1.b.e)
//       Buttons für Sortierung/Modus  -> direkt in App.jsx
//       Tabellen-Bereich              -> <FilterSuche ...>         (rendert
//                                        intern <CO2Table> oder <CO2RankTable>)
//
//   - Zustands-Verwaltung der UI-Steuerung über React-Hooks (useState):
//       searchTerm      : aktuelle Eingabe im Suchfeld
//       sortOrder       : Sortierrichtung "asc" oder "desc"
//       sortByEmission  : false = nach Ländern gruppiert,
//                         true  = globale CO₂-Rangliste (flache Tabelle)
//
// Die eigentliche Filter-/Sortierlogik liegt in components/SortFilter.jsx.
// ============================================================================

import React, { useState } from "react";
import { Button, Table, Container } from "react-bootstrap";

// Eigene Komponenten:
import MyNavbar from "./components/MyNavbar";
import CO2Table from "./components/CO2Table";
import CO2RankTable from "./components/CO2SortTable";
import { FilterSuche } from "./components/SortFilter";
import Header from "./components/SearchHeader";

// Datenquelle: statisches JSON-Array (siehe data/emissionsData.json)
import emissionsData from "./data/emissionsData";

function App() {
  // --------------------------------------------------------------------------
  // React-State: jede Änderung löst automatisch ein Re-Render der App aus.
  // --------------------------------------------------------------------------
  const [searchTerm, setSearchTerm] = useState("");      // Inhalt des Suchfeldes
  const [sortOrder, setSortOrder] = useState("asc");     // "asc" = A-Z / kleinste Emission zuerst
  const [sortByEmission, setSortByEmission] = useState(false); // Ansichts-Umschalter

  // Callback, das von der <SearchBar /> bei jeder Eingabe aufgerufen wird.
  // Schreibt den neuen Wert in den State -> <FilterSuche /> rendert neu.
  const handleSearch = (value) => {
    setSearchTerm(value);
  };

  return (
    <>
      <div className="App">
        {/* ---------- Kopfbereich: Titel, Navigation, Suche, Steuer-Buttons ---------- */}
        <div id="Header">
          <header>
            <h1>CO2 Footprint</h1>
          </header>

          <MyNavbar />

          {/* Header enthält die SearchBar; per onSearch wird handleSearch
              an das eigentliche <input> im SearchBar weitergereicht. */}
          <Header onSearch={handleSearch} />

          {/* Steuerleiste: links = Sortierrichtung, rechts = Anzeigemodus */}
          <div className="container mt-2 d-flex justify-content-between align-items-center">
            {/* Sortierung. Beschriftung passt sich an den Modus an:
                - Gruppen-Modus: A-Z / Z-A nach Ländern
                - Rangliste:     Wenig / Viel CO₂ zuerst                       */}
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

            {/* Umschalter zwischen gruppierter Tabelle und globaler Rangliste */}
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

        {/* ---------- Hauptbereich: Tabelle ---------- */}
        <main className="container">
          <p>Hier sind die aktuellen Daten:</p>

          {/* <FilterSuche /> bekommt Rohdaten + UI-State.
              Intern entscheidet die Komponente, ob sie <CO2Table />
              (gruppiert) oder <CO2RankTable /> (Rangliste) rendert. */}
          <FilterSuche
            data={emissionsData}
            searchTerm={searchTerm}
            sortOrder={sortOrder}
            sortByEmission={sortByEmission}
          />
        </main>
      </div>

      {/* Platzhalter – wird später durch einen echten Footer mit
          rechtlichen Hinweisen ersetzt (Aufgabe 1.1.b.b). */}
      <p>Lorem, ipsum dolor.</p>
    </>
  );
}

export default App;
