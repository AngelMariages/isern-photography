import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head';
import { Flipped, Flipper } from 'react-flip-toolkit';

export default function MyApp({ Component, pageProps, router }: AppProps) {
  const canonicalUrl = (`https://test.isern-photography.com/${router.asPath}`).split("?")[0].split('#')[0];

  return (
    <>
      <Head>
        <link rel='canonical' href={canonicalUrl} />

      </Head>
      <Flipper flipKey={router.asPath}>
        <Flipped flipId='square'>
          <Component {...pageProps} />
        </Flipped>
      </Flipper>
    </>
  );
}
