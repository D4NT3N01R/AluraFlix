import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PaginaBase from './pages/paginaBase';
import { AñadirVideo } from './pages/Añadir';
import Home from './pages/Home';


export const AppRoutes = () => {

    return (

        <BrowserRouter>
            <Routes>
                <Route path="/" element={<PaginaBase />}>
                    <Route index element={<Home />}></Route>
                    <Route path="Añadir" element={<AñadirVideo />} ></Route>
                </Route>

            </Routes>
        </BrowserRouter>

    )
}