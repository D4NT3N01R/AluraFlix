import { Outlet } from "react-router-dom";
import { Footer } from "../../components/footer";
import { Header } from "../../components/header";
import { VideoProvider } from "../../Context/videoContexto";
import Container from "../../components/Container";

const PaginaBase = () => {
    return (
        <main>
            <Header />
            <VideoProvider>
                <Container>
            {/* Outlet se usa para renderizar los componentes hijos */}
            <Outlet />
            </Container>
            </VideoProvider>
            <Footer />
        </main>
    );
};

export default PaginaBase;
