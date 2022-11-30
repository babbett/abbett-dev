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
            {/* <Navbar/>
                <main className="dark:bg-gray-700">{children}</main>
                <Footer/> */}

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
// type LayoutProps = {
//     children: React.ReactNode,
//   };

// export default function Layout({ children }: LayoutProps) {
//     return (
//         <Container>
//             <Header/>
//             <Content>
//                 <PageContainer>{children}</PageContainer>
//             </Content>
//         </Container>
//     );
// }