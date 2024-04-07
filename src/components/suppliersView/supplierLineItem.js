
import Form from 'react-bootstrap/Form';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

class SupplierLineItem extends React.Component {

    render(){
        return (<tr>
            <td>{this.props.item.id}</td>
            <td>{this.props.item.title}</td>
            <td>{this.props.item.email}</td>
            <td>{this.props.item.description}</td>
            <td>
                <Form>
                    <Form.Check
                        type="switch"
                        id={this.props.item.id_switch}
                        // onInput={this.inputHandler}
                        // value={this.state.statusState}
                        // checked={this.state.statusState}
                    />
                </Form>
            </td>
            <td> <Button variant="primary">Редактировать</Button>{' '} <Button variant="danger">Удалить</Button>{' '}</td>
  
        </tr>)
    }
}

export default SupplierLineItem