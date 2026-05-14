// ============================================================================
// CO2SortTable.jsx
// ----------------------------------------------------------------------------
// Flache Tabellen-Ansicht ("globale CO₂-Rangliste") – Aufgabe 1.1.b.e.
// Anders als <CO2Table /> wird hier NICHT nach Ländern gruppiert.
// Stattdessen erscheinen alle Unternehmen in einer einzigen, sortierbaren
// Liste – ideal, um z. B. die Top-Emittenten weltweit zu vergleichen.
//
// Props:
//   - data : Bereits flache, gefilterte und sortierte Liste aus <FilterSuche />.
//            Struktur eines Eintrags: { id, name, emission, land }
//
// Zusätzlich wird im <tfoot> die Summe aller aktuell angezeigten Emissionen
// ausgegeben (Gesamtsumme der gefilterten Auswahl).
// ============================================================================

import React from "react";

const CO2RankTable = ({ data }) => {
  // Gesamtsumme über alle aktuell sichtbaren Unternehmen (nach Filterung).
  // Wird im Tabellenfuß (<tfoot>) als Übersicht angezeigt.
  const gesamtEmissionGefiltert = data.reduce((sum, u) => sum + u.emission, 0);

  return (
    <table className="table table-striped table-bordered dynamic-table">
      <thead>
        <tr>
          <th>Land</th>
          <th>Unternehmen</th>
          <th>CO₂-Emissionen</th>
        </tr>
      </thead>

      <tbody>
        {/* Eine Zeile pro Unternehmen. */}
        {data.map((u) => (
          <tr key={u.id}>
            <td className="align-middle fw-bold">{u.land}</td>
            <td>{u.name}</td>
            <td>{u.emission} t</td>
          </tr>
        ))}
      </tbody>

      {/* Fuß-Zeile mit der Gesamtsumme – nur anzeigen, wenn überhaupt Daten da sind. */}
      {data.length > 0 && (
        <tfoot>
          <tr className="table-dark">
            <td colSpan="2" className="text-end fw-bold">Gesamtsumme (Auswahl):</td>
            <td className="fw-bold">{gesamtEmissionGefiltert} t</td>
          </tr>
        </tfoot>
      )}
    </table>
  );
};

export default CO2RankTable;
