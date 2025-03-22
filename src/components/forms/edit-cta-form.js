"use client";

import { grandstander } from "@/fonts";
import { useRouter } from "next/navigation";
import { useEffect, useState, useActionState, useRef } from "react";
import { submitCTA } from "@/lib/cta-actions";
import { showMessage } from "@/lib/utils/renderUtils";
import FontsDropdown from "@/components/inputs/fonts-dropdown";
import { LoadingIcon } from "@/components/icons";
import { tryParseJson } from "@/lib/utils/stringUtils";

export default function EditCTAForm({ session, userCtaString }) {
	const router = useRouter();
	const formRef = useRef(null);

	/** @type {[import("../api/cta/route").CTAData, Funtion]} */
	const [userCta, setUserCta] = useState(tryParseJson(userCtaString));

	// Form fields
	const [domain, setDomain] = useState(userCta?.domain ?? "");
	const [btnText, setBtnText] = useState(userCta?.btnText ?? "Sign up");
	const [btnColor, setBtnColor] = useState(userCta?.btnColor ?? "#0b80b7");
	const [btnSize, setBtnSize] = useState(userCta?.btnSize ?? "small");
	const [pickedFont, setPickedFont] = useState(userCta?.font ?? "Roboto");
	const [alignment, setAlignment] = useState(userCta?.alignment ?? "row");
	const [explanation, setExplanation] = useState(userCta?.explanation ?? "");

	// Because the client rerouting is slow sometimes
	const [isLoading, setIsLoading] = useState(false);

	// For submiting
	const [formState, formAction, isPending] = useActionState(submitCTA, null);
	const buttonSubmitHandler = () => {
		formRef?.current?.requestSubmit();
	};

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
		<div className={`mt-10 p-2 rounded border mb-4  ${grandstander.className}`}>
			<h1 className="text-3xl mb-4">
				{!userCta ? "Create your CTA" : "Edit your CTA"}
			</h1>
			<form ref={formRef} action={formAction} className="flex flex-col w-full">
				<div className="flex">
					<div className="flex flex-col mr-4">
						<label htmlFor="domain">
							<b>Website domain</b>
						</label>
						<input
							className="border rounded py-3 px-2 w-72 mb-4"
							type="text"
							placeholder="www.lead-rabbit.com"
							name="domain"
							value={domain}
							onChange={(e) => setDomain(e.target.value)}
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
									checked={btnSize === "small"}
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
									checked={btnSize === "medium"}
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
									checked={btnSize === "large"}
									id="large-radio"
									name="btn-size"
								/>
								<label htmlFor="large-radio">Large</label>
							</div>
						</div>
					</div>
					<div className="flex flex-col">
						<label htmlFor="font">
							<b>Font</b>
						</label>
						<FontsDropdown
							name="font"
							initialFont={userCta?.font}
							setPickedFont={setPickedFont}
						/>
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
					</div>
					<input
						type="text"
						hidden
						name="user-email"
						value={session?.user?.email}
						readOnly
					/>
				</div>
				<label className="text-lg" htmlFor="preview">
					<b>Preview</b>
				</label>
				<div className="w-full h-44 flex flex-col justify-center items-center">
					<div
						id="preview"
						className="rounded border w-full h-full flex flex justify-center items-center"
					>
						<div>
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
					</div>
				</div>
			</form>
			<div className="flex flex-row-reverse">
				<button
					type="button"
					className="cursor-pointer flex justify-center items-center w-24 h-10 rounded border bg-blue-500 hover:bg-blue-700 px-4 py-2 mt-4"
					disabled={isPending | isLoading}
					onClick={buttonSubmitHandler}
				>
					{isPending | isLoading ? (
						<LoadingIcon className="animate-spin" />
					) : (
						"Save"
					)}
				</button>
			</div>
		</div>
	);
}
