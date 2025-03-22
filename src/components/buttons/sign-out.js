"use client";

import { signOut } from "next-auth/react";
import { useState } from "react";

export default function SignOutButton() {
	const [isPending, setIsPending] = useState(false);

	const handleButtonClick = () => {
		setIsPending(true);
		signOut();
	};
	return (
		<button
			className="cursor-pointer w-fit"
			type="button"
			onClick={handleButtonClick}
			disabled={isPending}
		>
			{isPending ? "Signing Out..." : "Sign Out"}
		</button>
	);
}
