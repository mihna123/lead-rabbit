"use client";

import { useEffect, useState } from "react";

/**
 * @typedef {Object} GoogleFont
 * @property {String} family
 * @property {String[]} variants
 * @property {Object} files
 * */

export default function FontsDropdown({ name, setPickedFont }) {
	/** @type {[GoogleFont[], Function]} */
	const [fonts, setFonts] = useState([]);

	useEffect(() => {
		fetch("/api/fonts")
			.then((res) => res.json())
			.then((data) => setFonts(data.items))
			.catch(console.error);
	}, []);

	return (
		<select
			name={name}
			onChange={(e) => setPickedFont(e.target.value)}
			className="border rounded py-3 px-2 w-72 mb-4"
		>
			{fonts.length > 0 ? (
				fonts.map((f, index) => {
					return (
						<option key={`font-${index}`} value={f.family}>
							{f.family}
						</option>
					);
				})
			) : (
				<option>Loading...</option>
			)}
		</select>
	);
}
