const Display = ({ country }) => {
    if (!country)
        return null

    return (
        <div>
            <h1>{country.name.common} </h1>
            Capital {country.capital}<br />
            Area {country.area}
            <h2>Languages</h2>
            <ul>
                {Object.entries(country.languages).map(([code, name]) =>
                    <li key={code}>{name}</li>
                )}
            </ul>
            <img src={country.flags.png} alt={country.flags.alt} />
        </div>
    )
}

export default Display