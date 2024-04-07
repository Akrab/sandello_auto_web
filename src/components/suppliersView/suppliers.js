
import React, { useState } from 'react';
import SupplierLineItem from './supplierLineItem';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import axios from "axios";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import ModalOkView from '../modalOkView';

class Suppliers extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            isShowModel: false,
            suppliers: [
                { id: 0, title: "test", email: "asddas@mail.ru", description: " sdfs sdf ssdf asdff asdf asdf assdf asdf asdf assdf asdf asd fasdf sd ff", id_switch: "test_1" },
                { id: 1, title: "test 1", email: "asddas@mail.ru", description: "t", id_switch: "test_2" },
                { id: 2, title: "test 2", email: "asddas@mail.ru", description: "t", id_switch: "test_3" },
            ]
        }
        this.onEdit = this.onEdit.bind(this)
        this.onDelete = this.onDelete.bind(this)
        this.checkModal = this.checkModal.bind(this)
        //   this.clickSaveHandler = this.clickSaveHandler.bind(this)
    }

    onEdit(e) {
        this.setState( {isShowModel : true})
    }

    onDelete(e) {
        this.setState( {isShowModel : true})
    }

    checkModal() {

        if (this.state.isShowModel) {

            this.setState( {isShowModel : false})
            return <ModalOkView title="Не реализовано" content="Будет позже" />
        }

        return 

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
                        < SupplierLineItem item={item} key={index} onEdit={this.onEdit} onDelete={this.onDelete} />
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



