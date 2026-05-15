// ============================================================================
// CO2Table.jsx
// ----------------------------------------------------------------------------
// Gruppierte Tabellen-Ansicht der CO2-Emissionsdaten (Aufgabe 1.1.b.e).
// Eine Zeilengruppe pro Land; ein Land enthält mehrere Unternehmen.
//
// Spalten:
//   1) Land                   -> nur einmal pro Land (zusammengefasst via rowSpan)
//   2) Unternehmen            -> eine Zeile je Unternehmen
//   3) CO2-Emission           -> Einzelwert in Tonnen
//   4) CO2-Emission Gesamt    -> Summe aller Unternehmen des Landes (rowSpan)
//
// Props:
//   - data : bereits gefiltertes/sortiertes Array (kommt aus <FilterSuche />).
//            Struktur:
//              [{ land: "USA", unternehmen: [ { id, name, emission }, ... ] }, ...]
// ============================================================================

import { Container, Table } from "react-bootstrap";
import React from "react";

const CO2Table = ({ data }) => {
  return (
    <Container className="mt-5">
      {/* bordered + hover -> Bootstrap-Standardlook mit Rahmen und Hover-Effekt. */}
      <Table bordered hover>
        <thead className="table-dark">
          <tr>
            <th>Land</th>
            <th>Unternehmen</th>
            <th>CO2-Emission</th>
            <th>CO2-Emission Gesamt</th>
          </tr>
        </thead>

        <tbody>
          {/* Äußere Schleife: ein Durchlauf je Land. */}
          {data.map((landGruppe) => {
            // Gesamtemission des Landes: Summe der Emissionen aller Unternehmen.
            const gesamtEmission = landGruppe.unternehmen.reduce(
              (sum, u) => sum + u.emission,
              0
            );

            return (
              // React.Fragment gruppiert mehrere <tr> ohne zusätzliches DOM-Element.
              // key ist nötig, damit React Listen effizient aktualisieren kann.
              <React.Fragment key={landGruppe.id}>
                {/* Innere Schleife: eine <tr> je Unternehmen des Landes. */}
                {landGruppe.unternehmen.map((u, i) => (
                  <tr key={u.id}>
                    {/* Land-Spalte nur in der ERSTEN Zeile des Landes ausgeben.
                        rowSpan dehnt die Zelle über alle Unternehmens-Zeilen. */}
                    {i === 0 && (
                      <td
                        rowSpan={landGruppe.unternehmen.length}
                        className="align-middle fw-bold"
                      >
                        {landGruppe.land}
                      </td>
                    )}

                    <td>{u.name}</td>
                    <td>{u.emission} t</td>

                    {/* Gesamtemission analog dazu nur einmal pro Land anzeigen. */}
                    {i === 0 && (
                      <td
                        rowSpan={landGruppe.unternehmen.length}
                        className="align-middle"
                      >
                        <strong>{gesamtEmission} t</strong>
                      </td>
                    )}
                  </tr>
                ))}
              </React.Fragment>
            );
          })}
        </tbody>
      </Table>
    </Container>
  );
};

export default CO2Table;
