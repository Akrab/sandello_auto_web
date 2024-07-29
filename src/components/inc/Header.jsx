import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavLink from "../NavLink";
import { NavDropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom/dist';
// import { bake_cookie, read_cookie, delete_cookie } from 'sfcookies';
import Cookies from "js-cookie"
import { useState } from 'react';
import { SetSeller } from '../../api/stateSystem';
import { useToastsOverlayProvider } from '../../contexts/ToastsOverlayProvider';

export default function Header() {


    const { AddToast } = useToastsOverlayProvider();

    const COOKIE_SELECTED_SELLER = "selected_seller";
    const navigate = useNavigate();

    var map = {
        1: "ООО ГИК Авто",
        2: "ИП Синякова",
        3: "ИП Свиридов"
    }

    const [selectOrganization, setOrganization] = useState(1);

    function getSelectedSeller() {

        var value = Cookies.get(COOKIE_SELECTED_SELLER)

        if (value == null || value == "")
            value = "1";


        return parseInt(value)

    }

    function getOrganizationName() {
        var id = getSelectedSeller();
        return map[id];
    }

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

    async function onChange(id) {

        var res = await SetSeller({sellerId: id});
        if (!res || res.status === "error") {
            AddToast("Выбор продавца", res.error);
            return;
        }
        Cookies.remove(COOKIE_SELECTED_SELLER);
        Cookies.set(COOKIE_SELECTED_SELLER, id + "")
        setOrganization(id)
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

            <NavDropdown
                id="nav-dropdown-dark-example"
                title={getOrganizationName()}
                menuVariant="dark"
            >
                <NavDropdown.Item onClick={e => onChange(1)}>ООО ГИК Авто</NavDropdown.Item>
                <NavDropdown.Item onClick={e => onChange(2)}>ИП Синякова</NavDropdown.Item>
                <NavDropdown.Item onClick={e => onChange(3)}>ИП Свиридов</NavDropdown.Item>
            </NavDropdown>

        </Container>
    </Navbar>

}