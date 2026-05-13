import CountryInfo from "./CountryInfo"
import CountryList from "./CountryList"
import { useState } from "react"

const Display = ({ matches }) => {
    const [showCountry, setShowCountry] = useState(null)

    const count = matches.length

    if (count === 0) {
        return null
    }

    if (count === 1) {
        return <CountryInfo country={matches[0]} />
    }
    
    if (count <= 10) {
        return (
            showCountry
                ? <CountryInfo country={showCountry} />
                : <CountryList matches={matches} onShow={setShowCountry} />
        )
    }

    return (
        <div>
            Too many matches, specify another filter
        </div>
    )
}

export default Display