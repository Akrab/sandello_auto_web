import React, { useContext, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import { SelectPageContext } from '../providers/SelectPageProvider';

export default function NavBarView() {

    const [page, setPage] = useContext(SelectPageContext);

    const selectPage = (e) => {

        if (e.target != undefined && e.target.id != undefined) {
            setPage(e.target.id)
        }
        else setPage("home")

    };

    return (<>
        <Navbar bg="light" data-bs-theme="light">
            <Container>
                <Navbar.Brand href="" onClick={selectPage} id="home">Sandello</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link href="" active={page == "home"} onClick={selectPage} id="home">Главная</Nav.Link>
                    <Nav.Link href="" active={page == "orders"} onClick={selectPage} id="orders">Заказы</Nav.Link>
                    <Nav.Link href="" active={page == "products"} onClick={selectPage} id="products" >Продукты</Nav.Link>
                    <Nav.Link href="" active={page == "suppliers"} onClick={selectPage} id="suppliers">Поставщики</Nav.Link>
                    <Nav.Link href="" active={page == "brands"} onClick={selectPage} id="brands">Бренды</Nav.Link>
                    <Nav.Link href="" active={page == "surcharges"} onClick={selectPage} id="surcharges">Наценка</Nav.Link>
                    <Nav.Link href="" active={page == "historyImportPrice"} onClick={selectPage} id="historyImportPrice">История импорта</Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    </>);

}
