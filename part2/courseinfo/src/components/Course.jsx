const Course = ({ course }) => (
  <div>
    <Header name={course.name} />
    <Content parts={course.parts} />
    <Total parts={course.parts} />
  </div>
)

const Header = ({ name }) => <h1>{name}</h1>

const Content = ({ parts }) => (
  <ul>
    {parts.map(part => (
      <li key={part.id}>
        <Part part={part} />
      </li>
    ))}
  </ul>
)

const Part = ({ part }) => (
  <p>
    {part.name} {part.exercises}
  </p>
)

const Total = ({ parts }) => {
  const sum = parts.reduce(
    (accumulator, currentValue) => accumulator + currentValue.exercises,
    0,
  )

  return (
    <p>Total of {sum} exercises</p>
  )
}

export default Course
