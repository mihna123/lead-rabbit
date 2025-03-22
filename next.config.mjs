/** @type {import('next').NextConfig} */
const nextConfig = {
	authJs: {
		cookies: {
			csrfToken: {
				name: "__Host-authjs.csrf-token",
				options: {
					sameSite: "None", // Add this
					secure: true,
				},
			},
		},
	},
};

export default nextConfig;
