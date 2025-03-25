import Image from "next/image";

export default function StarRating({ name, title, img, className, children }) {
	return (
		<div className={`flex flex-col items-center gap-4 mb-10 ${className}`}>
			<div className="rating rating-sm">
				<input
					type="radio"
					readOnly
					name={`rating-${name}`}
					className="mask mask-star-2 bg-orange-400 hover:scale-105 transition-transform"
					aria-label="1 star"
				/>
				<input
					type="radio"
					readOnly
					name={`rating-${name}`}
					className="mask mask-star-2 bg-orange-400 hover:scale-105 transition-transform"
					aria-label="2 star"
				/>
				<input
					readOnly
					type="radio"
					name={`rating-${name}`}
					className="mask mask-star-2 bg-orange-400 hover:scale-105 transition-transform"
					aria-label="3 star"
				/>
				<input
					readOnly
					type="radio"
					name={`rating-${name}`}
					className="mask mask-star-2 bg-orange-400 hover:scale-105 transition-transform"
					aria-label="4 star"
				/>
				<input
					readOnly
					type="radio"
					name={`rating-${name}`}
					className="mask mask-star-2 bg-orange-400 hover:scale-105 transition-transform"
					aria-label="5 star"
					checked
				/>
			</div>
			<div>{children}</div>
			<div className="flex gap-2">
				<div className="avatar">
					<div className="w-10 h-10 rounded-full">
						{img ? (
							<Image
								src={img}
								width="100"
								height="100"
								alt={`image of ${name}`}
							/>
						) : (
							<div className="font-bold text-lg bg-base-200 w-full h-full flex items-center justify-center">
								{name[0]}
							</div>
						)}
					</div>
				</div>
				<div className="text-left text-sm">
					<p>{name}</p>
					<p>{title}</p>
				</div>
			</div>
		</div>
	);
}
