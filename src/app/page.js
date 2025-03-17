import SignInButton from "@/components/buttons/sign-in";
import SignOutButton from "@/components/buttons/sign-out";
import { auth } from "../../auth";

export default async function Home() {
	const session = await auth();
	return (
		<div>
			Helloooo {session?.user?.email}{" "}
			{!session?.user ? <SignInButton /> : <SignOutButton />}
		</div>
	);
}
