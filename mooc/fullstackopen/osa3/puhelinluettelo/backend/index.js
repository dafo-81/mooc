const cors = require("cors");
const express = require("express");
const morgan = require("morgan");
const port = process.env.PORT || 3001;
const server = express();

server.use(cors());
server.use(express.json());
server.use(express.static("build"));

morgan.token("pdata", (request, response) => {
	if (request.method.toLowerCase() === "post") {
		return (JSON.stringify(request.body));
	} else {
		return (null);
	}
});

server.use(morgan(
	/*
	 * Tokens for predefined "tiny" and custom token to display POST
	 * payload data. This seems to leave trailing dash if method is
	 * anything else.
	 */
	":method :url :status :res[content-length] - :response-time ms :pdata"
));

let persons = [
	{"id": 1, "name": "Arto Hellas", "number": "040-123456"},
	{"id": 2, "name": "Ada Lovelace", "number": "39-44-5323523"},
	{"id": 3, "name": "Dan Abramov", "number": "12-43-234345"},
	{"id": 4, "name": "Mary Poppendieck", "number": "39-23-6423122"}
];

server.delete("/api/persons/:id", (request, response) => {
	const id = Number(request.params.id);

	persons = persons.filter(person => person.id !== id);
	/*
	 * The server successfully processed the request and is not returning
	 * any content.
	 */
	response.status(204).end();
});

server.get("/api/persons/:id", (request, response) => {
	const id = Number(request.params.id);
	const person = persons.find(person => person.id === id);

	if (person) {
		response.send(person);
	} else {
		/*
		 * The requested resource could not be found but may be
		 * available in the future. Subsequent requests by the client
		 * are permissible.
		 */
		response.status(404).end();
	}
});

server.get("/api/persons", (request, response) => {
	/*
	 * When the parameter is an Array or Object, Express responds with the
	 * JSON representation.
	 */
	response.send(persons);
});

server.get("/info", (request, response) => {
	const info = `Phonebook holds ${persons.length} people`;

	response.send(`<pre>${info}\n${new Date()}</pre>`);
});

/*
 * Binds and listens for connections on the specified host and port. This
 * method is identical to Node’s http.Server.listen().
 */
server.listen(port, () => console.log(`Listening on port ${port}`));

server.post("/api/persons", (request, response) => {
	const name = request.body.name;
	const number = request.body.number;

	if (!name.length || !number.length) {
		/*
		 * The server cannot or will not process the request due to an
		 * apparent client error (e.g., malformed request syntax, size
		 * too large, invalid request message framing, or deceptive
		 * request routing).
		 */
		return (response.status(400).send({error: "Name or number unset"}));
	}

	const found = persons.find(person =>
		person.name.toLowerCase() === name.toLowerCase());

	if (found) {
		/*
		 * Indicates that the request could not be processed because
		 * of conflict in the current state of the resource, such as
		 * an edit conflict between multiple simultaneous updates.
		 */
		return (response.status(409).send({error: "Name exists"}));
	}

	/* Use UNIX epoch milliseconds instead of Math.random() */
	const person = {id: new Date().getTime(), name: name, number: number};

	persons = persons.concat(person);
	response.send(person);
});
