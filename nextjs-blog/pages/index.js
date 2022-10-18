import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";
import Link from "next/link";

import utilStyles from "../styles/utils.module.css";

import { getSortedPostsData } from "../lib/posts";
import Date from "../components/date";

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

//? If we want to get something serverside at request time, we use getServerSideProps()
//? context contains request specific parameters
//! You should use getServerSideProps only if you need to pre-render a page whose data must be fetched at request time.
//! Time to first byte (TTFB) will be slower than getStaticProps because the server must compute the result on every request,
//! and the result cannot be cached by a CDN without extra configuration */
/*export async function getServerSideProps(context) {
  return {
      props: {
        // some prop
      },
    };
}*/

//? If we want to get data client-side, use SWR
//*"It handles caching, revalidation, focus tracking, refetching on interval, and more."
/*import useSWR from 'swr';

function Profile() {
  const { data, error } = useSWR('/api/user', fetch);

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;
  return <div>hello {data.name}!</div>;
}*/

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
          (sample website - its jsut a sample who cares waaawa on{" "}
          <a href="https://nextjs.org/learn">our next.js tutorial</a>.)
        </p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>
                <a>{title}</a>
              </Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}
