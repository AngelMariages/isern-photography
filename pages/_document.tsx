import { Head, Html, Main, NextScript } from 'next/document'

export default function Document() {

	return (
		<Html lang='es' className='scroll-smooth'>
			<Head>
				<meta name='description' content='Fotógrafo profesional de moda y producto. Basado en Barcelona.' />
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
