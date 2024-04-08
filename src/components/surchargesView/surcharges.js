
import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import axios from "axios";
import SurchargeLineItem from './surchargeLineItem'; 

class Surcharges extends React.Component {


    constructor(props) {
        super(props)
        this.state = {
            updated: {},
            surcharges: []
        }

        this.clickUpdateElentHandler = this.clickUpdateElentHandler.bind(this)
        //   this.clickSaveHandler = this.clickSaveHandler.bind(this)

        var self = this;
        axios.get('/api/v1/surcharges', { offset: 0, limit: 1000 })
            .then(function (response) {

                if (response.data.status != "ok") {
                    throw response.error;
                }
                var arr = []
                var surchargesData = response.data.result.surcharges;
                for (var i = 0; i < surchargesData.length; i++) {
                    var item = surchargesData[i]
                    item.id_switch = "surchargeSwitchId_" + item.id
                    arr.push(item)
                }
                self.setState({ surcharges: arr });

            })
            .catch(function (error) {

                console.log(error)
            });
    }

    clickUpdateElentHandler(data) {

        // var brands = this.state.brands;
        // var updated = this.state.updated

        // for (var index in brands) {

        //     if (brands[index].id == data.id) {
        //         if (brands[index].isChecked == data.value) {
        //             delete updated[data.id]
        //         }
        //         else {
        //             updated[data.id] = data.value;
        //         }
        //         break;
        //     }

        // }

        // this.setState({ updated: updated })

    }

    render() {
        return (<Container>


            <Table responsive="sm">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Начиная(включительно)</th>
                        <th>До(Не включительно)</th>
                        <th>Наценка в %</th>
                        <th>Активен</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>

                    {this.state.surcharges.map((item, index) =>
                        < SurchargeLineItem item={item} key={index} onEdit={this.onEdit} onDelete={this.onDelete} />
                    )}
                </tbody>
            </Table>

            {/* <div align="right" >
                <Button variant="primary" onClick={this.clickSaveHandler}>Сохранить</Button>{' '}
            </div> */}
        </Container>)
    }
}

export default Surcharges