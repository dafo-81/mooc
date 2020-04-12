import React, {useState} from "react";

const Anecdote = ({text, votes}) => {
	return (<><p>{text}</p><p>Has {votes} votes</p></>);
}

const Button = ({onClick, text}) => {
	return (<button onClick={onClick}>{text}</button>);
}

const Heading = ({text}) => {
	return (<h2>{text}</h2>);
}

const MostVotes = ({anecdotes, votes}) => {
	let index = 0, max = 0;

	for (let i = 0; i < votes.length; i++) {
		if (max < votes[i]) {
			max = votes[i];
			index = i;
		}
	}

	if (max > 0) {
		return (<Anecdote text={anecdotes[index]} votes={max}/>);
	} else {
		return (<p>No votes</p>);
	}
}

const App = (props) => {
	const [selected, setSelected] = useState(0);
	const [votes, setVotes] = useState(new Array(props.anecdotes.length).fill(0));

	const onClickNext = () => setSelected(
		Math.floor(Math.random() * props.anecdotes.length)
	);
	const onClickVote = () => {
		const copy = [...votes];
		copy[selected] += 1;
		setVotes(copy);
	};

	return (
		<div>
		<Heading text="Anecdote of the Day"/>
		<Anecdote text={props.anecdotes[selected]} votes={votes[selected]}/>
		<Button onClick={onClickVote} text="Vote"/>
		<Button onClick={onClickNext} text="Next Anecdote"/>
		<Heading text="Anecdote With Most Votes"/>
		<MostVotes anecdotes={props.anecdotes} votes={votes}/>
		</div>
	);
}

export default App;
