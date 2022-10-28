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
            </Head>

            <Navbar/>
            <main className="dark:bg-gray-600 min:h-screen">{children}</main>
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