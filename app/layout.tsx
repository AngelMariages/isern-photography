import { Rajdhani } from "next/font/google";
import Header from "../components/Header";
import { getSectionOrder } from '../lib/api';
import "./globals.css";

const rajdhani = Rajdhani({
	subsets: ["latin"],
	weight: ["300", "400", "500"],
});

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const sectionOrder = getSectionOrder();

	return (
		<html
			lang="en"
			className={`${rajdhani.className} scroll-smooth min-h-screen`}
		>
			<body>
				<Header sectionOrder={sectionOrder} />
				{children}
			</body>
		</html>
	);
}
