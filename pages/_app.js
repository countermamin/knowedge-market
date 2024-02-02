import { createGlobalStyle } from "styled-components";
import { CartContextProvider } from "@/components/CartContext";
import { SessionProvider } from "next-auth/react";
import Layout from "@/components/Layout";

const GlobalStyles = createGlobalStyle`
  html,
  body{
    background-color: #eee;
    padding:0;
    margin:0;
    font-family: 'Poppins', sans-serif;
    height： 100%;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  hr{
    display: block;
    border:0;
    border-top:1px solid #ccc;
  }
`;

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <>
      <GlobalStyles />
      <SessionProvider session={session}>
        <CartContextProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </CartContextProvider>
      </SessionProvider>
    </>
  );
}
