import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/inc/Header";
import Main from "./pages/Main";
import Brands from "./pages/Brands";
import Suppliers from "./pages/Suppliers";
import Orders from "./pages/Orders";
import Products from "./pages/Products";
import Surcharges from "./pages/Surcharges";
import HistoryImportPrice from "./pages/HistoryImportPrice";
import NotFound from "./pages/NotFound";
import Container from 'react-bootstrap/Container';

let element = document.getElementById("root");

if (!element) {
    element = document.createElement("div");
    element.id = "root";
};

const root = createRoot(element);
root.render(<>
    <BrowserRouter>
        <Header />
        <Container>
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/products" element={<Products />} />
                <Route path="/brands" element={<Brands />} />
                <Route path="/suppliers" element={<Suppliers />} />
                <Route path="/surcharges" element={<Surcharges />} />
                <Route path="/historyImportPrice" element={<HistoryImportPrice />} />
                <Route path="/*" element={<NotFound />} />
            </Routes>
        </Container>
    </BrowserRouter>
</>)

