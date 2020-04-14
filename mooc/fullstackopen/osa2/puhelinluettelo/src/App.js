import dbService from "./dbService";
import React, {useEffect, useState} from "react";

const ShowMessage = ({message, setMessage, error}) => {
	if (message) {
		setTimeout(() => {
			setMessage(null);
		}, 5000);
	}
	return (!message ? <></> :
		<p className={error ? "error" : "message"}>{message}</p>);
}

const App = () => {
	const [filter, setFilter] = useState("");
	const [error, setError] = useState(false);
	const [message, setMessage] = useState(null);
	const [name, setName] = useState("");
	const [number, setNumber] = useState("");
	const [persons, setPersons] = useState([]);

	useEffect(() => {
		dbService.getEveryone().then(response => {
			setPersons(response.data);
		});
	}, []);

	const onClickDelete = (id) => {
		const found = persons.find(person => person.id === id);

		if (window.confirm("Delete " + found.name + " ?")) {
			dbService.remove(id).then(response => {
				setPersons(persons.filter(person => person.id !== id));
				setMessage("Deleted " + found.name);
				setError(false);
			});
		}
	}

	const onSubmitPerson = (event) => {
		event.preventDefault();

		if (!name.length || !number.length) {
			setMessage("Name and number must be set");
			setError(true);
			return;
		}

		const found = persons.find(person =>
			person.name.toLowerCase() === name.toLowerCase());

		if (!found) {
			dbService.insert({name, number}).then(response => {
				setPersons(persons.concat(response.data));
				setMessage("Added " + name);
				setError(false);
			});
		} else if (found.number !== number) {
			if (window.confirm(`Update ${name} to ${number} ?`)) {
				dbService.update(found.id, {...found, number: number})
				.then(response => {
					setPersons(persons.map(person =>
						person.id !== found.id ?
							person : response.data));
					setMessage("Updated " + name);
					setError(false);
				}).catch((error) => {
					setMessage("Information of " + name +
						" has been removed from server");
					setError(true);
				});
			}
		} else {
			setMessage(name + " is already in phonebook");
			setError(true);
		}

		setName("");
		setNumber("");
	}

	const filteredPersons = !filter.length ? persons :
		persons.filter(person => person.name.toLowerCase().includes(
			filter.toLowerCase()));

	return (
		<div>
			<h1>Phonebook</h1>
			<ShowMessage message={message} setMessage={setMessage}
				error={error}/>

			<h2>Filter by Name</h2>
			<div>
				<label htmlFor="filter">Filter</label>
				<input id="filter" value={filter} onChange={(event) =>
					setFilter(event.target.value)}/>
			</div>

			<h2>Add New Contact</h2>
			<form onSubmit={onSubmitPerson}>
				<div>
					<label htmlFor="name">Name</label>
					<input id="name" value={name} onChange={(event) =>
						setName(event.target.value)}/>
				</div>
				<div>
					<label htmlFor="pn">Number</label>
					<input id="pn" value={number} onChange={(event) =>
						setNumber(event.target.value)}/>
				</div>
				<button type="submit">Save</button>
			</form>

			<h2>Contacts List</h2>
			<ul>
				{filteredPersons.map((person) => <li key={person.id}>
					{person.name} {person.number}<button onClick={() =>
						onClickDelete(person.id)}>Delete</button></li>)}
			</ul>
		</div>
	);
}

export default App;
