import axios from "axios";
import React, {useEffect, useState} from "react";

const Button = ({type, text}) => {
	return (<div><button type={type}>{text}</button></div>);
}

const Filter = ({value, onChange}) => {
	return (<Input label="Filter" value={value} onChange={onChange}/>);
}

const Input = ({label, value, onChange}) => {
	return (<div><label htmlFor={label}>{label}</label>
		<input id={label} value={value} onChange={onChange}/></div>);
}

const PersonForm = (props) => {
	return (
		<form onSubmit={props.onSubmit}>
			<Input label="Name" value={props.name}
				onChange={props.onChangeName}/>
			<Input label="Number" value={props.number}
				onChange={props.onChangeNumber}/>
			<Button type="submit" text="Add"/>
		</form>
	);
}

const Persons = ({persons}) => {
	return (<div>{persons.map((person) =>
		<p key={person.name}>{person.name} {person.number}</p>)}</div>);
}

const App = () => {
	const [filter, setFilter] = useState("");
	const [name, setName] = useState("");
	const [number, setNumber] = useState("");
	const [persons, setPersons] = useState([]);

	useEffect(() => {
		axios.get("http://localhost:3001/persons").then(response => {
			setPersons(response.data);});
	}, []);

	const onChangeFilter = (event) => setFilter(event.target.value);
	const onChangeName = (event) => setName(event.target.value);
	const onChangeNumber = (event) => setNumber(event.target.value);

	const onSubmit = (event) => {
		event.preventDefault();
		if (name.length === 0 || number.length === 0) {
			return;
		}
		const names = persons.map((person) =>
			person.name.toLowerCase());
		if (names.includes(name.toLowerCase())) {
			alert(`${name} is already added to phonebook`);
		} else {
			setPersons(persons.concat({name: name, number: number}));
			setNumber("");
		}
		setName("");
	}

	const personsToShow = !filter.length ? persons :
		persons.filter(person => person.name.toLowerCase().includes(
			filter.toLowerCase()));

	return (
		<div>
			<h1>Phonebook</h1>
			<Filter value={filter} onChange={onChangeFilter}/>
			<h2>Add New</h2>
			<PersonForm
				onChangeName={onChangeName}
				onChangeNumber={onChangeNumber}
				onSubmit={onSubmit}
				name={name}
				number={number}/>
			<h2>Numbers</h2>
			<Persons persons={personsToShow}/>
		</div>
	);
}

export default App;
