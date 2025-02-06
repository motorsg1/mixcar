import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    // Default to 'ltr' if the locale is not defined
    const locale = this.props.__NEXT_DATA__.locale || 'en';
    const dir = locale === 'ar' ? 'rtl' : 'ltr';

    return (
      <Html dir={dir} lang={locale}>
        <Head>
          <link rel="stylesheet" href="/assets/css/style.css" />
          {/* Preload Janna LT font */}
          <link
            rel="preload"
            href="/assets/fonts/Janna-LT-Regular.ttf"
            as="font"
            type="font/ttf"
            crossOrigin="anonymous"
          />
          {/* Font face declaration can also be added here if needed */}
          <style jsx global>{`
            @font-face {
              font-family: 'Janna LT';
              src: url('/assets/fonts/Janna-LT-Regular.ttf') format('truetype');
              font-weight: 400;
              font-style: normal;
              font-display: swap;
            }
          `}</style>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;