import axios from "axios";
import React, {useEffect, useState} from "react";

const Detail = ({data, index}) => {
	return (!data || index < 0 ? <></> :
		<div>
			<h2>{data[index].name}</h2>
			<p>Capital {data[index].capital}</p>
			<p>Population {data[index].population}</p>
			<h2>Languages</h2>
			<ul>
				{data[index].languages.map((language) =>
					<li key={language.nativeName}>{language.name}</li>)}
			</ul>
			<h2>Flag</h2>
			<img height="94" width="150" src={data[index].flag} alt=""/>
			<h2>Weather in {data[index].capital}</h2>
			<a href={"https://www.weathercity.com/" +
				data[index].alpha2Code.toLowerCase() + "/" +
					data[index].capital.toLowerCase()}>WeatherCity</a>
		</div>
	);
}

const Info = ({text}) => {
	return (<p><small>{text}</small></p>);
}

const Result = ({data, onClick}) => {
	if (!data) {
		return (<Info text="No Query"/>);
	} else if (!data.length) {
		return (<Info text="No Results"/>);
	} else if (data.length > 10) {
		return (<Info text={"Hidden Results (" + data.length + ")"}/>);
	} else if (data.length > 1) {
		return (<Select data={data} onClick={onClick}/>);
	} else {
		return (<Detail data={data} index={0}/>);
	}
}

const Select = ({data, onClick}) => {
	return (<div>{data.map((country, index) =>
		<p key={country.name}>{country.name}<button name={index}
			onClick={onClick}>Show</button></p>)}</div>);
}

const App = () => {
	const [data, setData] = useState([]);
	const [query, setQuery] = useState("");
	const [show, setShow] = useState(-1);

	useEffect(() => {
		axios.get("https://restcountries.eu/rest/v2/all")
			.then(response => setData(response.data));
	}, []);

	const onChangeQuery = (event) => {
		setQuery(event.target.value);
		setShow(-1);
	};
	const onClickShow = (event) => setShow(Number(event.target.name));

	const countries = !query.length ? undefined : data.filter(country =>
		country.name.toLowerCase().includes(query.toLowerCase()));

	return (
		<div>
			<h1>Country Information</h1>
			<label htmlFor="query">Query</label>
			<input id="query" value={query} onChange={onChangeQuery}/>
			<Result data={countries} onClick={onClickShow}/>
			<Detail data={countries} index={show}/>
		</div>
	);
}

export default App;
