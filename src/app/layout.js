import "./globals.css";
import { grandstander } from "@/fonts";

export const metadata = {
	title: "LeadRabbit",
	description: "Automate waitinglist and lead creation",
	icons: {
		icon: "/favicon.svg",
	},
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body className={`scroll-smooth antialiased ${grandstander.className}`}>
				{children}
			</body>
		</html>
	);
}
