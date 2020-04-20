const mongoose = require("mongoose");

/*
 * Everything in Mongoose starts with a Schema. Each schema maps to a MongoDB
 * collection and defines the shape of the documents within that collection.
 */
const dbname = "phonebook";
const personSchema = new mongoose.Schema({name: String, number: String});
const Person = mongoose.model("persons", personSchema);

const addPerson = (name, number) => {
	const person = new Person({name: name, number: number});

	person.save().then(response => {
		console.log(`Added ${name} number ${number} to ${dbname}`);
		mongoose.connection.close();
	});
}

const connectDB = (password) => {
	const url = `mongodb+srv://dafo-81:${password}@cluster0-bxjjb` +
		`.mongodb.net/${dbname}?retryWrites=true&w=majority`;

	return (mongoose.connect(url,
		{useNewUrlParser: true, useUnifiedTopology: true}));
}

const listPersons = () => {
	Person.find({}).then(result => {
		console.log(`${dbname}:`);
		result.forEach(person =>
			console.log(`${person.name} ${person.number}`));
		mongoose.connection.close();
	});
}

switch (process.argv.length) {
	case 3:
		connectDB(process.argv[2]).then(listPersons());
		break;
	case 5:
		connectDB(process.argv[2]).then(
			addPerson(process.argv[3], process.argv[4]));
		break;
	default:
		console.log("Usage: <pw> [<name> <number>]");
		process.exit(process.argv.length - 2);
		break;
}
