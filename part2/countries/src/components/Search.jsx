const Search = ({ searched, handleSearchedChange }) =>  (
    <div>
        find countries <input
        value={searched}
        onChange={handleSearchedChange}
        />
    </div>
)

export default Search