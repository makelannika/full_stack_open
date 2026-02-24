import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import phonebookService from './services/phonebook'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [number, setNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    phonebookService
      .getAll()
      .then(initialPersons => setPersons(initialPersons))
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    
    const personObject = {
      name: newName,
      number: number 
    }

    const existingPerson = persons.find(person => person.name === newName)
    
    if (existingPerson) {
        if (!confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
          return
        }

        phonebookService
          .update(existingPerson.id, personObject)
          .then(updatedPerson => {
            setPersons(persons.map(person => person.id !== updatedPerson.id ? person : updatedPerson))
            setNewName('')
            setNumber('')
          })

        return
    }

    phonebookService
      .create(personObject)
      .then(newPerson => {
        setPersons(persons.concat(newPerson))
        setNewName('')
        setNumber('')
      }) 
  }

  const deletePerson = id => {
    const person = persons.find(p => p.id === id)

    if (!confirm(`Delete ${person.name} from phonebook?`))
      return

    phonebookService
      .remove(id)
      .then(setPersons(persons.filter(p => p.id !== id)))
      .catch(err => {
        console.log(err)
    })
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter
        filter={filter}
        handleFilterChange={handleFilterChange} />
      
      <h2>add a new</h2>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        number={number}
        handleNumberChange={handleNumberChange}
      />
      
      <h2>Numbers</h2>
      <Persons
        persons={persons}
        filter={filter}
        handleDelete={deletePerson}/>
    </div>
  )
}

export default App
