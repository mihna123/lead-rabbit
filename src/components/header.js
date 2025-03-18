"use client";

import Link from "next/link";
import LeadRabbitLogo from "./lead-rabbit-logo";
import { NotificationsIcon, ProfileIcon } from "./icons";

export default function Header() {
	return (
		<div className="flex justify-between p-3 border-b">
			<LeadRabbitLogo />
			<div className="flex items-center gap-6">
				<Link href="#">My Leads</Link>
				<Link href="#">Feedback</Link>
				<NotificationsIcon />
				<ProfileIcon />
			</div>
		</div>
	);
}
