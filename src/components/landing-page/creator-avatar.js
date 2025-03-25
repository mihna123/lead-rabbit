import Image from "next/image";

export default function CreatorAvatar({ className }) {
	return (
		<div className={`flex items-center gap-3 ${className}`}>
			<div className="avatar">
				<div className="ring-primary ring-offset-base-100 w-8 rounded-full ring ring-offset-2">
					<Image
						src="/miki.jpeg"
						alt="Image of the creator, Mihailo Vojinovic"
						width="100"
						height="100"
					/>
				</div>
			</div>
			<p>By Mihailo Vojinović</p>
		</div>
	);
}
