import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

class NavBarView extends React.Component {

    pages = ["home", "suppliers", "brands", "products" ]
    constructor(props) {
        super(props)
        this.state = { selectIndex: 0 }
        this.onChangeHome = this.onChangeHome.bind(this)
        this.onChangeSuppliers = this.onChangeSuppliers.bind(this)
        this.onChangeBrands = this.onChangeBrands.bind(this)
        this.onChangeProducts = this.onChangeProducts.bind(this)
        this.onChange = this.onChange.bind(this)
    }


    onChange(index) {
        this.setState({ selectIndex: index })

        
        this.props.selectPage(this.pages[index]);
    }

    onChangeHome(e) {
        e.preventDefault();
        this.onChange(0);
    }
    onChangeSuppliers(e) {
        e.preventDefault();
        this.onChange(1);

    }
    onChangeBrands(e) {
        e.preventDefault();
        this.onChange(2);

    }
    onChangeProducts(e) {
        e.preventDefault();
        this.onChange(3);

    }


    render() {
        return (
            <Navbar bg="light" data-bs-theme="light">
                <Container>
                    <Navbar.Brand href="#home" onClick={this.onChangeHome} >Sandello</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="#home" active={this.state.selectIndex == 0} onClick={this.onChangeHome} >Главная</Nav.Link>
                        <Nav.Link href="#suppliers" active={this.state.selectIndex == 1} onClick={this.onChangeSuppliers}>Поставщики</Nav.Link>
                        <Nav.Link href="#brands" active={this.state.selectIndex == 2} onClick={this.onChangeBrands}>Бренды</Nav.Link>
                        <Nav.Link href="#products" active={this.state.selectIndex == 3} onClick={this.onChangeProducts} >Продукты</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        )
    }

}


export default NavBarView