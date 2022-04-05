import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
    return (
        <Html lang="en-us" dir="ltr">
            <Head>
                <meta charSet="utf-8" />
                <meta name="google-site-verification" />
                <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
                <meta name="keywords" content="marketing:products_services/tools/calculators/rates,marketing:products_services/ship/locations,marketing:products_services/location/us,marketing:products_services/print,marketing:products_services/ship,marketing:products_services/tools/contact" />
                <meta name="locale" content="en_us" />
                <meta name="template" content="homepage" />
                <meta name="format-detection" content="telephone=no" />

                <link rel="shortcut icon" type="image/png" href="/favicon.png" />

                <meta name="og:type" content="website" />
                <meta name="og:site_name" content="ExpressGlob" />
                <meta name="og:url" content="/" />
                <meta name="og:title" content="The New ExpressGlob.org - Tracking, Shipping &amp; Locations" />
                <meta name="og:description" content="Become a better shipper, printing offers, or get inspiration for your small business." />
            </Head>
            <body className="page basicpage">
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}