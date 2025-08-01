const Person = ({ person }) => (
  <li>{person.name} {person.number}</li>
)

const Persons = ({ persons, filter }) => (
    <ul>
        {persons
        .filter(person =>
          person.name.toLowerCase().includes(filter.toLowerCase())
        )
        .map((person) => (
          <Person key={person.name} person={person} />
        ))}
    </ul>
)

export default Persons
