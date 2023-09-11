import { Rajdhani } from "next/font/google";
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
	return (
		<html lang="en" className={`${rajdhani.className} scroll-smooth min-h-screen`}>
			<body>{children}</body>
		</html>
	);
}
