import { useState } from 'react'

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>

const Statistics = ({ good, neutral, bad}) => {
	const sum = good - bad
	const count = good + neutral + bad
	const average = count === 0 ? 0 : sum / count
	const positive = count === 0 ? 0 : (good / count) * 100

	if (count === 0) {
		return (
			<div>
				<h1>satistics</h1>
				<div>No feedback given</div>
			</div>
		)
	}
	return (
		<div>
			<h1>satistics</h1>
			<div>good {good}</div>
			<div>neutral {neutral}</div>
			<div>bad {bad}</div>
			<div>average {average}</div>
			<div>positive {positive} %</div>
		</div>
	)
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleBadClick = () => {
	setBad(bad + 1)
  }

  const handleNeutralClick = () => {
	setNeutral(neutral + 1)
  }

  const handleGoodClick = () => {
	setGood(good + 1)
  }

  return (
    <div>
		<h1> give feedback</h1>
	  	<Button onClick={handleGoodClick} text='good' />
	  	<Button onClick={handleNeutralClick} text='neutral' />
	  	<Button onClick={handleBadClick} text='bad' />
		<Statistics bad={bad} neutral={neutral} good={good} />
    </div>
  )
}

export default App
