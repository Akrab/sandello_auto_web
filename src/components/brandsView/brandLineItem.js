import React from 'react';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

class BrandLineItem extends React.Component {
    render() {
        return (<tr>
            <td>{this.props.item.id}</td>
            <td>{this.props.item.title}</td>
            <td> 
                <Form>
                    <Form.Check
                        type="switch"
                        id={this.props.item.id_switch}
                    />
                </Form>
            </td>


        </tr>)
    }
}
export default BrandLineItem

