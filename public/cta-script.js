/**
 * @typedef {Object} CTAData
 * @property {String} userEmail
 * @property {String} domain
 * @property {String} btnText
 * @property {String} btnColor
 * @property {("small"|"medium"|"large")} btnSize
 * @property {String} font
 * @property {String} alignment
 * @property {String} explanation
 * */

/** @type {HTMLDivElement[]} */
const lrCtaDivs = document.getElementsByClassName("lead-rabbit-cta");
const ctaId = document.currentScript.dataset.leadRabbitToken;

/**
 * @param {String} colorStr
 * @param {Number} percent - Number between 0 and 1
 * */
function darkenColor(colorStr, percent) {
	const r = Number.parseInt(colorStr.slice(1, 3), 16);
	const g = Number.parseInt(colorStr.slice(3, 5), 16);
	const b = Number.parseInt(colorStr.slice(5, 7), 16);

	// Scale down each channel by the darkening percentage
	const scale = 1 - Math.min(percent, 1); // Ensure percent <= 1 (e.g., 0.2 for 20%)
	const darkenedR = Math.round(r * scale);
	const darkenedG = Math.round(g * scale);
	const darkenedB = Math.round(b * scale);
	// Convert back to two-digit hex strings with padding
	const toHex = (value) => value.toString(16).padStart(2, "0");

	return `#${toHex(darkenedR)}${toHex(darkenedG)}${toHex(darkenedB)}`;
}

/**
 * @param {MouseEvent} e
 * */
function buttonClickHandler(e) {
	/** @type {HTMLInputElement} */
	const input = document.getElementsByClassName("lead-rabbit-cta-input")[0];
	/** @type {HTMLParagraphElement} */
	const errorMsg = document.getElementsByClassName("lead-rabbit-cta-error")[0];

	if (input.value.length === 0) {
		errorMsg.innerText = "Email field cannot be empty";
		errorMsg.style.opacity = "1";
		input.style.borderColor = "red";
		return;
	}

	if (!input.validity.valid) {
		errorMsg.innerText = "Must be a valid email address";
		errorMsg.style.opacity = "1";
		input.style.borderColor = "red";
		return;
	}

	// Email is valid

	errorMsg.innerText = "_";
	errorMsg.style.opacity = "0";
	input.style.borderColor = "";

	fetch(`https://www.lead-rabbit.com/api/cta/${ctaId}`, {
		method: "POST",
		body: JSON.stringify({
			email: input.value,
		}),
	})
		.then((res) => {
			if (res.status === 200) {
				input.value = "";
			}
		})
		.catch(console.error);
}

/**
 * @param {CTAData} ctaData
 * */
function createCtaButton(ctaData) {
	const styleStr = `
        .lead-rabbit-cta-elements {
            border: 1px solid gray;
            border-radius: 0.25rem;
            font-family: ${ctaData.font};
            box-sizing: border-box;
        }
        .lead-rabbit-cta-button {
            background-color: ${ctaData.btnColor};
            color: white;
        }
        .lead-rabbit-cta-button:hover {
            background-color: ${darkenColor(ctaData.btnColor, 0.2)};
            cursor: pointer;
        }
        .lead-rabbit-cta-explanation {
            font-family: ${ctaData.font};
            font-size: 0.750rem;
            margin: 0;
        }
        .lead-rabbit-cta-error {
            font-family: ${ctaData.font};
            font-size: 0.750rem;
            margin: 0;
            color: red;
        }
    `;

	const style = document.createElement("style");
	style.innerText = styleStr;
	document.head.appendChild(style);

	const link = document.createElement("link");
	link.href = `https://fonts.googleapis.com/css2?family=${ctaData.font.replace(/ /g, "+")}`;
	link.rel = "stylesheet";
	document.head.appendChild(link);

	const inputField = document.createElement("input");
	const button = document.createElement("button");
	const btnInputContainer = document.createElement("div");
	const expanation = document.createElement("p");
	const errorMsg = document.createElement("b");

	btnInputContainer.style.display = "flex";
	btnInputContainer.style.gap = "0.25rem";

	btnInputContainer.appendChild(inputField);
	btnInputContainer.appendChild(button);

	button.className = "lead-rabbit-cta-elements lead-rabbit-cta-button";
	inputField.className = "lead-rabbit-cta-elements lead-rabbit-cta-input";
	inputField.type = "email";
	expanation.className = "lead-rabbit-cta-explanation";
	errorMsg.className = "lead-rabbit-cta-error";

	inputField.placeholder = "jane@doe.com";
	button.innerText = ctaData.btnText;
	expanation.innerText = ctaData.explanation;
	errorMsg.innerText = "_";
	errorMsg.style.opacity = "0";

	switch (ctaData.btnSize) {
		case "small":
			button.style.height = "2rem";
			button.style.maxHeight = "2rem";
			button.style.paddingRight = "0.5rem";
			button.style.paddingLeft = "0.5rem";
			button.style.fontSize = "0.875rem";
			inputField.style.height = "2rem";
			inputField.style.maxHeight = "2rem";
			inputField.style.paddingRight = "0.5rem";
			inputField.style.paddingLeft = "0.5rem";
			inputField.style.fontSize = "0.875rem";
			break;
		case "medium":
			button.style.height = "2.5rem";
			button.style.maxHeight = "2.5rem";
			button.style.paddingRight = "1rem";
			button.style.paddingLeft = "1rem";
			button.style.fontSize = "1rem";
			inputField.style.height = "2.5rem";
			inputField.style.maxHeight = "2.5rem";
			inputField.style.paddingRight = "1rem";
			inputField.style.paddingLeft = "1rem";
			inputField.style.fontSize = "1rem";
			break;
		case "large":
			button.style.height = "4rem";
			button.style.maxHeight = "4rem";
			button.style.paddingRight = "1.5rem";
			button.style.paddingLeft = "1.5rem";
			button.style.fontSize = "1.125rem";
			inputField.style.height = "4rem";
			inputField.style.maxHeight = "4rem";
			inputField.style.paddingRight = "1.5rem";
			inputField.style.paddingLeft = "1.5rem";
			inputField.style.fontSize = "1.125rem";
			break;
	}

	button.onclick = buttonClickHandler;

	for (const div of lrCtaDivs) {
		if (ctaData.alignment === "column") {
			div.style.flexDirection = "column";
		}
		div.appendChild(errorMsg);
		div.appendChild(btnInputContainer);
		div.appendChild(expanation);
	}
}

fetch(`https://www.lead-rabbit.com/api/cta/${ctaId}`)
	.then((res) => res.json())
	.then((data) => createCtaButton(data))
	.catch(console.error);
