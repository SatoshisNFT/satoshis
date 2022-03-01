import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { MantineProvider } from '@mantine/core';
import App from 'next/app';
import Head from 'next/head';
import { withPasswordProtect } from '@storyofams/next-password-protect';

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<>
			<Head>
				<meta charSet="UTF-8" />
				<meta httpEquiv="X-UA-Compatible" content="IE=edge" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />

				<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
				<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
				<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
				<link rel="manifest" href="/site.webmanifest" />

				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
				<link rel="preconnect" href="https://fonts.cdnfonts.com" />
				<link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap" rel="stylesheet" />
				<link href="https://fonts.cdnfonts.com/css/monument-extended" rel="stylesheet" />
			</Head>

			<MantineProvider>
				<Component {...pageProps} />
			</MantineProvider>
		</>
	);
}

export default Boolean(process?.env?.NEXT_PUBLIC_PASSWORD_PROTECT)
	? withPasswordProtect(MyApp, {
			loginComponentProps: {
				logo: '/assets/logo.png',
				buttonBackgroundColor: '#BF9270',
				buttonColor: '#FFFFFF',
			},
	  })
	: App;
