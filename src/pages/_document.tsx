import { Html, Head, Main, NextScript } from 'next/document'
export default function Document() {
    return (
        <Html lang='en'>
            <Head>
                <title>DPay - A DAO Platform for Payout on AEternity</title>
                <meta name="title" content="A DAO Platform for Payout on AEternity"></meta>
                <meta name="description" content="DPay - A2N Finance"></meta>
                <link rel="icon" type="image/x-icon" href="/favicon.ico" />
                {/* <link
                    rel="stylesheet"
                    href="https://cdnjs.cloudflare.com/ajax/libs/nprogress/0.2.0/nprogress.min.css"
                /> */}
                <meta property="og:url" content="https://dpay.a2n.finance/"></meta>
            </Head>
            <body>
                {/* 👇 Here's the script */}
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}