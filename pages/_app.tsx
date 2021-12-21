import type { AppProps } from 'next/app';
import Head from 'next/head';
import Link from 'next/link';
import Footer from '../global/components/Footer/index';
import '../styles/globals.css';
import TopBar from '../global/components/Header/index';
import ThemeProvider from '../global/hooks/useTheme';
import { Provider as NFTProvider } from '../global/reducers/nftReducers';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <NFTProvider>
        <Head>
          <title>NFT Marketplace</title>
          <meta name="description" content="NFT Marketplace" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <TopBar />
        <Component {...pageProps} />
        <Footer />
      </NFTProvider>
    </ThemeProvider>
  );
}

export default MyApp;
