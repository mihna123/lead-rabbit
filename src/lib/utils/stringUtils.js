/**
 * @param {String} text
 * */
export function firstLetterUppercase(text) {
	return text[0].toUpperCase() + text.slice(1, undefined);
}
