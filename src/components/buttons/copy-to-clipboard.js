"use client";

import { useState } from "react";

export default function CopyToClipboardButton({ text }) {
	const [copied, setCopied] = useState(false);

	const onBtnPress = () => {
		navigator.clipboard.writeText(text);
		setCopied(true);
		setTimeout(() => {
			setCopied(false);
		}, 3000);
	};

	return (
		<button
			onClick={onBtnPress}
			className="border rounded w-40 h-12 bg-green-600 hover:bg-green-800"
			type="button"
		>
			{copied ? "Copied!" : "Copy to clipboard"}
		</button>
	);
}
