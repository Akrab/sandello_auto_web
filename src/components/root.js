import React from 'react';
import Container from 'react-bootstrap/Container';

import Brands from './brandsView/brands';
import Suppliers from './suppliersView/suppliers';
class RootView extends React.Component {

    constructor(props) {
        super(props)
        this.state = { selectIndex: 0 }
        this.componentDidUpdate = this.componentDidUpdate.bind(this)

    }

    componentDidUpdate(prevProps) {

        console.log("componentDidUpdate")
    }

    render() {
        const project = () => {
            switch (this.props.currentPage) {
                case "brands":
                    return <Brands />
                case "suppliers":
                    return <Suppliers/>
                case "brands":
                case "products":

                default:
                    return <div >{this.props.currentPage}</div>
            }
        }

        return (
            <Container>
                {project()}
            </Container>)
    }
}

export default RootView