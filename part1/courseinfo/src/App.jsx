const Header = (props) => {
  return (
    <div>
      <h1>
        {props.course}
      </h1>
    </div>
  )
}

const Part = (props) => {
  return (
    <div>
      <p>
        {props.part.part}, {props.part.ex}
      </p>
    </div>
  )
}

const Content = (props) => {
  return (
    <>
      <Part part={props.content[0]} />
      <Part part={props.content[1]} />
      <Part part={props.content[2]} />
    </>
  )
}

const Total = (props) => {
  return (
    <div>
      <p>
        Number of exercises {props.ex1 + props.ex2 + props.ex3}
      </p>
    </div>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const content = [
    { part: 'Fundamentals of React', ex: 10 },
    { part: 'Using props to pass data', ex: 7 },
    { part: 'State of a component', ex: 14 }
  ]

  return (
    <>
      <Header course={course} />
      <Content content={content} />
      <Total ex1={content[0].ex} ex2={content[1].ex} ex3={content[2].ex} />
    </>
  )
}

export default App
