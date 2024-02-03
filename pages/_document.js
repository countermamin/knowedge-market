import Document, { Html, Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

function MyDocument(props) {
  return (
    <Html>
      <Head>
      <meta property="og:type" content="website" />
        <meta property="og:url" content="https://new-ecomm-front.vercel.app/" />
        <meta property="og:title" content="Онлайн магазин электронных товаров" />
        <meta property="og:description" content="Онлайн магазин электронных товаров - это лучшее место для покупки смартфонов, ноутбуков, планшетов, наушников, колонок и других электронных устройств по выгодным ценам. У нас есть широкий выбор брендов и моделей, быстрая доставка и гарантия качества. Закажи сейчас и получи скидку 10% на первый заказ!" />
        <meta property="og:image" content="https://orzu-next-ecommerce.s3.amazonaws.com/1686518863232.jpeg" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

MyDocument.getInitialProps = async (ctx) => {
  const sheet = new ServerStyleSheet();
  const originalRenderPage = ctx.renderPage;

  try {
    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: (App) => (props) =>
          sheet.collectStyles(<App {...props} />),
      });

    const initialProps = await Document.getInitialProps(ctx);
    return {
      ...initialProps,
      styles: (
        <>
          {initialProps.styles}
          {sheet.getStyleElement()}
        </>
      ),
    };
  } finally {
    sheet.seal();
  }
};

export default MyDocument;
