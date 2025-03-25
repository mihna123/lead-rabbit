import { CheckIcon } from "../icons";
import Link from "next/link";

export default function PricingCards({ className }) {
	return (
		<div className={`flex flex-col-reverse md:flex-row gap-20 ${className}`}>
			<div className="card w-96 md:w-80 lg:w-96 bg-base-200 shadow-base-300 shadow-md hover:scale-110 transition-transform">
				<div className="card-body">
					<h2 className="text-3xl font-bold text-left">Free</h2>
					<h2 className="text-6xl font-bold text-left">
						$0
						<span className="text-xl font-normal text-base-content/60">
							USD
						</span>
					</h2>

					<ul className="mt-6 flex flex-col items-start text-lg gap-4">
						<li>
							<CheckIcon />
							<span>Up to 10.000 leads</span>
						</li>
						<li>
							<CheckIcon />
							<span>One call-to-action</span>
						</li>
						<li>
							<CheckIcon />
							<span>Export to CSV</span>
						</li>
						<li>
							<CheckIcon />
							<span>Standard support</span>
						</li>
						<li className="opacity-50">
							<CheckIcon />
							<span className="line-through">Lifetime updates</span>
						</li>
					</ul>
					<div className="mt-6">
						<button
							type="button"
							className="btn btn-accent text-base-content text-lg btn-block"
						>
							Sign up for free!
						</button>
					</div>
				</div>
			</div>
			<div className="card w-96 md:w-80 lg:w-96 bg-base-200 shadow-base-300 shadow-md hover:scale-110 transition-transform">
				<div className="card-body">
					<h2 className="text-3xl text-primary font-bold text-left">Gold</h2>
					<h2 className="text-6xl font-bold text-primary text-left">
						<span className="text-2xl font-normal text-primary/60 line-through">
							$79
						</span>
						$49
						<span className="text-xl font-normal text-primary/60">USD</span>
					</h2>

					<ul className="mt-6 flex flex-col items-start text-lg gap-4">
						<li>
							<CheckIcon />
							<span>Up to 10.000.000 leads</span>
						</li>
						<li>
							<CheckIcon />
							<span>100 call-to-actions</span>
						</li>
						<li>
							<CheckIcon />
							<span>Export to CSV</span>
						</li>
						<li>
							<CheckIcon />
							<span>Priority support</span>
						</li>
						<li>
							<CheckIcon />
							<span>Lifetime updates</span>
						</li>
					</ul>
					<div className="mt-6">
						<Link
							href="https://lead-rabbit.lemonsqueezy.com/buy/cbbf0818-f357-4874-871d-2f32c45db409"
							className="btn btn-primary text-base-content text-lg btn-block"
						>
							Get a lifetime deal!
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}
