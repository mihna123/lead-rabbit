export default function StepCard({ title, body, number, children }) {
	return (
		<div className="indicator">
			<span className="indicator-item indicator-start badge badge-accent w-8 h-8 rounded-full text-lg text-secondary-content">
				{number}
			</span>
			<div className="card-body bg-base-200 rounded-2xl border-10 shadow-base-200 shadow-lg border-base-content/35 hover:scale-110 transition-transform">
				<div className="flex justify-center items-center">{children}</div>
				<div className="flex flex-col items-center gap-3 w-60 h-20">
					<h2 className="card-title">{title}</h2>
					<p>{body}</p>
				</div>
			</div>
		</div>
	);
}
