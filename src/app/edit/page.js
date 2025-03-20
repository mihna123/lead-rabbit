"use server";

import Header from "@/components/header";
import EditCTAForm from "@/components/forms/edit-cta-form";
import { redirect } from "next/navigation";
import { auth } from "@/auth";

export default async function EditPage() {
	const session = await auth();
	if (!session?.user) {
		redirect("/");
	}

	return (
		<div>
			<Header />
			<div className="flex justify-center">
				<EditCTAForm session={session} />
			</div>
		</div>
	);
}
