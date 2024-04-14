import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

class NavBarView extends React.Component {

    pages = {
        "home": 0,
        "orders": 1,
        "suppliers": 2,
        "brands": 3,
        "products": 4,
        "surcharges": 5,
        "historyImportPrice": 6
    }


    constructor(props) {
        super(props)
        this.state = { currentPage: props.currentPage }
        this.onChange = this.onChange.bind(this)

    }

    onChange(e) {
        //   e.preventDefault();  
        var page = "home"
        if (e.target != undefined && e.target.id != undefined) {
            page = e.target.id
        }
        this.setState({ currentPage: page })
        this.props.selectPage(page);

    }

    render() {
        return (
            <Navbar bg="light" data-bs-theme="light">
                <Container>
                    <Navbar.Brand href="home" onClick={this.onChangeHome} id="home">Sandello</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="home" active={this.state.currentPage == "home"} onClick={this.onChange} id="home">Главная</Nav.Link>
                        <Nav.Link href="orders" active={this.state.currentPage == "orders"} onClick={this.onChange} id="orders">Заказы</Nav.Link>
                        <Nav.Link href="products" active={this.state.currentPage == "products"} onClick={this.onChange} id="products" >Продукты</Nav.Link>
                        <Nav.Link href="suppliers" active={this.state.currentPage == "suppliers"} onClick={this.onChange} id="suppliers">Поставщики</Nav.Link>
                        <Nav.Link href="brands" active={this.state.currentPage == "brands"} onClick={this.onChange} id="brands">Бренды</Nav.Link>
                        <Nav.Link href="surcharges" active={this.state.currentPage == "surcharges"} onClick={this.onChange} id="surcharges">Наценка</Nav.Link>
                        <Nav.Link href="historyImportPrice" active={this.state.currentPage == "historyImportPrice"} onClick={this.onChange} id="historyImportPrice">История импорта</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        )
    }

}


export default NavBarView