
import React, { useState } from 'react';
import SupplierLineItem from './supplierLineItem';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import axios from "axios";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
class Suppliers extends React.Component {


    constructor(props) {
        super(props)
        this.state = {
            suppliers: [
                { id: 0, title: "test", email: "asddas@mail.ru", description: " sdfs sdf ssdf asdff asdf asdf assdf asdf asdf assdf asdf asd fasdf sd ff", id_switch: "test_1" },
                { id: 1, title: "test 1", email: "asddas@mail.ru", description: "t", id_switch: "test_2" },
                { id: 2, title: "test 2", email: "asddas@mail.ru", description: "t", id_switch: "test_3" },
            ]
        }
        //   this.clickSaveHandler = this.clickSaveHandler.bind(this)
    }
    render() {
        return (<Container>

            <Table responsive="sm">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Название</th>
                        <th>e-mail</th>
                        <th>Описание</th>
                        <th>Статус(вкл/выкл)</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>

                    {this.state.suppliers.map((item, index) =>
                        < SupplierLineItem item={item} key={index} />
                    )}
                </tbody>
            </Table>

            {/* <div align="right" >
                <Button variant="primary" onClick={this.clickSaveHandler}>Сохранить</Button>{' '}
            </div> */}
        </Container>)
    }
}

export default Suppliers



