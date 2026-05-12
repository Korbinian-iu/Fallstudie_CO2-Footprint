import React from "react";

const CO2RankTable = ({ data }) => {
  // Optionale Gesamtsumme aller aktuell angezeigten Unternehmen berechnen
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
        {data.map((u) => (
          <tr key={u.id}>
            <td className="align-middle fw-bold">{u.land}</td>
            <td>{u.name}</td>
            <td>{u.emission} t</td>
          </tr>
        ))}
      </tbody>
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