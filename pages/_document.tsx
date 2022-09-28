import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
	render() {
		return (
			<Html>
				<Head title='Jordi Isern Photography'>
					<link
						href="https://fonts.googleapis.com/css2?family=Rajdhani:wght@300;400;500&display=swap"
						rel="stylesheet"
					/>
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		)
	}
}

export default MyDocument;
