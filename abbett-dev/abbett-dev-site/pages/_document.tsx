import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en_US">
      <Head>
        <meta name="description" content="Ben Abbett's Developer Portfolio" />
        <link rel="icon" type="image/x-icon" href="/code.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com"/> 
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="crossorigin"/> 
        <link href="https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,300;0,400;1,300;1,400&display=swap" rel="stylesheet"/>
      </Head>
      <body className='dark:bg-gray-700 min-h-screen'>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}