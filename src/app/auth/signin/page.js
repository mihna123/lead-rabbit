import { redirect } from "next/navigation";
import Link from "next/link";
import { signIn, auth } from "@/auth";
import { AuthError } from "next-auth";
import { GithubLogoIcon, GoogleLogoIcon } from "@/components/icons";
import LeadRabbitLogo from "@/components/lead-rabbit-logo";

export default async function SigninPage() {
	const session = await auth();
	if (session?.user) {
		redirect("/dashboard");
	}
	return (
		<div className="flex flex-col items-center">
			<fieldset className="fieldset w-xs bg-base-200 border border-base-300 p-4 rounded-box mt-20">
				<legend className="fieldset-legend">
					Welcome to <LeadRabbitLogo className="mb-1.5" />
				</legend>
				<form
					action={async () => {
						"use server";
						await signIn("google", {
							redirectTo: "/dashboard",
						});
					}}
				>
					<button type="submit" className="btn btn-info w-full mb-4">
						<span>Sign up with Google</span>{" "}
						<GoogleLogoIcon className="mb-1.5" />
					</button>
				</form>
				<form
					action={async () => {
						"use server";
						await signIn("github", {
							redirectTo: "/dashboard",
						});
					}}
				>
					<button type="submit" className="btn btn-info w-full mb-4">
						<span>Sign up with Github</span>{" "}
						<GithubLogoIcon className="mb-1.5" />
					</button>
				</form>
				<div className="divider">OR</div>
				<form
					action={async (formData) => {
						"use server";
						try {
							await signIn("credentials", formData);
						} catch (err) {
							if (err instanceof AuthError) {
								return redirect(`/auth/error?error=${err.type}`);
							}
						}
					}}
				>
					<label htmlFor="email" className="fieldset-label">
						Email
					</label>
					<input
						type="email"
						name="email"
						className="input validator"
						placeholder="Email"
						required
					/>

					<label htmlFor="password" className="fieldset-label mt-4">
						Password
					</label>
					<input
						type="password"
						name="password"
						className="input validator"
						placeholder="Password"
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
			<p className="mt-4">
				Don't have an account yet?{" "}
				<Link className="text-info hover:underline" href="/auth/signup">
					Signup
				</Link>
			</p>
		</div>
	);
}
