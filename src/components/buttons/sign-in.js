"use client";

import { signIn } from "next-auth/react";

export default function SignInButton() {
	return (
		<button
			type="button"
			className="btn btn-accent text-base-content"
			onClick={() => signIn()}
		>
			Sign up
		</button>
	);
}
