import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

class NavBarView extends React.Component {

    pages = ["home", "orders", "suppliers", "brands", "products", "surcharges"]
    constructor(props) {
        super(props)
        this.state = { selectIndex: 0 }
        this.onChangeHome = this.onChangeHome.bind(this)
        this.onChangeSuppliers = this.onChangeSuppliers.bind(this)
        this.onChangeBrands = this.onChangeBrands.bind(this)
        this.onChangeProducts = this.onChangeProducts.bind(this)
        this.onChangeOrders = this.onChangeOrders.bind(this)
        this.onChange = this.onChange.bind(this)
        this.onChangeSurcharges = this.onChangeSurcharges.bind(this)
        
    }


    onChange(key) {

        var index = this.pages.indexOf(key)

        this.setState({ selectIndex: index })


        this.props.selectPage(key);
    }

    onChangeHome(e) {
        e.preventDefault();
        this.onChange("home");
    }
    onChangeOrders(e) {
        e.preventDefault();
        this.onChange("orders");
    }

    onChangeSuppliers(e) {
        e.preventDefault();
        this.onChange("suppliers");

    }
    onChangeBrands(e) {
        e.preventDefault();
        this.onChange("brands");

    }
    onChangeProducts(e) {
        e.preventDefault();
        this.onChange("products");

    }

    onChangeSurcharges(e) {
        e.preventDefault();
        this.onChange("surcharges");
    }


    render() {
        return (
            <Navbar bg="light" data-bs-theme="light">
                <Container>
                    <Navbar.Brand href="#home" onClick={this.onChangeHome} >Sandello</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="#home" active={this.state.selectIndex == 0} onClick={this.onChangeHome} >Главная</Nav.Link>
                        <Nav.Link href="#orders" active={this.state.selectIndex == 1} onClick={this.onChangeOrders}>Заказы</Nav.Link>
                        <Nav.Link href="#products" active={this.state.selectIndex == 4} onClick={this.onChangeProducts} >Продукты</Nav.Link>
                        <Nav.Link href="#suppliers" active={this.state.selectIndex == 2} onClick={this.onChangeSuppliers}>Поставщики</Nav.Link>
                        <Nav.Link href="#brands" active={this.state.selectIndex == 3} onClick={this.onChangeBrands}>Бренды</Nav.Link>
                        <Nav.Link href="#surcharges" active={this.state.selectIndex == 4} onClick={this.onChangeSurcharges}>Наценка</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        )
    }

}


export default NavBarView