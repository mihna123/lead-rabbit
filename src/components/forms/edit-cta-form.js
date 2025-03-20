"use client";

import { grandstander } from "@/fonts";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState, useActionState } from "react";
import { submitCTA } from "@/lib/cta-actions";
import { showMessage } from "@/lib/utils";
import FontsDropdown from "@/components/inputs/fonts-dropdown";
import { LoadingIcon } from "@/components/icons";

export default function EditCTAForm({ session }) {
	const searchParams = useSearchParams();
	const isNew = searchParams.get("new");
	const router = useRouter();

	// Form fields
	const [btnText, setBtnText] = useState("Sign up");
	const [btnColor, setBtnColor] = useState("#0b80b7");
	const [btnSize, setBtnSize] = useState("small");
	const [pickedFont, setPickedFont] = useState("Roboto");
	const [alignment, setAlignment] = useState("row");
	const [explanation, setExplanation] = useState("");

	// Because the client rerouting is slow sometimes
	const [isLoading, setIsLoading] = useState(false);

	// For submiting
	const [formState, formAction, isPending] = useActionState(submitCTA, null);
	let link = null;

	// Loading the picked font
	useEffect(() => {
		if (link) {
			link.remove();
			link = null;
		}

		link = document.createElement("link");
		link.href = `https://fonts.googleapis.com/css2?family=${pickedFont.replace(/ /g, "+")}`;
		link.rel = "stylesheet";
		document.head.appendChild(link);

		return () => {
			document.head.removeChild(link);
		};
	}, [pickedFont]);

	// Showing message when form is sumbitted
	useEffect(() => {
		console.log(formState);
		if (formState?.success) {
			setIsLoading(true);
			showMessage(formState.success, () => {
				router.push("/dashboard");
			});
		} else if (formState?.error) {
			showMessage(formState.error);
		}
	}, [formState]);

	let btnDims = "h-10 px-2";
	let btnTextSize = "text-md";
	let inputHeight = "h-10";

	switch (btnSize) {
		case "small":
			btnDims = "h-8 px-2";
			inputHeight = "h-8";
			btnTextSize = "text-sm";
			break;
		case "medium":
			btnDims = "h-10 px-4";
			inputHeight = "h-10";
			btnTextSize = "text-md";
			break;
		case "large":
			btnDims = "h-14 px-6";
			inputHeight = "h-14";
			btnTextSize = "text-xl";
			break;
	}

	return (
		<div
			className={`mt-10 p-2 rounded border w-8/12 ${grandstander.className}`}
		>
			<h1 className="text-3xl mb-4">
				{isNew ? "Create your CTA" : "Edit your CTA"}
			</h1>
			<form action={formAction} className="flex w-fit">
				<div className="flex flex-col mr-4">
					<label htmlFor="domain">
						<b>Website domain</b>
					</label>
					<input
						className="border rounded py-3 px-2 w-72 mb-4"
						type="text"
						placeholder="www.lead-rabbit.com"
						name="domain"
					/>
					<label htmlFor="btn-text">
						<b>Button text</b>
					</label>
					<input
						className="border rounded py-3 px-2 w-72 mb-4"
						type="text"
						value={btnText}
						onChange={(e) => setBtnText(e.target.value)}
						required
						name="btn-text"
					/>
					<label htmlFor="btn-color">
						<b>Button color</b>
					</label>
					<div className="flex gap-1 items-center mb-4">
						<input
							className="rounded-full w-6 h-6"
							type="color"
							required
							name="btn-color"
							value={btnColor}
							onChange={(e) => setBtnColor(e.target.value)}
						/>
						<p>{btnColor}</p>
					</div>
					<label htmlFor="btn-size">
						<b>Button size</b>
					</label>
					<div className="flex flex-col w-72 mb-4">
						<div className="flex gap-1">
							<input
								onChange={(e) => setBtnSize(e.target.value)}
								type="radio"
								value="small"
								defaultChecked
								id="small-radio"
								name="btn-size"
							/>
							<label htmlFor="small-radio">Small</label>
						</div>
						<div className="flex gap-1">
							<input
								onChange={(e) => setBtnSize(e.target.value)}
								type="radio"
								value="medium"
								id="medium-radio"
								name="btn-size"
							/>
							<label htmlFor="medium-radio">Medium</label>
						</div>
						<div className="flex gap-1">
							<input
								onChange={(e) => setBtnSize(e.target.value)}
								type="radio"
								value="large"
								id="large-radio"
								name="btn-size"
							/>
							<label htmlFor="large-radio">Large</label>
						</div>
					</div>
					<label htmlFor="font">
						<b>Font</b>
					</label>
					<FontsDropdown name="font" setPickedFont={setPickedFont} />
				</div>
				<div className="flex flex-col">
					<label htmlFor="alignment">
						<b>Alignment</b>
					</label>
					<select
						className="border rounded py-3.5 px-2 w-72 mb-4"
						required
						name="alignment"
						onChange={(e) => setAlignment(e.target.value)}
					>
						<option value="row">Row</option>
						<option value="column">Column</option>
					</select>
					<label htmlFor="explanation">
						<b>Explanation</b>
					</label>
					<input
						className="border rounded py-3 px-2 w-72 mb-4"
						type="text"
						placeholder="This goes below the button"
						value={explanation}
						onChange={(e) => setExplanation(e.target.value)}
						name="explanation"
					/>
					<label htmlFor="preview">
						<b>Preview</b>
					</label>
					<div id="preview" className="rounded border w-fit p-8">
						<div
							className={`flex ${alignment === "column" ? "flex-col" : ""} items-center gap-1`}
						>
							<input
								className={`border rounded ${inputHeight} ${btnTextSize} px-2`}
								style={{ fontFamily: pickedFont }}
								type="email"
								placeholder="jane@doe.com"
							/>
							<button
								style={{ backgroundColor: btnColor, fontFamily: pickedFont }}
								type="button"
								className={`${alignment === "column" ? "w-full" : ""} border rounded ${btnDims} hover:opacity-80 ${btnTextSize}`}
							>
								{btnText}
							</button>
						</div>
						<span style={{ fontFamily: pickedFont }} className="text-xs">
							{explanation}
						</span>
					</div>
					<div className="flex flex-row-reverse">
						<button
							type="submit"
							className="flex justify-center items-center w-24 h-10 rounded border bg-blue-500 px-4 py-2 mt-4"
							disabled={isPending | isLoading}
						>
							{isPending | isLoading ? (
								<LoadingIcon className="animate-spin" />
							) : (
								"Save"
							)}
						</button>
					</div>
				</div>
				<input
					type="text"
					hidden
					name="user-email"
					value={session?.user?.email}
					readOnly
				/>
			</form>
		</div>
	);
}
