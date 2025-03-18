import { auth } from "@/auth";
import Header from "@/components/header";
import { redirect } from "next/navigation";
import { grandstander, kodeMono } from "@/fonts";

export default async function DashboardPage() {
	const session = await auth();
	if (!session?.user) {
		redirect("/");
	}

	return (
		<div>
			<Header />
			<div className="flex justify-center">
				<div
					className={`mt-10 p-2 rounded border w-8/12 ${grandstander.className}`}
				>
					<h1 className="text-3xl">Your Call To Action</h1>
					<div className="flex my-4">
						<div className="w-fit">
							<b>Website domain</b>
							<p className="ml-2 mb-2 text-sm">mihna123.github.io</p>
							<b>Button text</b>
							<p className="ml-2 mb-2 text-sm">Sign up</p>
							<b>Button color</b>
							<p className="ml-2 mb-2 text-sm">#1EB4B4</p>
							<b>Button size</b>
							<p className="ml-2 mb-2 text-sm">Large</p>
							<b>Font</b>
							<p className="ml-2 mb-2 text-sm">Instrument Sans</p>
						</div>
						<div className="w-full flex flex-col items-center">
							<div className="w-8/12 h-full">
								<div className="flex gap-1 justify-center items-center h-full border rounded">
									<input
										placeholder="janedoe@gmail.com"
										type="email"
										className="border rounded px-3 py-3"
									/>
									<button type="button" className="border rounded px-5 py-3">
										Sign up
									</button>
								</div>
								<b>Preview</b>
							</div>
						</div>
					</div>
					<div>
						<b>Embed code</b>
						<div
							className={`border rounded ${kodeMono.className} text-sm py-2 px-3`}
						>
							<p>
								{
									"<!-- Add the following div tag wherewer you want your CTA to be -->"
								}
							</p>
							<p>{'<div class="lead-rabbit-cta"></div>'}</p>
							<br />
							<p>{"<!-- Just before body tag add this line -->"}</p>
							<p>
								{
									'<script async defer data-lead-rabbit-token="askdjfilkjcxn342ls09xcv-13" src="http://localhost:3000/static/cta-script.js"></script>'
								}
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
