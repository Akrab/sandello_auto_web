import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

class NavBarView extends React.Component {

    render() {
        return (
            <Navbar bg="light" data-bs-theme="light">
                <Container>
                    <Navbar.Brand href="#home">Sandello</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="#home">Главная</Nav.Link>
                        <Nav.Link href="#suppliers">Поставщики</Nav.Link>
                        <Nav.Link href="#brands">Бренды</Nav.Link>
                        <Nav.Link href="#products">Продукты</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
            )
    }

}


export default NavBarView