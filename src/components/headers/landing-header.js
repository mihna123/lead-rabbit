"use client";

import Link from "next/link";
import LeadRabbitLogo from "../lead-rabbit-logo";
import SignInButton from "../buttons/sign-in";

export default function LandingHeader() {
	const scrollToSection = (id) => {
		const element = document.querySelector(id);
		if (element) {
			element.scrollIntoView({
				behavior: "smooth",
				block: "start", // aligns to top
			});
		}
	};
	return (
		<div className="w-full p-4 flex justify-between items-center border-b sticky top-0 z-50 bg-base-100/50 backdrop-blur-sm">
			<LeadRabbitLogo />
			<div className="flex gap-10">
				<button
					type="button"
					className="cursor-pointer hover:underline"
					onClick={() => scrollToSection("#how-it-works")}
				>
					How it works?
				</button>
				<button
					type="button"
					className="cursor-pointer hover:underline"
					onClick={() => scrollToSection("#pricing")}
				>
					Pricing
				</button>
				<button
					type="button"
					className="cursor-pointer hover:underline mr-10"
					onClick={() => scrollToSection("#faq")}
				>
					FAQ
				</button>
			</div>{" "}
			<SignInButton />
		</div>
	);
}
