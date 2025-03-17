import SignInButton from "@/components/buttons/sign-in";
import SignOutButton from "@/components/buttons/sign-out";
import { auth } from "@/auth";
import client from "@/lib/mongodb";

export default async function Home() {
	const session = await auth();
	const users = await client.db().collection("users").find().toArray();
	return (
		<div>
			Helloooo {session?.user?.name?.split(" ")[0]}{" "}
			{!session?.user ? <SignInButton /> : <SignOutButton />}
			<p>{JSON.stringify(users)}</p>
		</div>
	);
}
