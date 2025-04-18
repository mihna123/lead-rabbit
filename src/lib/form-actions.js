"use server";

export async function submitFeedbackForm(prevState, formData) {
	try {
		const res = await fetch(`${process.env.URL_BASE}/api/feedback`, {
			method: "POST",
			headers: {
				Authorization: `Bearer ${process.env.BIG_API_SECRET}`,
			},
			body: JSON.stringify({
				email: formData.get("email"),
				feedback: formData.get("feedback"),
			}),
		});
		if (res.status !== 200) {
			const text = await res.text();
			return { error: `There has been an error with the request: ${text}` };
		}

		return { success: "Your feedback has been sent!" };
	} catch (err) {
		return {
			error: `There has been an internal server error:\n${err.message}`,
		};
	}
}

export async function signupForm(prevState, formData) {
	//call api
}
