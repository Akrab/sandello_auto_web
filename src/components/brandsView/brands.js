

import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import BrandLineItem from './brandLineItem'
import axios from "axios";


// function Brands() {

//     const [brands, setBrands] = useState([])


//     function loadData() {
//         axios.get('https://reqres.in/api/users?page=1')
//             .then(function (response) {

//                 var arr = []
//                 var data = response.data.data;
//                 for (var i = 0; i < data.length; i++) {
//                     var item = data[i]
//                     var isC = (item.id % 2) == 0
//                     var id_switch = "flexSwitchCheckDefault_" + item.id
//                     arr.push(
//                         {
//                             id: item.id,
//                             title: item.last_name,
//                             isChecked: isC,
//                             id_switch: id_switch
//                         }
//                     )
//                 }
//                 setBrands({ brands: arr });

//             })
//             .catch(function (error) {

//                 console.log(error)
//             });
//     }



//     return (
//         <Container>
//             <Table responsive="sm">
//                 <thead>
//                     <tr>
//                         <th>ID</th>
//                         <th>Название</th>
//                         <th>Статус(вкл/выкл)</th>

//                     </tr>
//                 </thead>
//                 <tbody>
//                     {loadData()}
//                     {brands.map((item, index) => 
//                         //console.log(item)

//                         <BrandLineItem item_id={item.id} title={item.title} isChecked={item.isChecked} id_switch={item.id_switch} />
//                         // if (index == 0) {
//                         //     <div> <BrandLineItem item_id="122" title="32456y" id_switch="asd3ws" /> </div>;

//                         // }
//                         //   <BrandLineItem item_id={item.id} title={item.title} isChecked={item.isChecked} id_switch={item.id_switch} />
//                     )}

//                 </tbody>
//             </Table>

//         </Container>)


// }


class Brands extends React.Component {

    constructor(props) {
        super(props)
        this.state = { brands: [] }
        var self = this;
        axios.get('https://reqres.in/api/users?page=1')
            .then(function (response) {

                var arr = []
                var data = response.data.data;
                for (var i = 0; i < data.length; i++) {
                    var item = data[i]
                    var isC = (item.id % 2) == 0
                    var id_switch = "flexSwitchCheckDefault_" + item.id
                    arr.push(
                        {
                            id: item.id,
                            title: item.last_name,
                            isChecked: isC,
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
                       < BrandLineItem item={item} key={index} />
                    )}

                </tbody>
            </Table>

        </Container>)
    }
}

export default Brands