const CountryList = ({ matches }) => {
    return (
        <div>
            <ul>
                {matches.map((country => (
                    <div key={country.name.common}>
                        {country.name.common}
                    </div>
                )))}
            </ul>
        </div>
    )
}

export default CountryList