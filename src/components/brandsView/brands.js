import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import BrandLineItem from './brandLineItem'
import axios from "axios";
import Button from 'react-bootstrap/Button';
class Brands extends React.Component {

    constructor(props) {
        super(props)
        this.state = { brands: [
            {id : 0, title: "test", isChecked : true , id_switch : "test_0" },
            {id : 1, title: "test 1", isChecked : true , id_switch : "test_1" },
            {id : 2, title: "test 2", isChecked : true , id_switch : "test_2" }
        ] }
        this.clickSaveHandler = this.clickSaveHandler.bind(this)

        // var self = this;
        // axios.get('https://reqres.in/api/users?page=1')
        //     .then(function (response) {

        //         var arr = []
        //         var data = response.data.data;
        //         for (var i = 0; i < data.length; i++) {
        //             var item = data[i]
        //             var isC = (item.id % 2) == 0
        //             var id_switch = "flexSwitchCheckDefault_" + item.id
        //             arr.push(
        //                 {
        //                     id: item.id,
        //                     title: item.last_name,
        //                     isChecked: isC,
        //                     id_switch: id_switch
        //                 }
        //             )
        //         }
        //         self.setState({ brands: arr });

        //     })
        //     .catch(function (error) {

        //         console.log(error)
        //     });
    }

    clickSaveHandler(e) {
        e.preventDefault();
        console.log("sdsd")
    }



    componentDidUpdate(prevProps) {
        console.log(" Brands componentDidUpdate")
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
                        < BrandLineItem item={item} key={index}/>
                    )}

                </tbody>
            </Table>

            <div align="right" >
                <Button variant="primary" onClick={this.clickSaveHandler}>Сохранить</Button>{' '}
            </div>


        </Container>)
    }
}

export default Brands