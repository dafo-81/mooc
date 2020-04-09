import ReactDOM from 'react-dom';
import React, {useState} from 'react';

const Button = ({onClick, text}) => {
	return (<button onClick={onClick}>{text}</button>);
}

const Heading = ({text}) => {
	return (<h2>{text}</h2>);
}

const Statistics = ({good, neutral, bad}) => {
	let all = good + neutral + bad;

	if (all > 0) {
		return (
			<div>
			<table>
			<tbody>
			<StatisticsLine text="Good" value={good}/>
			<StatisticsLine text="Neutral" value={neutral}/>
			<StatisticsLine text="Bad" value={bad}/>
			<StatisticsLine text="All" value={all}/>
			<StatisticsLine text="Average" value={(good - bad) / all}/>
			<StatisticsLine text="Positive" value={(good / all) * 100 + "%"}/>
			</tbody>
			</table>
			</div>
		);
	} else {
		return (<div>No feedback given</div>);
	}
}

const StatisticsLine = ({text, value}) => {
	return (<tr><td>{text}</td><td>{value}</td></tr>);
}

const App = () => {
	const [good, setGood] = useState(0);
	const [neutral, setNeutral] = useState(0);
	const [bad, setBad] = useState(0);

	const onClickGood = () => setGood(good + 1);
	const onClickNeutral = () => setNeutral(neutral + 1);
	const onClickBad = () => setBad(bad + 1);

	return (
		<div>
		<Heading text="Give Feedback"/>
		<Button onClick={onClickGood} text="Good"/>
		<Button onClick={onClickNeutral} text="Neutral"/>
		<Button onClick={onClickBad} text="Bad"/>
		<Heading text="Statistics"/>
		<Statistics good={good} neutral={neutral} bad={bad}/>
		</div>
	);
}

ReactDOM.render(<App/>, document.getElementById("root"));
