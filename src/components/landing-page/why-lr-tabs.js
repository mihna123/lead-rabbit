export default function WhyLRTabs(props) {
	return (
		<div {...props}>
			<div className="tabs tabs-border">
				<input
					type="radio"
					name="my_tabs_2"
					className="tab text-lg"
					aria-label="Your brand, your rules"
				/>
				<div className="tab-content border-base-300 bg-base-100 p-10 rounded-xl">
					Tab content 1
				</div>

				<input
					type="radio"
					name="my_tabs_2"
					className="tab text-lg"
					aria-label="See leads in real time"
					defaultChecked
				/>
				<div className="tab-content border-base-300 bg-base-100 p-10">
					Tab content 2
				</div>

				<input
					type="radio"
					name="my_tabs_2"
					className="tab text-lg"
					aria-label="Embed in seconds"
				/>
				<div className="tab-content border-base-300 bg-base-100 p-10">
					Tab content 3
				</div>
			</div>
		</div>
	);
}
