import CountryInfo from "./CountryInfo"
import CountryList from "./CountryList"

const Display = ({ matches }) => {
    const count = matches.length

    if (count === 0) {
        return null
    }

    if (count === 1) {
        return <CountryInfo country={matches[0]} />
    }
    
    if (count <= 10) {
        return <CountryList matches={matches} />
    }

    return (
        <div>
            Too many matches, specify another filter
        </div>
    )
}

export default Display