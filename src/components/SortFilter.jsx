import React from "react";
import CO2Table from "./CO2Table";
import CO2RankTable from "./CO2SortTable";

// WICHTIG: Die Argumente MÜSSEN in geschweiften Klammern stehen (Destructuring)
export const FilterSuche = ({ data, searchTerm, sortOrder, sortByEmission }) => {
  // Sicherheitsnetz: Falls kein Suchbegriff da ist, nutze leeren Text
const searchTerms = searchTerm
    ? searchTerm
        .toLowerCase()
        .split(",")
        .map((term) => term.trim())
        .filter((term) => term !== "")
        :[];

      // STRATEGIE A: Globale CO₂-Rangliste (Flache Tabelle)
  if (sortByEmission) {
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

    // Filter greift, wenn der Begriff im Firmennamen ODER im Land vorkommt
    if (searchTerms.length > 0) {
      flacheListe = flacheListe.filter((u) =>
        searchTerms.some(
          (term) =>
            u.name.toLowerCase().includes(term) ||
            u.land.toLowerCase().includes(term)
        )
      );
    }

    flacheListe.sort((a, b) => {
      if (sortOrder === "asc") return a.emission - b.emission;
      return b.emission - a.emission;
    });

    return <CO2RankTable data={flacheListe} />;
  }

  // STRATEGIE B: Klassische Ansicht (Nach Ländern gruppiert)
  const bearbeiteteDaten = data
    .map((landGruppe) => {
      if (searchTerms.length === 0) return landGruppe;

      // Prüfen, ob das Land selbst direkt gesucht wird
      const landPasst = searchTerms.some((term) =>
        landGruppe.land.toLowerCase().includes(term)
      );

      // Wenn das Land passt, behalten wir ALLE seine Unternehmen.
      // Wenn nicht, filtern wir nach den passenden Unternehmen.
      const gefilterteUnternehmen = landPasst
        ? landGruppe.unternehmen
        : landGruppe.unternehmen.filter((u) =>
            searchTerms.some((term) => u.name.toLowerCase().includes(term))
          );

      return { ...landGruppe, unternehmen: gefilterteUnternehmen };
    })
    .filter((landGruppe) => landGruppe.unternehmen.length > 0)
    .sort((a, b) => {
      if (sortOrder === "asc") return a.land.localeCompare(b.land);
      return b.land.localeCompare(a.land);
    });

  return <CO2Table data={bearbeiteteDaten} />;
};
