import Form from 'react-bootstrap/Form';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';


class SupplierLineItem extends React.Component {

    constructor(props) {
        super(props)
        this.state = { enable:  props.item.enable }
        this.inputHandler = this.inputHandler.bind(this)
        this.onClickEdit = this.onClickEdit.bind(this)
        this.onClickDelete = this.onClickDelete.bind(this)
    }

    inputHandler(e) {
        e.preventDefault();
        var newVal = !this.state.enable
        this.setState({ enable: newVal })

        this.props.onSelect({ id: this.props.item.id, value: newVal });
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
            <td>{this.props.item.name_supplier}</td>
            <td>{this.props.item.email}</td>
            <td>{this.props.item.description}</td>
            <td>
                <Form>
                    <Form.Check
                        type="switch"
                        id={this.props.item.id_switch}
                        onInput={this.inputHandler}
                        value={this.state.enable}
                        checked={this.state.enable}
                    />
                </Form>
            </td>
            <td> <Button variant="secondary" onClick={this.onClickEdit} >Редактировать</Button>{' '}
                <Button variant="secondary" onClick={this.onClickDelete}>Удалить</Button>{' '}</td>

        </tr>)
    }
}

export default SupplierLineItem