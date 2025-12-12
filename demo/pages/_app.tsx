import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { GlobalProviders } from '../../src/contexts';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <GlobalProviders>
      <Component {...pageProps} />
    </GlobalProviders>
  );
}
