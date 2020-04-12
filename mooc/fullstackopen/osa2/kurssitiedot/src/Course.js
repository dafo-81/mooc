import React from "react";

const Content = ({parts}) => {
	return (parts.map((part) =>
		<Part key={part.id.toString()}
			name={part.name} exercises={part.exercises}/>
	));
}

const CourseList = ({course}) => {
	return (
		<div>
			<h1>{course.name}</h1>
			<Content parts={course.parts}/>
			<Total parts={course.parts}/>
		</div>
	);
}

const Part = ({name, exercises}) => {
	return (<p>{name} {exercises}</p>);
}

const Total = ({parts}) => {
	let total = parts.reduce((acc, cur) => {
		return acc + cur.exercises;
	}, 0);
	return (<p><b>Total of {total} exercises</b></p>);
}

const Course = ({courses}) => {
	return (courses.map((course) =>
		<CourseList key={course.id.toString()} course={course}/>
	));
}

export default Course;
