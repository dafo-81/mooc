import Input from "./components/Input";
import Message from "./components/Message";
import netDB from "./services/netDB";
import Persons from "./components/Persons";
import React, {useEffect, useState} from "react";
import "./style.css";

const App = () => {
	const [filter, setFilter] = useState("");
	const [message, setMessage] = useState({text: "", error: false});
	const [name, setName] = useState("");
	const [number, setNumber] = useState("");
	const [persons, setPersons] = useState([]);

	useEffect(() => {
		netDB.reload().then(response => {
			setPersons(response.data);
		});
	}, []);

	const onClickDelete = (id) => {
		const found = persons.find(person => person.id === id);
		if (!window.confirm(`Delete ${found.name}?`)) {
			return;
		}
		netDB.remove(id).then(response => {
			setPersons(persons.filter(person => person.id !== id));
			setMessage({text: `Deleted ${found.name}`, error: false});
		});
	}

	const onSubmitPerson = (event) => {
		event.preventDefault();

		const found = persons.find(person =>
			person.name.toLowerCase() === name.toLowerCase());
		if (found && found.number === number) {
			alert(`${name} already exists`);
			[setName, setNumber].forEach(set => set(""));
			return;
		}
		if (found && window.confirm(`Change ${name}'s number?`)) {

			return; /* TODO backend in exercise 3.17 */

			const copy = {...found, number: number};
			netDB.update(copy.id, copy).then(response => {
				setPersons(persons.map(person =>
					person.id !== copy.id ?
						person : response.data));
				setMessage({text: `Updated ${name}`, error: false});
			}).catch(error => {
				setMessage({error: true,
					text: `${name} does not exist`});
				setPersons(persons.filter(person =>
					person.id !== copy.id));
			});
			[setName, setNumber].forEach(set => set(""));
			return;
		}

		const person = {name: name, number: number};
		netDB.create(person).then(response => {
			setPersons(persons.concat(response.data));
			setMessage({text: `Added ${name}`, error: false});
			[setName, setNumber].forEach(set => set(""));
		});
	}

	const shownPersons = !filter.length ? persons : persons.filter(person =>
		person.name.toLowerCase().includes(filter.toLowerCase()));

	return (
		<>
		<h2>Phonebook</h2>
		<Message message={message} setMessage={setMessage}/>
		<h4>Filter by Name</h4>
		<Input label="Filter" value={filter} onChange={setFilter}/>
		<h4>Add New</h4>
		<form onSubmit={onSubmitPerson}>
			<Input label="Name" value={name} onChange={setName}/>
			<Input label="Number" value={number} onChange={setNumber}/>
			<button type="submit">Add</button>
		</form>
		<h2>Numbers</h2>
		<Persons persons={shownPersons} onClick={onClickDelete}/>
		</>
	);
}

export default App;
