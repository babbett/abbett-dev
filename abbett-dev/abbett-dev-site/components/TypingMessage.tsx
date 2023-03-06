import React, { useEffect } from "react";

const TypingMessage = () => {
	// A simple typing effect. '<' is used to delete the last character. 
	// Everything else is added to the message.
	const message = "/* I'm Ben Abet<<bot<<ett */";
	
	const typingSpeed = Math.random() * 100 + 80;
	var index = 0;
	useEffect(() => {
		const intervalId = setInterval(() => {
			if (index < message.length) {
				if (message[index] !== "<") {
					document.getElementById("intro")!.innerHTML += message[index];
				} else {
					var currMessage = document.getElementById("intro")!.innerHTML;
					document.getElementById("intro")!.innerHTML = currMessage.substring(0, currMessage.length - 1);
				}
				index++;
			}

			// When finished, add change the color to a nice green.
			if (index == message.length) {
				document.getElementById("intro")!.className += " text-emerald-400";
				clearInterval(intervalId);
				return;
			}

			return () => clearInterval(intervalId);
		}, typingSpeed);
	}, [index, typingSpeed]);

	return <h2 className="text-4xl text-center mb-2" id="intro"></h2>;
};


export default TypingMessage;
