import Header from "@/components/header";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import ExportToCSVButton from "@/components/buttons/export-to-csv";

export default async function LeadsPage() {
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
		redirect("/edit?new=true");
	}

	const { leads } = userCta;

	return (
		<div>
			<Header session={session} />
			<div className="flex justify-center">
				<div className="border rounded w-1/2 mt-10 p-4">
					<div className="flex justify-between items-center mb-4">
						<h1 className="text-3xl">My Leads</h1>
						<ExportToCSVButton leads={leads} />
					</div>
					{leads ? (
						leads.map((lead, index) => {
							return <p key={index}>{lead}</p>;
						})
					) : (
						<p>You have no leads yet!</p>
					)}
				</div>
			</div>
		</div>
	);
}
