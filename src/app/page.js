import SignInButton from "@/components/buttons/sign-in";
import SignOutButton from "@/components/buttons/sign-out";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import LeadRabbitLogo from "@/components/lead-rabbit-logo";

export default async function Home() {
	const session = await auth();
	if (session?.user) {
		redirect("/dashboard");
	}
	return (
		<div>
			<LeadRabbitLogo />
			Helloooo {session?.user?.name?.split(" ")[0]}{" "}
			{!session?.user ? <SignInButton /> : <SignOutButton />}
		</div>
	);
}
