import ReactDOM from "react-dom";
import React from "react";

const Content = ({parts}) => {
	return (
		<div>
		<Part name={parts[0].name} exercises={parts[0].exercises}/>
		<Part name={parts[1].name} exercises={parts[1].exercises}/>
		<Part name={parts[2].name} exercises={parts[2].exercises}/>
		</div>
	);
}

const Header = (props) => {
	return (<h1>{props.course}</h1>);
}

const Part = (props) => {
	return (<p>{props.name} {props.exercises}</p>);
}

const Total = ({parts}) => {
	return (<p>Number of Exercises {
		parts[0].exercises +
		parts[1].exercises +
		parts[2].exercises
	}</p>);
}

const App = () => {
	const course = {
		name: "Half Stack Application Development",
		parts: [
			{ name: "Fundamentals of React", exercises: 10 },
			{ name: "Using Props to Pass Data", exercises: 7 },
			{ name: "State of a Component", exercises: 14 }
		]
	};

	return (
		<div>
		<Header course={course.name}/>
		<Content parts={course.parts}/>
		<Total parts={course.parts}/>
		</div>
	);
}

ReactDOM.render(<App/>, document.getElementById("root"));
