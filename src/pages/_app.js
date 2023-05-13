import '../styles/globals.css';

import Layout from '../components/layout';

export default function App({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <Layout session={session}>
      <Component {...pageProps} />
    </Layout>
  );
}
