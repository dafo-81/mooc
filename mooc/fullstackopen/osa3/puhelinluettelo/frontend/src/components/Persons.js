import React from "react";

const PersonItem = ({person, onClick}) => {
	return (<li>{person.name} {person.number}<button onClick={() =>
		onClick(person.id)}>Delete</button></li>);
}

const PersonList = ({persons, onClick}) => {
	return (persons.map(person =>
		<PersonItem key={person.name}
			person={person} onClick={onClick}/>));
}

const Persons = ({persons, onClick}) => {
	return (<ul><PersonList persons={persons} onClick={onClick}/></ul>);
}

export default Persons;
