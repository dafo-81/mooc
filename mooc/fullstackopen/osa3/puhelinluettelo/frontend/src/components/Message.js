import React from "react";

const Message = ({message, setMessage}) => {
	if (!message.text.length) {
		return (null);
	}
	setTimeout(() => {setMessage({text: "", error: false})}, 5000);
	return (<div className={message.error ? "error" : "message"}>
		{message.text}</div>);
}

export default Message;
