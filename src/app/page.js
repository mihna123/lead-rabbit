import LandingHeader from "@/components/headers/landing-header";
import { ArrowIcon, BrushIcon, CodeIcon, CoolIcon } from "@/components/icons";
import CreatorAvatar from "@/components/landing-page/creator-avatar";
import Faq from "@/components/landing-page/faq";
import PricingCards from "@/components/landing-page/pricing-card";
import StarRating from "@/components/landing-page/star-rating";
import StepCard from "@/components/landing-page/step-card";
import UsersAvatars from "@/components/landing-page/users-avatars";
import LeadRabbitLogo from "@/components/lead-rabbit-logo";
import Link from "next/link";

export default async function Home() {
	return (
		<div className="flex flex-col items-center text-center">
			<LandingHeader />
			<CreatorAvatar className="mt-32 mb-10" />
			<h1 className="text-7xl font-black">
				More leads,{" "}
				<span className="whitespace-nowrap">
					zero{" "}
					<span>
						hassle
						<span className="absolute -translate-x-96 translate-y-10 rotate-1 w-96 h-5 bg-white/10" />
					</span>
				</span>
			</h1>
			<p className="mt-4 mb-10">
				Stop losing potential customers with clunky forms. Design a{" "}
				<b>custom call-to-action</b>
				<br /> and start collecting leads instantly - no coding, no headaches.
			</p>
			<Link href="#" className="btn btn-accent text-secondary-content mb-10">
				Sign up for free!
			</Link>
			<UsersAvatars />
			<p className="mb-20">
				Join <b>17 enterpreneurs</b> that love LeadRabbit
			</p>
			<p id="how-it-works" className="text-primary/85 mb-4 scroll-mt-20">
				How it works?
			</p>
			<h1 className="font-black text-5xl mb-10">
				Setup your CTA in 3 easy steps
			</h1>
			<div className="flex flex-col md:flex-row items-center gap-5 md:gap-1 lg:gap-5 mb-30">
				<StepCard
					title="Design your CTA"
					body="Use our editor to input your desired values"
					number={1}
				>
					{" "}
					<BrushIcon />
				</StepCard>
				<ArrowIcon className="rotate-90 md:rotate-0" />
				<StepCard
					title="Embed anywhere"
					body="Add the code snippet to your website"
					number={2}
				>
					<CodeIcon />
				</StepCard>
				<ArrowIcon className="rotate-90 md:rotate-0" />
				<StepCard
					title="Watch leads roll in"
					body="instantly see submissions on your dashboard"
					number={3}
				>
					<CoolIcon />
				</StepCard>
			</div>
			<StarRating
				className="w-10/12 md:w-8/12 lg:w-5/12"
				img="/mihailo_cool.jpg"
				title="creator of LeadRabbit"
				name="Mihailo V."
			>
				<p>
					LeadRabbit cut my lead-capture setup time from hours to minutes. Now,
					I{" "}
					<span className="bg-accent/45 p-1 whitespace-nowrap">
						track everything in one place!
					</span>
				</p>
			</StarRating>
			<p id="pricing" className="text-primary/85 mb-4 mt-20 scroll-mt-20">
				Pricing
			</p>
			<h1 className="font-black text-5xl mb-10">Buy it once, use it forewer</h1>
			<PricingCards className="mb-20" />
			<UsersAvatars />
			<p className="mb-4">
				Join <b>17 enterpreneurs</b> that love LeadRabbit
			</p>
			<StarRating title="Reviewer from Trustpilot" name="BliNK">
				<p>
					It gets the job{" "}
					<span className="bg-accent/45 p-1 whitespace-nowrap">done fast.</span>
				</p>
			</StarRating>

			<h1 id="faq" className="font-black text-5xl mt-20 mb-10 scroll-mt-28">
				Frequently Asked Questions
			</h1>
			<Faq />
			<h1 className="font-black text-5xl mt-20 mb-4">
				Stop missing out on leads.
			</h1>
			<p className="text-lg mb-4">Your perfect CTA is one click away!</p>
			<Link
				href="#"
				className="btn btn-accent text-xl text-secondary-content mb-10"
			>
				Create your free CTA now!
			</Link>
			<footer className="footer sm:footer-horizontal footer-center bg-base-300 text-base-content p-4">
				<aside>
					<LeadRabbitLogo />
					<p>Copyright © {new Date().getFullYear()} - All right reserved.</p>
				</aside>
			</footer>
		</div>
	);
}
