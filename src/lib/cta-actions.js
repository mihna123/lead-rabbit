"use server";

export async function submitCTA(prevState, formData) {
	try {
		const res = await fetch("http:localhost:3000/api/cta/", {
			method: "POST",
			headers: {
				Authorization: `Bearer ${process.env.BIG_API_SECRET}`,
			},
			body: JSON.stringify({
				userEmail: formData.get("user-email"),
				domain: formData.get("domain"),
				btnText: formData.get("btn-text"),
				btnColor: formData.get("btn-color"),
				btnSize: formData.get("btn-size"),
				font: formData.get("font"),
				alignment: formData.get("alignment"),
				explanation: formData.get("explanation"),
			}),
		});
		if (res.status !== 200) {
			return { error: "There has been an error with the request!" };
		}

		return { success: "The CTA has been saved successfuly!" };
	} catch (err) {
		return { error: "There has been an error!" };
	}
}
