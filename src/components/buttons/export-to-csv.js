"use client";

import { useState } from "react";

/**
 * @param {Object} props
 * @param {String[]} props.leads
 * */
export default function ExportToCSVButton({ leads }) {
	const [exporting, setExporting] = useState(false);

	const handleButtonClick = () => {
		setExporting(true);
		const leadsStr = leads.reduce((prev, curr) => `${prev}\n${curr}`);

		const csvBlob = new Blob([leadsStr], { type: "text/csv" });
		const csvUrl = URL.createObjectURL(csvBlob);

		const a = document.createElement("a");
		a.href = csvUrl;
		a.download = "lead-rabbit-my-leads";
		a.click();

		setTimeout(() => {
			setExporting(false);
			a.remove();
			URL.revokeObjectURL(csvUrl);
		}, 1000);
	};

	return (
		<button
			className="border rounded w-40 h-12 bg-green-600 hover:bg-green-800 cursor-pointer"
			type="button"
			onClick={handleButtonClick}
			disabled={exporting}
		>
			{exporting ? "Exporting..." : "Export to CSV"}
		</button>
	);
}
