import { useState, useEffect } from 'react'
import axios from 'axios'
import Search from './components/Search'
import Display from './components/Display'

const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api'

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

  let matches = []

  useEffect(() => {
    axios
      .get(`${baseUrl}/all`)
      .then(response => {
        setCountries(response.data)
      })
      .catch(() => {
        console.log('could not fetch countries')
      })
  }, [])

  if (filter) {
    matches = countries.filter(country =>
      country.name.common
      .toLowerCase()
      .includes(filter.toLowerCase())
    )
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  return (
    <div>
      <Search filter={filter} handleFilterChange={handleFilterChange} />
      <Display key={filter} matches={matches} />
    </div>
  )
}

export default App
