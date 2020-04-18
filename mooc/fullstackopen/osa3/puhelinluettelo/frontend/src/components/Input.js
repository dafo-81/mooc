import React from "react";

const Input = ({label, value, onChange}) => {
	/*
	 * You can nest the <input> directly inside the <label>, in which case
	 * the for and id attributes are not needed because the association is
	 * implicit.
	 */
	return (<label>{label}<input value={value} onChange={(event) =>
		onChange(event.target.value)}/></label>);
}

export default Input;
