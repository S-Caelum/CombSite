import "../styles/globals.css";
import { createTheme, NextUIProvider } from "@nextui-org/react";
import { SessionProvider } from "next-auth/react";
import { CartProvider } from "react-use-cart";
import Layout from "../components/layout";

const theme = createTheme({
  type: "dark", // it could be "light" or "dark"
  theme: {
    colors: {
      primary: "#f1f1f1",
      secondary: "#499dab",
      error: "#ec1515",
    },
    fonts: {
      sans: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif, Manrope;",
      mono: "Menlo, Monaco, 'Lucida Console', 'Liberation Mono', 'DejaVu Sans Mono', 'Bitstream Vera Sans Mono'",
      manrope: "Manrope",
    },
    breakpoints: {
      xxs: "360px",
    },
  },
});

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <CartProvider>
        <NextUIProvider theme={theme}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </NextUIProvider>
      </CartProvider>
    </SessionProvider>
  );
}
