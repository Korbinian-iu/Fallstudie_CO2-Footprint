// ============================================================================
// SortFilter.jsx
// ----------------------------------------------------------------------------
// "Steuer-Komponente" für die Anzeige der CO2-Daten (Aufgabe 1.1.b.e).
//
// Bekommt vom <App />-Container:
//   - data            : Rohdaten aus emissionsData.json
//                       Struktur: [{ land, unternehmen: [{ id, name, emission }] }]
//   - searchTerm      : aktueller Inhalt des Suchfelds (kommaseparierte Begriffe)
//   - sortOrder       : "asc" oder "desc"
//   - sortByEmission  : false -> gruppiert nach Ländern  -> rendert <CO2Table />
//                       true  -> globale Rangliste flach -> rendert <CO2RankTable />
//
// Die Komponente ist bewusst stateless: sie liest nur Props, transformiert
// die Daten und gibt die passende Tabelle zurück. Das macht sie gut testbar
// und vermeidet Synchronisationsprobleme mit dem State in App.jsx.
// ============================================================================

import React from "react";
import CO2Table from "./CO2Table";
import CO2RankTable from "./CO2SortTable";

// Hinweis: Die Argumente stehen in geschweiften Klammern (Destructuring),
// damit man die Props direkt namentlich verwenden kann.
export const FilterSuche = ({ data, searchTerm, sortOrder, sortByEmission }) => {
  // --------------------------------------------------------------------------
  // 1) Suchbegriff(e) aufbereiten.
  //    Mehrere Begriffe können kommagetrennt eingegeben werden, z. B.
  //    "USA, U1". Pro Begriff wird Whitespace entfernt und kleingeschrieben.
  //    Leerer Suchstring -> leeres Array (kein Filter aktiv).
  // --------------------------------------------------------------------------
  const searchTerms = searchTerm
    ? searchTerm
        .toLowerCase()
        .split(",")
        .map((term) => term.trim())
        .filter((term) => term !== "")
    : [];

  // --------------------------------------------------------------------------
  // STRATEGIE A: Globale CO₂-Rangliste (flache Tabelle).
  // Es wird eine einzige Liste aller Unternehmen aufgebaut, anschließend
  // gefiltert und nach Emission sortiert. Gerendert in <CO2RankTable />.
  // --------------------------------------------------------------------------
  if (sortByEmission) {
    // Verschachteltes Array (Länder -> Unternehmen) zu einer flachen Liste
    // umwandeln und dabei das jeweilige Land mit jedem Unternehmen mitführen.
    let flacheListe = [];
    data.forEach((landGruppe) => {
      landGruppe.unternehmen.forEach((u) => {
        flacheListe.push({
          id: u.id,
          name: u.name,
          emission: u.emission,
          land: landGruppe.land,
        });
      });
    });

    // Filter: Eintrag bleibt, wenn EINER der Suchbegriffe entweder
    // im Firmennamen ODER im Ländernamen vorkommt.
    if (searchTerms.length > 0) {
      flacheListe = flacheListe.filter((u) =>
        searchTerms.some(
          (term) =>
            u.name.toLowerCase().includes(term) ||
            u.land.toLowerCase().includes(term)
        )
      );
    }

    // Numerische Sortierung nach Emissionswert.
    flacheListe.sort((a, b) => {
      if (sortOrder === "asc") return a.emission - b.emission; // wenig zuerst
      return b.emission - a.emission;                          // viel zuerst
    });

    return <CO2RankTable data={flacheListe} />;
  }

  // --------------------------------------------------------------------------
  // STRATEGIE B: Klassische Ansicht, nach Ländern gruppiert.
  // Daten werden pro Land transformiert und an <CO2Table /> übergeben.
  // --------------------------------------------------------------------------
  const bearbeiteteDaten = data
    .map((landGruppe) => {
      // Ohne Suchbegriff: Land komplett unverändert übernehmen.
      if (searchTerms.length === 0) return landGruppe;

      // Trifft der Suchbegriff direkt auf den Ländernamen?
      const landPasst = searchTerms.some((term) =>
        landGruppe.land.toLowerCase().includes(term)
      );

      // - Wenn das Land passt, behalten wir ALLE seine Unternehmen.
      // - Sonst werden nur die Unternehmen behalten, deren Name auf einen
      //   der Suchbegriffe passt.
      const gefilterteUnternehmen = landPasst
        ? landGruppe.unternehmen
        : landGruppe.unternehmen.filter((u) =>
            searchTerms.some((term) => u.name.toLowerCase().includes(term))
          );

      // Spread-Operator (...) erzeugt eine Kopie der Land-Gruppe und ersetzt
      // nur die Unternehmens-Liste. Originaldaten werden NICHT verändert
      // (Immutability -> wichtig für korrekte React-Renderzyklen).
      return { ...landGruppe, unternehmen: gefilterteUnternehmen };
    })
    // Länder ohne verbleibende Unternehmen vollständig aus der Liste entfernen.
    .filter((landGruppe) => landGruppe.unternehmen.length > 0)
    // Alphabetische Sortierung nach Land. localeCompare berücksichtigt
    // Sonderzeichen/Umlaute korrekt.
    .sort((a, b) => {
      if (sortOrder === "asc") return a.land.localeCompare(b.land); // A-Z
      return b.land.localeCompare(a.land);                          // Z-A
    });

  return <CO2Table data={bearbeiteteDaten} />;
};
