import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavLink from "../NavLink";
import { useNavigate } from 'react-router-dom/dist';

export default function Header() {
    const navigate = useNavigate();

    return <Navbar bg="light" data-bs-theme="light">
        <Container>
            <Navbar.Brand href="" onClick={() => navigate("/")} id="home">Sandello</Navbar.Brand>
            <Nav className="me-auto">
                <NavLink url="orders" id="orders">Заказы</NavLink>
                <NavLink url="products" id="products">Продукты</NavLink>
                <NavLink url="suppliers" id="suppliers">Поставщики</NavLink>
                <NavLink url="brands" id="brands">Бренды</NavLink>
                <NavLink url="surcharges" id="surcharges">Наценка</NavLink>
                <NavLink url="historyImportPrice" id="historyImportPrice">История импорта</NavLink>
            </Nav>
        </Container>
    </Navbar>

}
