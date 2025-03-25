import Image from "next/image";

export default function UsersAvatars() {
	return (
		<div className="avatar-group -space-x-6">
			<div className="avatar">
				<div className="w-10">
					<Image src="/miki.jpeg" alt="happy user 1" width="100" height="100" />
				</div>
			</div>
			<div className="avatar">
				<div className="w-10">
					<Image
						src="/stefan.jpg"
						alt="happy user 2"
						width="100"
						height="100"
					/>
				</div>
			</div>
			<div className="avatar">
				<div className="w-10">
					<Image src="/ana.jpg" alt="happy user 3" width="100" height="100" />
				</div>
			</div>
			<div className="avatar">
				<div className="w-10">
					<Image
						src="/mihailo_cool.jpg"
						alt="happy user 4"
						width="100"
						height="100"
					/>
				</div>
			</div>
			<div className="avatar">
				<div className="w-10">
					<Image src="/jovan.jpg" alt="happy user 4" width="100" height="100" />
				</div>
			</div>
		</div>
	);
}
