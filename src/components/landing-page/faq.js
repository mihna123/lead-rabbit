export default function Faq() {
	return (
		<div className="md:max-w-7/12">
			<div className="collapse collapse-plus bg-base-200 mb-2">
				<input type="radio" name="my-accordion-3" defaultChecked />
				<div className="collapse-title font-semibold">
					Does it work with my website?
				</div>
				<div className="collapse-content text-sm">
					Yes! Just embed the code. Works on any platform.
				</div>
			</div>
			<div className="collapse collapse-plus bg-base-200 mb-2">
				<input type="radio" name="my-accordion-3" defaultChecked />
				<div className="collapse-title font-semibold">
					Can I edit the form after embedding?
				</div>
				<div className="collapse-content text-sm">
					Absolutely. Changes update live—no need to touch your site again.
				</div>
			</div>
			<div className="collapse collapse-plus bg-base-200 mb-2">
				<input type="radio" name="my-accordion-3" />
				<div className="collapse-title font-semibold">
					Is LeadRabbit really free?
				</div>
				<div className="collapse-content text-sm">
					Yes! The free tier is absolutelly free and will always stay free. We
					do recomend upgrading to Gold account for advanced use cases.
				</div>
			</div>
			<div className="collapse collapse-plus bg-base-200 mb-2">
				<input type="radio" name="my-accordion-3" />
				<div className="collapse-title font-semibold">
					Do I need to know how to code?
				</div>
				<div className="collapse-content text-sm">
					Not really. All you have to know is to copy and paste the embed code
					and voila!
				</div>
			</div>
		</div>
	);
}
