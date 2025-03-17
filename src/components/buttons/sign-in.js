"use client";

import { signIn } from "next-auth/react";

export default function SignInButton() {
	return (
		<button type="button" onClick={() => signIn()}>
			Sign in
		</button>
	);
}
