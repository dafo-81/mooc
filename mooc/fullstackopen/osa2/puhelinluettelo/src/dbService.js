import axios from "axios";

const baseURL = "http://localhost:3001/persons";

const remove = (id) => {
	return (axios.delete(`${baseURL}/${id}`));
}

const getEveryone = () => {
	return (axios.get(baseURL));
}

const insert = (person) => {
	return (axios.post(baseURL, person));
}

const update = (id, person) => {
	return (axios.put(`${baseURL}/${id}`, person));
}

export default {
	remove,
	getEveryone,
	insert,
	update
};
