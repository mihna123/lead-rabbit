"use client";

import LeadRabbitLogo from "@/components/lead-rabbit-logo";
import { useEffect, useState, useActionState, useRef } from "react";
import { signupForm } from "@/lib/form-actions";

export default function SignupForm() {
	// TODO: do the api and signupForm
	const [formState, formAction, isPending] = useActionState(signupForm, null);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [rpassword, setRpassword] = useState("");

	return (
		<fieldset className="fieldset w-xs bg-base-200 border border-base-300 p-4 rounded-box mt-20">
			<legend className="fieldset-legend">
				Signup to <LeadRabbitLogo className="mb-1.5" />
			</legend>
			<form>
				<label htmlFor="email" className="fieldset-label">
					Email
				</label>
				<input
					type="email"
					name="email"
					className="input validator"
					placeholder="Email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					required
				/>
				<div class="validator-hint">Enter valid email address</div>

				<label htmlFor="password" className="fieldset-label">
					Password
				</label>
				<input
					type="password"
					name="password"
					className="input validator"
					placeholder="Password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					required
					minLength="8"
				/>
				<div class="validator-hint">
					Password must be at least 8 characters long
				</div>
				<label htmlFor="password" className="fieldset-label">
					Repeat password
				</label>
				<input
					type="password"
					name="rpassword"
					className="input validator"
					placeholder="Repeat password"
					value={rpassword}
					onChange={(e) => setRpassword(e.target.value)}
					required
					minLength="8"
				/>
				<button
					type="submit"
					className="btn btn-accent text-base-content mt-4 w-full"
				>
					Login
				</button>
			</form>
		</fieldset>
	);
}
