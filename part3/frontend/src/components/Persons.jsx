const Person = ({ person, handleDelete }) => (
  <li>
    {person.name} {person.number}
    <button onClick={handleDelete}>delete</button>
  </li>
)

const Persons = ({ persons, filter, handleDelete }) => (
  <ul>
    {persons
      .filter(person =>
        person.name.toLowerCase().includes(filter.toLowerCase())
      )
      .map((person) => (
        <Person
          key={person.name}
          person={person}
          handleDelete={() => handleDelete(person.id)}/>
      ))}
  </ul>
)

export default Persons
