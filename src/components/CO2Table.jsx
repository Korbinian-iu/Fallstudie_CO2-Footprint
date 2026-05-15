import { Container, Table } from "react-bootstrap";
import React from "react";

const CO2Table = ({ data }) => {
  return (
    <Container className="mt-5">
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
          {data.map((landGruppe) => {
            const gesamtEmission = landGruppe.unternehmen.reduce(
              (sum, u) => sum + u.emission,
              0,
            );
            return (
              <React.Fragment key={landGruppe.id}>
                {/*gruppiert die Elemente, dass es nur ein Root-element gibt//1. Element der äußeren map Schleife braucht einen key, unterscheidet Länderblöcke*/}
                {landGruppe.unternehmen.map((u, i) => (
                  <tr key={u.id}>
                    {/*unterscheidet Unternehmen innerhalb eines Landes z.B. 0-1, 0-2..., $=Platzhalter => jetzt kommt JS-Code*/}
                    {i === 0 && (
                      <td
                        rowSpan={landGruppe.unternehmen.length}
                        className="align-middle fw-bold"
                      >
                        {/*rawSpan gibt an über wie viel Zeilen sich eine Zelle erstrecken soll, in diesem Fall über die anzahl der Unternehmen eines Landes*/}
                        {landGruppe.land}
                      </td>
                    )}
                    <td>{u.name}</td>
                    <td>{u.emission} t</td>
                    {/*für nächste Zeile: nur für erste zeile eines Unternehmens berechnen*/}
                    {i === 0 && (
                      <td
                        rowSpan={landGruppe.unternehmen.length}
                        className="align-middle"
                      >
                        <strong>{gesamtEmission}t</strong>
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
