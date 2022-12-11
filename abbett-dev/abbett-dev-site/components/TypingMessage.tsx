import React, { useState, useEffect } from "react";

const TypingMessage = () => {

  useEffect(() => {
	// Add an effect that looks like typing the current message
	// < characters are treated as backspaces
	const message: string = "/* I'm Ben Abet<<bot<<ett */";
	var index = 0;

	const intervalId = setInterval(function () {
	  if (index == 0) {
		document.getElementById("intro")!.innerHTML = "";
	  }

	  if (index < message.length) {
		if (message[index] !== "<") {
		  document.getElementById("intro")!.innerHTML += message[index];
		} else {
		  var currMessage = document.getElementById("intro")!.innerHTML;
		  document.getElementById("intro")!.innerHTML = currMessage.substring(
			0,
			currMessage.length - 1
		  );
		}
		index++;
	  }

	  if (index == message.length) {
		document.getElementById("intro")!.className += " text-emerald-400";
		clearInterval(intervalId);
	  }
	}, Math.random() * 100 + 80);
  }, []);

  return <h2 className="text-4xl text-center mb-2" id="intro"></h2>;
};

export default TypingMessage;
