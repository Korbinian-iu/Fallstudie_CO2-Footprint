
import {Form} from 'react-bootstrap';
import SearchBar from './SearchBar';

const Header = ({ onSearch, title }) => {
  return (
    <header style={{ padding: '1rem', borderBottom: '1px solid #ccc' }}>
      <h1>{title}</h1>
      <div className="controls">
        {/* Hier wird die Such-Komponente aufgerufen */}
        <SearchBar onSearch={onSearch} />
      </div>
    </header>
  );
};

export default Header;
