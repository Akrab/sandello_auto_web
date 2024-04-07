import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import BrandLineItem from './brandLineItem'
import axios from "axios";
import Button from 'react-bootstrap/Button';
class Brands extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            brands: [],
            updated: {}
        }

        this.clickSaveHandler = this.clickSaveHandler.bind(this)
        this.clickUpdateElentHandler = this.clickUpdateElentHandler.bind(this)
        this.renderButtonSave = this.renderButtonSave.bind(this)

        var self = this;
        axios.get('/api/v1/brands', {offset : 0, limit : 1000})
            .then(function (response) {
                if (response.data.status != "ok") {
                    throw response.error;
                }
                var arr = []
                var brandsData = response.data.result.brands;
                for (var i = 0; i < brandsData.length; i++) {
                    var item = brandsData[i]
                    var id_switch = "brandSwitchId_" + item.id
                    arr.push(
                        {
                            id: item.id,
                            title: item.name,
                            isChecked: item.used,
                            id_switch: id_switch
                        }
                    )
                }
                self.setState({ brands: arr });

            })
            .catch(function (error) {

                console.log(error)
            });
    }

    clickSaveHandler(e) {
        e.preventDefault();
        
        if ( Object.keys(this.state.updated).length == 0)
            return
        var self = this;
        axios.post('/api/v1/brands/update', this.state.updated).then(function (response) {

            var brands = this.state.brands;
            var updated = this.state.updated

            for (var index in brands) {

                for (var upKey in updated) {

                    if (upKey == brands[index].id) {
                        brands[index].isChecked = updated[upKey]
                        continue
                    }
                }
            }

            self.setState({ brands: brands, updated: {} })

        }).catch(function (error) {

            console.log(error)
        });
    }

    clickUpdateElentHandler(data) {


        var brands = this.state.brands;
        var updated = this.state.updated

        for (var index in brands) {

            if (brands[index].id == data.id) {
                if (brands[index].isChecked == data.value) {
                    delete updated[data.id]
                }
                else {
                    updated[data.id] = data.value;
                }
                break;
            }

        }

        this.setState({ updated: updated })

    }

    componentDidUpdate(prevProps) {

    }


    renderButtonSave() {

        var count = Object.keys(this.state.updated).length

        if (count == 0) {
            return <div align="right" >
                <Button variant="secondary">Сохранить</Button>{' '}
            </div>
        }

        return <div align="right" >
            <Button variant="primary" onClick={this.clickSaveHandler}>Сохранить</Button>{' '}
        </div>
    }

    render() {
        return (<Container>
            <Table responsive="sm">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Название</th>
                        <th>Статус(вкл/выкл)</th>

                    </tr>
                </thead>
                <tbody>

                    {this.state.brands.map((item, index) =>
                        < BrandLineItem item={item} key={index} onSelect={this.clickUpdateElentHandler} />
                    )}

                </tbody>
            </Table>

            {this.renderButtonSave()}


            <br />
        </Container>)
    }
}

export default Brands