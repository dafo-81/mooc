import axios from "axios";

const url = "http://localhost:3001/api/persons";

const create = (object) => {
	/*
	 * Create a member resource in the collection resource using the
	 * instructions in the request body. The URI of the created member
	 * resource is automatically assigned and returned in the response
	 * Location header field.
	 */
	return (axios.post(url, object));
}

const reload = () => {
	/*
	 * Retrieve the URIs of the member resources of the collection
	 * resource in the response body.
	 */
	return (axios.get(url));
}

const remove = (id) => {
	/* Delete all the representations of the member resource. */
	return (axios.delete(`${url}/${id}`));
}

const update = (id, object) => {
	/*
	 * Replace all the representations of the member resource or create
	 * the member resource if it does not exist, with the representation
	 * in the request body.
	 */
	return (axios.put(`${url}/${id}`, object));
}

export default {create, reload, remove, update};
