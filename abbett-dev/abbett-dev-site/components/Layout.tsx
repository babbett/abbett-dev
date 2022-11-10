import Head from "next/head";
import Navbar from "./Navbar";
import Footer from "./Footer";

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
            </Head>

            <Navbar/>
            <main className="dark:bg-gray-600 min-h-screen py-5">{children}</main>
            <Footer/>
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