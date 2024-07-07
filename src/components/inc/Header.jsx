import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavLink from "../NavLink";
import { NavDropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom/dist';

export default function Header() {
    const navigate = useNavigate();


    function orders() {
        return (<NavDropdown
            id="nav-dropdown-dark-example"
            title="Заказы"
            menuVariant="dark"
        >
            <NavDropdown.Item href="orders" id="orders">Активные</NavDropdown.Item>
            <NavDropdown.Item href="archive" id="archive">Архив</NavDropdown.Item>
        </NavDropdown>)
    }


    function localwarehouse() {
        return (<NavDropdown
            id="nav-dropdown-dark-example"
            title="Склад"
            menuVariant="dark"
        >
            <NavDropdown.Item href="/localwarehouses">Склады</NavDropdown.Item>
            <NavDropdown.Item href="/localwarehousesProducts">Продукты</NavDropdown.Item>
            {/* <NavDropdown.Item href="#action/3.2"> Another action </NavDropdown.Item> */}

        </NavDropdown>)
    }


    return <Navbar bg="light" data-bs-theme="light">
        <Container>
            <Navbar.Brand href="" onClick={() => navigate("/")} id="home">Sandello</Navbar.Brand>
            <Nav className="me-auto">
                {orders()}
                {localwarehouse()}
                <NavLink url="products" id="products">Продукты</NavLink>
                <NavLink url="suppliers" id="suppliers">Поставщики</NavLink>
                <NavLink url="brands" id="brands">Бренды</NavLink>
                <NavLink url="surcharges" id="surcharges">Наценка</NavLink>
                <NavLink url="historyImportPrice" id="historyImportPrice">История импорта</NavLink>

            </Nav>
            {/* <HeaderOnOffSystem/> */}

        </Container>
    </Navbar>

}