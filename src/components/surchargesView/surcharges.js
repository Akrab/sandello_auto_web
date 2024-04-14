
import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import axios from "axios";
import SurchargeLineItem from './surchargeLineItem';
import ModalEditView from './modalEditView';

class Surcharges extends React.Component {

    // <td>{this.props.item.id}</td>
    // <td>{this.props.item.from}</td>
    // <td>{this.props.item.to}</td>
    // <td>{this.props.item.value + "%"}</td>
    // <td>
    //     <Form>
    //         <Form.Check
    //             type="switch"
    //             id={this.props.item.id_switch}
    //             onInput={this.inputHandler}
    //             value={this.state.enable}
    //             checked={this.state.enable}
    //             disabled = "true"
    //         />
    //     </Form>

    constructor(props) {
        super(props)
        this.state = {
            updated: {},
            surcharges: [{id : 0, from : 0, to : 100, value : 10, id_switch: "asdsad", enable : false},
            {id : 1, from : 100, to : 1000, value : 10, id_switch: "asds5ad", enable : true}],
            editItem: {}
        }

        this.clickUpdateElentHandler = this.clickUpdateElentHandler.bind(this)
        this.onEdit = this.onEdit.bind(this)
        this.onClickClose = this.onClickClose.bind(this)
        this.onClickSave = this.onClickSave.bind(this)

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

    onEdit(data) {
        this.setState({editItem: {item : data, show : true}})
    }

    onClickClose () {
        this.setState({editItem: {item : {}, show : false}})

    }

    onClickSave(data) {

        var self = this;
        axios.post('/api/v1/surcharges/update', data)
        .then(function (response) {

            if (response.data.status != "ok") {
                throw response.error;
            }

            var surcharges = self.state.surcharges;
  
            for (var index in surcharges) {
                if (surcharges[index].id == data.id) {
                    surcharges[index].enable = data.enable
                    surcharges[index].from = data.from
                    surcharges[index].to = data.to
                    surcharges[index].value = data.value
                    break
                }

            }

            self.setState({ surcharges: surcharges });

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

    showModal() {

        if (this.state.editItem.show == true) {
            return <ModalEditView data={this.state.editItem} onClose = {this.onClickClose} onSave = {this.onClickSave} />
        }
        
    }

    render() {
        return (<Container>

            {this.showModal()}


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