import emissionsData from "../data/emissionsData.json";
import {Container, Table} from "react-bootstrap";
import React from "react";

const CO2Table = () => {
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
          {emissionsData.map((landGruppe, index)=> { {/*landGruppe greift auf land zu und dessen Inhalt (=Unternehmen) aufgrund der Struktur in json*/}
            const gesamtEmission = landGruppe.unternehmen.reduce((acc, u) => acc + u.emission, 0);{/*variable u definieren um auf Emission zugreifen zu können*/}
            return (
              <React.Fragment key={index}> {/*gruppiert die Elemente, dass es nur ein Root-element gibt//1. Element der äußeren map Schleife braucht einen key, unterscheidet Länderblöcke*/}
                {landGruppe.unternehmen.map((u, i) => (
                  <tr key={`${index}-${i}`}>{/*unterscheidet Unternehmen innerhalb eines Landes z.B. 0-1, 0-2..., $=Platzhalter => jetzt kommt JS-Code*/}
                    {i === 0 && (
                      <td rowSpan={landGruppe.unternehmen.length} className="align-middle fw-bold">{/*rawSpan gibt an über wie viel Zeilen sich eine Zelle erstrecken soll, in diesem Fall über die anzahl der Unternehmen eines Landes*/ }
                        {landGruppe.land}
                      </td>
                    )}
                    <td>{u.name}</td>
                    <td>{u.emission} t</td>{/*für nächste Zeile: nur für erste zeile eines Unternehmens berechnen*/}
                    {i === 0 && (
                      <td rowSpan={landGruppe.unternehmen.length} className="align-middle">
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