import { TrustpilotWidget } from "@/components/trustpilot-widget";
import "./globals.css";
import { grandstander } from "@/fonts";
import Script from "next/script";

export const metadata = {
	title: "LeadRabbit",
	description: "Automate waitinglist and lead creation",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<Script
				strategy="lazyOnload"
				type="text/javascript"
				src="//widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js"
				async
			/>

			<body className={`antialiased ${grandstander.className}`}>
				{children}
				<TrustpilotWidget />
			</body>
		</html>
	);
}
