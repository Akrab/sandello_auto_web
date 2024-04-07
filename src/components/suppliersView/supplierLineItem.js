
import Form from 'react-bootstrap/Form';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

class SupplierLineItem extends React.Component {

    constructor(props) {
        super(props)
        this.state = { statusState: true }
       // this.inputHandler = this.inputHandler.bind(this)
        this.onClickEdit = this.onClickEdit.bind(this)
        this.onClickDelete = this.onClickDelete.bind(this)
    }

    onClickEdit() {
        this.props.onEdit(this)
    }

    onClickDelete() {
        this.props.onDelete(this)
    }

    render() {
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
            <td> <Button variant="primary" onClick={this.onClickEdit} >Редактировать</Button>{' '}
                <Button variant="danger" onClick={this.onClickDelete}>Удалить</Button>{' '}</td>

        </tr>)
    }
}

export default SupplierLineItem