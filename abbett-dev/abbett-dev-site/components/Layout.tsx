import Head from "next/head";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Script from "next/script"

type LayoutProps = {
    children: React.ReactNode,
};

const Layout = ({ children }: LayoutProps) => {
    return (
        <>
            <Head>
                <title>Ben Abbett | Developer</title>
            </Head>
            <Script src="https://kit.fontawesome.com/0a0f2f7cff.js" crossOrigin="anonymous"></Script>

            <main className="h-screen flex flex-col">
                <Navbar></Navbar>
                <div className="flex-auto p-10">
                    {children}
                </div>
                <Footer></Footer>
            </main>
        </>
    );
}

export default Layout;
