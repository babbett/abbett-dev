import Navbar from "./Navbar";
import Footer from "./Footer";

type LayoutProps = {
    children: React.ReactNode,
};

export default function Layout({ children }: LayoutProps) {
    return (
        <>
            <Navbar/>
            <main>{children}</main>
            <Footer/>
        </>
    );
}
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