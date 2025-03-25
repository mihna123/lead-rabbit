"use client";

import Link from "next/link";
import LeadRabbitLogo from "@/components/lead-rabbit-logo";
import { NotificationsIcon } from "@/components/icons";
import ProfileButton from "@/components/buttons/profile-button";
import FeedbackForm from "@/components/forms/feedback-form";
import { useState } from "react";

export default function Header({ session }) {
	const [formShow, setFormShow] = useState(false);
	return (
		<div>
			<div className="flex justify-between p-3 border-b">
				<Link href="/dashboard">
					<LeadRabbitLogo />
				</Link>
				<div className="flex items-center gap-6">
					<Link href="/leads">My Leads</Link>
					<button
						className="cursor-pointer"
						type="button"
						onClick={() => setFormShow(true)}
					>
						Feedback
					</button>
					<NotificationsIcon />
					<ProfileButton session={session} />
				</div>
			</div>
			<FeedbackForm
				show={formShow}
				setShow={setFormShow}
				email={session?.user?.email}
			/>
		</div>
	);
}
