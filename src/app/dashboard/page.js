import { auth } from "@/auth";
import Header from "@/components/header";
import AddFontHelper from "@/components/helpers/add-font-helper";
import CopyToClipbloadrButton from "@/components/buttons/copy-to-clipboard";
import { redirect } from "next/navigation";
import Link from "next/link";
import { grandstander, kodeMono } from "@/fonts";
import { firstLetterUppercase } from "@/lib/utils/stringUtils";

export default async function DashboardPage() {
	const session = await auth();
	if (!session?.user) {
		redirect("/");
	}

	const res = await fetch(
		`http:localhost:3000/api/cta?email=${session.user.email}`,
		{ headers: { Authorization: `Bearer ${process.env.BIG_API_SECRET}` } },
	);
	/** @type {import("../api/cta/route").CTAData} */
	const userCta = await res.json();
	if (!userCta) {
		redirect("/edit?new=true");
	}

	let btnDims = "h-10 px-2";
	let btnTextSize = "text-md";
	let inputHeight = "h-10";

	switch (userCta.btnSize) {
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
		<div>
			<AddFontHelper fontName={userCta.font} />
			<Header />
			<div className="flex justify-center">
				<div
					className={`mt-10 p-2 rounded border w-8/12 ${grandstander.className}`}
				>
					<h1 className="text-3xl">Your Call To Action</h1>
					<div className="flex my-4">
						<div className="w-4/12">
							<b>Website domain</b>
							<p className="ml-2 mb-2 text-sm">{userCta.domain}</p>
							<b>Button text</b>
							<p className="ml-2 mb-2 text-sm">{userCta.btnText}</p>
							<b>Button color</b>
							<div className="ml-2 mb-2 flex gap-2">
								<div
									style={{ backgroundColor: userCta.btnColor }}
									className="rounded-full w-4 h-4"
								/>
								<p className="text-sm">{userCta.btnColor}</p>
							</div>
							<b>Button size</b>
							<p className="ml-2 mb-2 text-sm">
								{firstLetterUppercase(userCta.btnSize)}
							</p>
							<b>Font</b>
							<p className="ml-2 mb-2 text-sm">{userCta.font}</p>
							<b>Alignment</b>
							<p className="ml-2 mb-2 text-sm">
								{firstLetterUppercase(userCta.alignment)}
							</p>
						</div>
						<div className="w-full flex flex-col items-center">
							<div className="h-full">
								<div id="preview" className="rounded border w-full p-8">
									<div
										className={`flex ${userCta.alignment === "column" ? "flex-col" : ""} items-center gap-1`}
									>
										<input
											className={`border rounded ${inputHeight} ${btnTextSize} px-2`}
											style={{ fontFamily: userCta.font }}
											type="email"
											placeholder="jane@doe.com"
										/>
										<button
											style={{
												fontFamily: userCta.font,
												backgroundColor: userCta.btnColor,
											}}
											type="button"
											className={`${userCta.alignment === "column" ? "w-full" : ""}  border rounded ${btnDims} hover:opacity-80 ${btnTextSize}`}
										>
											{userCta.btnText}
										</button>
									</div>
									<span
										style={{ fontFamily: userCta.font }}
										className="text-xs"
									>
										{userCta.explanation}
									</span>
								</div>
								<b>Preview</b>
								<div className="flex flex-row-reverse w-full">
									<Link
										className="bg-blue-500 hover:bg-blue-700 rounded border px-4 py-2"
										href="/edit"
									>
										Edit
									</Link>
								</div>
							</div>
						</div>
					</div>
					<div className="mb-2">
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
					<CopyToClipbloadrButton
						text={
							"<!-- Add the following div tag wherewer you want your CTA to be -->\n" +
							`<div class="lead-rabbit-cta"></div>\n\n` +
							"<!-- Just before body tag add this line -->\n" +
							`<script async defer data-lead-rabbit-token="askdjfilkjcxn342ls09xcv-13" src="http://localhost:3000/static/cta-script.js"></script>`
						}
					/>
				</div>
			</div>
		</div>
	);
}
