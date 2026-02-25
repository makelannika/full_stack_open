import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import phonebookService from './services/phonebook'
import Notification from './components/Notification'
import './index.css'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [number, setNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)

  useEffect(() => {
    phonebookService
      .getAll()
      .then(initialPersons => setPersons(initialPersons))
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      setSuccess(null)
      setError(null)
    }, 5000)

    return () => clearTimeout(timer)
  }, [success, error])

  const clearForm = () => {
    setNewName('')
    setNumber('')
  }

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
            setSuccess(`${updatedPerson.name} updated`)
            clearForm()
          })

      return
    }

    phonebookService
      .create(personObject)
      .then(newPerson => {
        setPersons(persons.concat(newPerson))
        setSuccess(`Added ${newPerson.name}`)
        clearForm()
      })
  }

  const deletePerson = id => {
    const person = persons.find(p => p.id === id)

    if (!confirm(`Delete ${person.name} from phonebook?`))
      return

    phonebookService
      .remove(id)
      .then(deletedPerson => {
        setPersons(persons.filter(p => p.id !== deletedPerson.id))
        setSuccess(`${person.name} deleted`)
      })
      .catch(() => {
        setError(`${person.name} has already been removed from server`)
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
      <Notification error={error} success={success} />
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
