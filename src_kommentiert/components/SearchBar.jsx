// ============================================================================
// SearchBar.jsx
// ----------------------------------------------------------------------------
// Wiederverwendbares Eingabefeld zur Filterung der CO2-Tabelle
// (Aufgabe 1.1.b.e: "nach Land und Unternehmen ... gefiltert").
//
// Props:
//   - onSearch : Callback, das bei jeder Eingabe-Änderung mit dem aktuellen
//                Such-String aufgerufen wird. Die Eltern-Komponente
//                entscheidet, was damit geschieht (in App.jsx z. B.
//                setSearchTerm aufrufen).
//
// Hinweis zur Sicherheit (Aufgabe 1.1.b.f):
//   React rendert Text-Inhalte standardmäßig escaped. Eingegebener HTML- bzw.
//   JS-Code (z. B. "<script>...") wird daher NICHT ausgeführt, sondern als
//   reiner Text behandelt. Damit ist eine direkte XSS-Injektion über dieses
//   Feld unterbunden.
// ============================================================================

const SearchBar = ({ onSearch }) => {
  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Suchen..."
        // onChange feuert bei jeder Tastatureingabe. e.target.value enthält
        // den aktuellen Inhalt des Feldes und wird nach oben gereicht.
        onChange={(e) => onSearch(e.target.value)}
        style={{ padding: '8px', borderRadius: '4px', border: '1px solid #aaa' }}
      />
    </div>
  );
};

export default SearchBar;
