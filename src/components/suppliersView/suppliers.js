
import React, { useState } from 'react';
import SupplierLineItem from './supplierLineItem';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import axios from "axios";


import ModalOkView from '../modalOkView';

class Suppliers extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            isShowModel: false,
            suppliers: []
        }
        this.onEdit = this.onEdit.bind(this)
        this.onDelete = this.onDelete.bind(this)
        this.checkModal = this.checkModal.bind(this)
        this.onSelect = this.onSelect.bind(this)

        //   this.clickSaveHandler = this.clickSaveHandler.bind(this)

        var self = this;
        axios.get('/api/v1/suppliers', { offset: 0, limit: 1000 })
            .then(function (response) {

                if (response.data.status != "ok") {
                    throw response.error;
                }
                var arr = []
                var suppliersData = response.data.result.suppliers;
                for (var i = 0; i < suppliersData.length; i++) {
                    var item = suppliersData[i]
                    var id_switch = "supplierSwitchId_" + item.id
                    arr.push(
                        {
                            id: item.id,
                            name_supplier: item.name_supplier,
                            email: item.email,
                            description: item.description,
                            enable: item.enable,
                            parse_struct: item.parse_struct,
                            id_switch: id_switch
                        }
                    )
                }
                self.setState({ suppliers: arr });

            })
            .catch(function (error) {

                console.log(error)
            });
    }

    onEdit(e) {
        this.setState({ isShowModel: true })
    }

    onDelete(e) {
        this.setState({ isShowModel: true })
    }

    onSelect(data) {
        var self = this;
        axios.post('/api/v1/suppliers/update', { supplier: { id: data.id, enable: data.value } }).then(function (response) {

            if (response.data.status != "ok") {
                throw response.error;
            }

            var suppliers = self.state.suppliers;

            for (var index in suppliers) {
                if (suppliers[index].id == data.id) {
                    suppliers[index].enable = data.enable;
                }
            }


            self.setState({ suppliers: suppliers })

        }).catch(function (error) {

            console.log(error)
        });
    }

    checkModal() {

        if (this.state.isShowModel) {

            this.setState({ isShowModel: false })
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
                        < SupplierLineItem item={item} key={index} onSelect={this.onSelect} onEdit={this.onEdit} onDelete={this.onDelete} />
                    )}
                </tbody>
            </Table>

            {/* <div align="right" >
                <Button variant="primary" onClick={this.clickSaveHandler}>Сохранить</Button>{' '}
            </div> */}
        </Container>)
    }
}





