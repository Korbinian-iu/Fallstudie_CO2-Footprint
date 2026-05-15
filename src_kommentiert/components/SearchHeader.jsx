// ============================================================================
// SearchHeader.jsx
// ----------------------------------------------------------------------------
// Header-Wrapper, der die <SearchBar /> einbettet.
// Stellt einen wiederverwendbaren Kopfbereich mit optionalem Titel und einem
// Suchfeld bereit (Aufgabe 1.1.b.e: Filtern der CO2-Tabelle).
//
// Props:
//   - title    : Überschrift, die im Header angezeigt wird (optional)
//   - onSearch : Callback, der an die <SearchBar /> durchgereicht wird
//                und bei jeder Eingabe den neuen Suchbegriff liefert.
// ============================================================================

// Hinweis: 'Form' aus react-bootstrap wird hier importiert, aktuell aber
// (noch) nicht verwendet. Kann später für ein gestyltes Formular um die
// Suche herum genutzt werden, oder bei Bedarf entfernt werden.
import { Form } from 'react-bootstrap';
import SearchBar from './SearchBar';

const Header = ({ onSearch, title }) => {
  return (
    // Schlichter Header mit Innenabstand und unterer Trennlinie.
    <header style={{ padding: '1rem', borderBottom: '1px solid #ccc' }}>
      <h1>{title}</h1>

      <div className="controls">
        {/* Die SearchBar bekommt onSearch durchgereicht – die eigentliche
            Filterlogik bleibt also außerhalb dieser Komponente. */}
        <SearchBar onSearch={onSearch} />
      </div>
    </header>
  );
};

export default Header;
