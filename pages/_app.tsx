import "../app/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { Rajdhani } from "next/font/google";

const rajdhani = Rajdhani({
	subsets: ["latin"],
	weight: ["300", "400", "500"],
});

export default function MyApp({ Component, pageProps, router }: AppProps) {
	const canonicalUrl = `https://test.isern-photography.com/${router.asPath}`
		.split("?")[0]
		.split("#")[0];

	return (
		<>
			<Head>
				<link rel="canonical" href={canonicalUrl} />
			</Head>
			<main className={`${rajdhani.className}`}>
				<Component {...pageProps} />
			</main>
		</>
	);
}
