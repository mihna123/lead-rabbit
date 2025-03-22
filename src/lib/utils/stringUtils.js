/**
 * @param {String} text
 * */
export function firstLetterUppercase(text) {
	return text[0].toUpperCase() + text.slice(1, undefined);
}

/**
 * @param {String} str
 * */
export function tryParseJson(str) {
	try {
		const o = JSON.parse(str);

		if (o && typeof o === "object") {
			return o;
		}
	} catch {}
}
