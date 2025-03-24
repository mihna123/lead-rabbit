import "./globals.css";
import { grandstander } from "@/fonts";

export const metadata = {
	title: "LeadRabbit",
	description: "Automate waitinglist and lead creation",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body className={`antialiased ${grandstander.className}`}>
				{children}
			</body>
		</html>
	);
}
