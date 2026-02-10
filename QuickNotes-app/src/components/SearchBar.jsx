import "./SearchBar.css";
function SearchBar({ search, setSearch }) {
  return (
    <div className="search-bar">
      <input
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
        placeholder="search notes..."
      ></input>
    </div>
  );
}
export default SearchBar;
