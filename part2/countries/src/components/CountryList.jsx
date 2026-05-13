const CountryList = ({ matches, onShow }) => {
    return (
        <div>
            <ul>
                {matches.map((country => (
                    <li key={country.name.common}>
                        {country.name.common}
                        
                        <button onClick={() => onShow(country)}>
                            Show
                        </button>
                    </li>
                )))}
            </ul>
        </div>
    )
}

export default CountryList