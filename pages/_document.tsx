import { Head, Html, Main, NextScript } from 'next/document'

export default function Document() {

	return (
		<Html lang='es' className='scroll-smooth'>
			<Head>
				<link
					href="https://fonts.googleapis.com/css2?family=Rajdhani:wght@300;400;500&display=swap"
					rel="stylesheet"
				/>
				<meta name='description' content='Fotógrafo profesional de moda y producto. Basado en Barcelona.' />
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
