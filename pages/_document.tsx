import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
    return (
        <Html>
            <Head>
                <link rel="preconnect" href="https://fonts.gstatic.com" />
                {/* <link
                    href="https://fonts.googleapis.com/css2?family=Poppins:wght@500;600&&display=swap"
                    rel="stylesheet"
                /> */}
                <link
                    href="https://fonts.googleapis.com/css2?Sora:wght@300;400;500;600;700;800&display=swap"
                    rel="stylesheet"
                />
                <link
                    href="https://unpkg.com/prismjs@1.20.0/themes/prism-okaidia.css"
                    rel="stylesheet"
                />
                {/* <link rel="icon" href="/favicon.ico" /> */}
                <link rel="icon" href="/black-gear.png" />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}
