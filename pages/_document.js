// _document is only rendered on the server side and not on the client side
// Event handlers like onClick can't be added to this file

import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
          <link rel="icon" href="/favicon.ico" />
          <link
            rel="stylesheet"
            href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
            integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh"
            crossOrigin="anonymous"
          />
          <link
            href="https://fonts.googleapis.com/css?family=Poppins:300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i&display=swap"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/css?family=Playfair+Display:400,700,900&display=swap"
            rel="stylesheet"
          />
          <link rel="stylesheet" href="https://unpkg.com/swiper@6.6.2/swiper-bundle.min.css" />
          <meta name="title" content="Blast Analytics Store" key="title" />
          <meta name="description" content="High quality Blast Analytics merchandise delivered straight to your door!" />
          <meta property="og:title" content="Blast Analytics | Store" />
          <meta property="og:image" content="https://cdn.chec.io/email/assets/marketing/demo-preview.png" />
          <meta property="og:description" content="High quality Blast Analytics merchandise delivered straight to your door!" />
          <meta property="og:url" content="https://ecom-gtm.blastanalytics.com" />
          <meta property="twitter:title" content="Blast Analytics | Store" />
          <meta name="twitter:creator" content="@blastanalytics" />
          <meta property="twitter:image" content="https://cdn.chec.io/email/assets/marketing/demo-preview.png" />
          <meta property="twitter:description" content="High quality Blast Analytics merchandise delivered straight to your door!" />
          <meta name="twitter:card" content="summary_large_image" />
          <script
            dangerouslySetInnerHTML={{
              __html: `var utag_data = {};
              window.utag_cfg_ovrd = {noview:true};`,
            }}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `(function(a,b,c,d){
                a='https://tags.tiqcdn.com/utag/${process.env.TEALIUM_ACCOUNT}/${process.env.TEALIUM_PROFILE}/${process.env.TEALIUM_ENV}/utag.js';
                b=document;c='script';d=b.createElement(c);d.src=a;d.type='text/java'+c;d.async=true;
                a=b.getElementsByTagName(c)[0];a.parentNode.insertBefore(d,a);
                })();`,
            }}
          />
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
