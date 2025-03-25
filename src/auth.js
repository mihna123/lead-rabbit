import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import * as userService from "@/lib/services/user.service";

const providers = [
	Google({
		profile: (profile) => {
			return { role: profile.role ?? "user", ...profile };
		},
	}),
	GitHub({
		profile: (profile) => {
			return { role: profile.role ?? "user", ...profile };
		},
	}),
	Credentials({
		credentials: {
			email: {},
			password: {},
		},
		authorize: async (credentials) => {
			const user = await userService.getUser(credentials.email);
			if (!user) {
				throw new Error("No account found.");
			}

			const res = await userService.checkPassword(
				credentials.password,
				user.password,
			);

			if (!res) {
				throw new Error("Invalid credentials.");
			}

			return user;
		},
	}),
];

export const { handlers, signIn, signOut, auth } = NextAuth({
	providers,
	callbacks: {
		jwt: async ({ token, user, trigger, profile }) => {
			if (trigger === "signIn") {
				// If user does not exist add to the database
				const dbUser = await userService.getUser(profile.email);
				if (!dbUser) {
					await userService.createUser({ ...profile });
				}
			}

			if (user) token.role = user.role;
			return token;
		},
		session: ({ session, token }) => {
			session.user.role = token.role;
			return session;
		},
	},
	pages: {
		signIn: "/auth/signin",
		error: "/auth/error",
	},
	cookies: {
		csrfToken: {
			name: "__Host-authjs.csrf-token",
			options: {
				sameSite: "none",
				secure: true,
			},
		},
	},
});
