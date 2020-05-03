import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';

class CustomDocument extends Document {
    render() {
        return (
            <html lang="ru">
                <Head>
                    <link
                        href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,300;0,400;0,700;1,300;1,400;1,700&display=swap"
                        rel="stylesheet" />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </html>
        );
    }
}

export default CustomDocument;
