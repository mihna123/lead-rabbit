"use server";

import Header from "@/components/header";
import EditCTAForm from "@/components/forms/edit-cta-form";

export default async function EditPage() {
	return (
		<div>
			<Header />
			<div className="flex justify-center">
				<EditCTAForm />
			</div>
		</div>
	);
}
