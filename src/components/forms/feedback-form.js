"use client";

import { submitFeedbackForm } from "@/lib/form-actions";
import { useActionState, useEffect, useRef } from "react";
import { showMessage } from "@/lib/utils/renderUtils";

export default function FeedbackForm({ show, setShow }) {
	const [formState, formAction, isPending] = useActionState(
		submitFeedbackForm,
		null,
	);
	const formRef = useRef(null);

	useEffect(() => {
		if (formState?.success) {
			setShow(false);
			showMessage(formState.success);
		} else if (formState?.error) {
			setShow(false);
			showMessage(formState.error);
		}
	}, [formState]);

	return (
		<div>
			{show && (
				<div
					onClick={() => setShow(false)}
					onKeyUp={() => setShow(false)}
					className="absolute left-0 top-0 w-screen h-screen bg-gray-950/60 flex justify-center"
				>
					<div
						onClick={(e) => e.stopPropagation()}
						onKeyUp={(e) => e.stopPropagation()}
						className="border rounded h-fit mt-20 p-4 bg-[var(--background)]"
					>
						<h1 className="text-xl mb-2">Let us know what you think!</h1>
						<form ref={formRef} action={formAction} className="flex flex-col">
							<label htmlFor="email">Your email</label>
							<input
								className="border rounded px-2 mb-2"
								type="email"
								name="email"
								required
							/>
							<label htmlFor="feedback">Your feedback</label>
							<textarea
								className="border rounded px-2 mb-4"
								rows="5"
								name="feedback"
								required
							/>
							<button
								type="submit"
								className="border rounded bg-green-600 hover:bg-green-800 cursor-pointer py-2"
								disabled={isPending}
							>
								{isPending ? "Submiting..." : "Submit"}
							</button>
						</form>
					</div>
				</div>
			)}
		</div>
	);
}
