import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import { getSortedPostsData } from '../lib/posts';


// getStaticProps can also be used to query dbs directly, or to external apis
// it always runs server side, so none of this function is sent to the client`
export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  
  //? By returning `allPostsData` inside the `props` object in `getStaticProps`, the blog
  //? posts will be passed to the `Home` component as a prop. 
  return {
    props: {
      allPostsData,
    },
  };
}

export default function Home({ allPostsData }) {
  //? the 'home' is a prop used in layout.js
  return (  
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>[Your self introduction]</p>
        <p>
          (sample website - its jsut a sample who cares waaawa on {' '}
          <a href="https://nextjs.org/learn">our next.js tutorial</a>.)
        </p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              {title}
              <br />
              {id}
              <br />
              {date}
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}
