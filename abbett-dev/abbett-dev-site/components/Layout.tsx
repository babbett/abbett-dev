import Head from "next/head";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Script from "next/script"
type LayoutProps = {
    children: React.ReactNode,
};

function Layout({ children }: LayoutProps) {
    return (
        <>
            <Head>
                <title>Ben Abbett | Developer</title>
                <meta name="description" content="Ben Abbett's Developer Portfolio" />
                <link rel="icon" type="image/x-icon" href="/code.ico" />
                <link rel="preconnect" href="https://fonts.googleapis.com"/> 
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="crossorigin"/> 
                <link href="https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,300;0,400;1,300;1,400&display=swap" rel="stylesheet"/>
                {/* fonts.google.com icons */}
                <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
            </Head>
            <Script src="https://kit.fontawesome.com/0a0f2f7cff.js" crossOrigin="anonymous"></Script>
{/* 
            <Navbar/>
            <main className="dark:bg-gray-700">{children}</main>
            <Footer/> */}

            <main className="dark:bg-gray-700 min-h-screen">
                <Navbar/>
                {children}
                <Footer/>
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