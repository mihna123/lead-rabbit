"use client";
import { useEffect } from "react";

export default function AddFontHelper({ fontName }) {
	useEffect(() => {
		const link = document.createElement("link");
		link.href = `https://fonts.googleapis.com/css2?family=${fontName.replace(/ /g, "+")}`;
		link.rel = "stylesheet";
		document.head.appendChild(link);

		return () => {
			document.head.removeChild(link);
		};
	}, [fontName]);

	return <></>;
}
