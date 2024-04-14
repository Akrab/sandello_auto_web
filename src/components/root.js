import React from 'react';
import Container from 'react-bootstrap/Container';

import Brands from './brandsView/brands';
import Suppliers from './suppliersView/suppliers';
import Surcharges from './surchargesView/surcharges';
import HistoryImportPrice from './historyImportPriceView/historyImportPrice'; 
class RootView extends React.Component {

    constructor(props) {
        super(props)
       // this.state = { selectIndex: 0 }
   //     this.componentDidUpdate = this.componentDidUpdate.bind(this)

    }

    // componentDidUpdate(prevProps) {

    //     console.log("componentDidUpdate")
    // }

    render() {
        const project = () => {
            switch (this.props.currentPage) {
                case "brands":
                    return <Brands />
                case "suppliers":
                    return <Suppliers />
                case "surcharges":
                    return <Surcharges />
                case "historyImportPrice":
                    return <HistoryImportPrice/>
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