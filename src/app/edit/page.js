"use server";

import Header from "@/components/header";
import EditCTAForm from "@/components/forms/edit-cta-form";
import { redirect } from "next/navigation";
import { auth } from "@/auth";

export default async function EditPage({ searchParams }) {
	const session = await auth();
	if (!session?.user) {
		redirect("/");
	}

	const res = await fetch(
		`${process.env.URL_BASE}/api/cta?email=${session.user.email}`,
		{ headers: { Authorization: `Bearer ${process.env.BIG_API_SECRET}` } },
	);

	/** @type {import("../api/cta/route").CTAData} */
	const userCta = await res.json();
	if (!userCta) {
		return (
			<div>
				<Header session={session} />
				<div className="flex justify-center">
					<EditCTAForm session={session} />
				</div>
			</div>
		);
	}

	return (
		<div>
			<Header session={session} />
			<div className="flex justify-center">
				<EditCTAForm
					session={session}
					userCtaString={JSON.stringify(userCta)}
				/>
			</div>
		</div>
	);
}
