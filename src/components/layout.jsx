import React from 'react';
import Nav from './navbar';
import Footer from './footer';
import { createTheme, NextUIProvider } from '@nextui-org/react';
import { SessionProvider } from 'next-auth/react';
import { CartProvider } from 'react-use-cart';

const theme = createTheme({
  type: 'dark', // it could be "light" or "dark"
  theme: {
    colors: {
      primary: '#f1f1f1',
      secondary: '#499dab',
      error: '#ec1515',
    },
    fonts: {
      sans: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif, Manrope;",
      mono: "Menlo, Monaco, 'Lucida Console', 'Liberation Mono', 'DejaVu Sans Mono', 'Bitstream Vera Sans Mono'",
      manrope: 'Manrope',
    },
    breakpoints: {
      xxs: '360px',
    },
  },
});

export default function Layout({ children, session }) {
  return (
    <>
      <NextUIProvider theme={theme}>
        <SessionProvider session={session}>
          <CartProvider>
            <Nav />
            <main>{children}</main>
            <Footer />
          </CartProvider>
        </SessionProvider>
      </NextUIProvider>
    </>
  );
}
