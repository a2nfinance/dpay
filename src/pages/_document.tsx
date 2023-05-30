import Document, { Html, Head, Main, NextScript } from 'next/document'
import { StyleProvider, createCache, extractStyle } from '@ant-design/cssinjs'

type MyDocumentProps = {
    styles: React.ReactNode
}

export class MyDocument extends Document<MyDocumentProps> {
    render() {
        return (
            <Html lang="en">
                <Head>
                    <title>DPAY - A DAO Platform for Payout on AEternity</title>
                    <meta name="title" content="A DAO Platform for Payout on AEternity"></meta>
                    <meta name="description" content="DPay - A2N Finance"></meta>
                    <link rel="icon" type="image/x-icon" href="/favicon.ico" />
                    {/* <link
                    rel="stylesheet"
                    href="https://cdnjs.cloudflare.com/ajax/libs/nprogress/0.2.0/nprogress.min.css"
                /> */}
                    <meta property="og:url" content="https://dpay.a2n.finance/"></meta>
                    {this.props.styles}
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}

MyDocument.getInitialProps = async (ctx) => {
    const originalRenderPage = ctx.renderPage
    const cache = createCache()

    ctx.renderPage = () =>
        originalRenderPage({
            enhanceApp: (App) =>
                function EnhanceApp(props) {
                    return (
                        <StyleProvider cache={cache}>
                            <App {...props} />
                        </StyleProvider>
                    )
                },
        })

    const initialProps = await Document.getInitialProps(ctx)

    return {
        ...initialProps,
        styles: (
            <>
                {initialProps.styles}
                <style dangerouslySetInnerHTML={{ __html: extractStyle(cache) }} />
            </>
        ),
    }
}

export default MyDocument