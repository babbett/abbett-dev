//? App is the top level component, common across all the pages
//? Can be used to keep state when navigating between pages

//! global CSS must be imported from here (pages/_app.js)
//!     Since global css affects all the elements on the page, we cannot import global
//!     styles anywhere else. 
import '../styles/global.css';

export default function App({ Component, pageProps }) {
    //console.log(Component);
    //console.log(pageProps);
    return <Component {...pageProps} />;
}