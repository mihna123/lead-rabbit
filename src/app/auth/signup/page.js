import { redirect } from "next/navigation";
import Link from "next/link";
import { auth } from "@/auth";
import LeadRabbitLogo from "@/components/lead-rabbit-logo";
import SignupForm from "@/components/forms/signup-form";

export default async function SignupPage() {
	const session = await auth();
	if (session?.user) {
		redirect("/dashboard");
	}
	return (
		<div className="flex flex-col items-center">
			<SignupForm />
			<p className="mt-4">
				Already have an account?{" "}
				<Link className="text-info hover:underline" href="/auth/signin">
					Sign in
				</Link>
			</p>
		</div>
	);
}
