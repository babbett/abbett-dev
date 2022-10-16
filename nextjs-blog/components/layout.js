import styles from "./layout.module.css"

export default function Layout({ children }) {
    /*
     ? By setting the className like this, next.js will automatically generate a unique name
     *    shows up like: layout_container__...
    */ 
    return <div className={styles.container}>{children}</div>
}
// css modules are extracted from Javascript bundles at build time, generating .css files
// that next.js loads automatically