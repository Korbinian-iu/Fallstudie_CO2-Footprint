const SearchBar = ({ onSearch }) => {
  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Suchen..."
        onChange={(e) => onSearch(e.target.value)}
        style={{ padding: '8px', borderRadius: '4px', border: '1px solid #aaa' }}
      />
    </div>
  );
};

export default SearchBar;
