import ReactDOMServer from "react-dom/server";
import { CloseIcon } from "@/components/icons";

/**
 * @param {String} message - Message that you want to display
 * @param {Function} callback - Callback after the modal has been closed
 * */
export function showMessage(message, callback) {
	"use client";

	const backgroundDiv = document.createElement("div");
	const modalDiv = document.createElement("div");
	const messageParagraph = document.createElement("p");
	const closeIcon = document.createElement("div");
	const buttonContainer = document.createElement("div");
	const closeButton = document.createElement("button");

	closeIcon.innerHTML = ReactDOMServer.renderToString(CloseIcon());
	closeIcon.className = "flex flex-row-reverse cursor-pointer mb-4";

	messageParagraph.innerText = message;

	buttonContainer.className = "flex justify-center mt-4";

	closeButton.innerText = "Close";
	closeButton.className = "rounded border px-3 py-2 cursor-pointer";

	backgroundDiv.onclick = () => {
		document.body.removeChild(backgroundDiv);
		backgroundDiv.remove();
		modalDiv.remove();
		messageParagraph.remove();
		closeIcon.remove();
		closeButton.remove();
		callback();
	};

	closeIcon.onclick = backgroundDiv.onclick;
	closeButton.onclick = backgroundDiv.onclick;

	backgroundDiv.className =
		"w-screen h-screen absolute z-50 left-0 top-0 bg-gray-950/50 flex justify-center";

	modalDiv.className = "bg-[var(--background)] border rounded h-fit p-4 mt-40";
	modalDiv.onclick = (e) => {
		e.stopPropagation();
	};

	buttonContainer.appendChild(closeButton);

	modalDiv.appendChild(closeIcon);
	modalDiv.appendChild(messageParagraph);
	modalDiv.appendChild(buttonContainer);

	backgroundDiv.appendChild(modalDiv);

	document.body.appendChild(backgroundDiv);
}
