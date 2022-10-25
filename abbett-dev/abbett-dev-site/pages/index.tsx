import type { NextPage } from 'next'
import Head from 'next/head'

import Hero from '../components/Hero'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function Home() {
  return (
    <div>
      <Head>
        <title>Ben Abbett | Developer</title>
        <meta name="description" content="Ben Abbett's Developer Portfolio" />
        <link rel="icon" type="image/x-icon" href="/code.ico" />
      </Head>

      <main>
        <Hero/>
      </main>
      {/* <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer> */}
    </div>
  )
}

export default Home;
