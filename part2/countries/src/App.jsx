import { useState, useEffect } from 'react'
import axios from 'axios'
import Search from './components/Search'
import Display from './components/Display'

const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api'

const App = () => {
  const [searched, setSearched] = useState('')
  const [country, setCountry] = useState(null)

  useEffect(() => {
    if (searched) {
      console.log('fetching countries')
      console.log(`${baseUrl}/name/${searched}`)
      axios
        .get(`${baseUrl}/name/${searched}`)
        .then(response => {
          setCountry(response.data)
        })
        .catch(() => {
          console.log('error')
        })
    }
  }, [searched])

  const handleSearchedChange = (event) => {
    setSearched(event.target.value)
  }

  return (
    <div>
      <Search searched={searched} handleSearchedChange={handleSearchedChange}></Search>
      <Display country={country}></Display>
    </div>
  )
}

export default App
