import { useState } from 'react'

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>

const StatisticLine = ({ text, value }) => {
	return (
		<tr>
			<td>{text}</td>
			<td>{value}</td>
		</tr>
	)
}

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
			<table>
				<tbody>
					<StatisticLine text='good' value={good} />
					<StatisticLine text='neutral' value={neutral} />
					<StatisticLine text='bad' value={bad} />
					<StatisticLine text='all' value={count} />
					<StatisticLine text='average' value={average} />
					<StatisticLine text='positive' value={positive + ' %'} />
				</tbody>
			</table>
		</div>
	)
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
		<h1>give feedback</h1>
	  	<Button onClick={() => setGood(good + 1)} text='good' />
	  	<Button onClick={() => setNeutral(neutral + 1)} text='neutral' />
	  	<Button onClick={() => setBad(bad + 1)} text='bad' />
		<Statistics bad={bad} neutral={neutral} good={good} />
    </div>
  )
}

export default App
