import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

class SurchargeLineItem extends React.Component {

    constructor(props) {
        super(props)
        this.state = { enable: props.item.is_use }
        this.inputHandler = this.inputHandler.bind(this)
        this.onClickEdit = this.onClickEdit.bind(this)
        this.onClickDelete = this.onClickDelete.bind(this)
    }

    inputHandler(e) {
        e.preventDefault();
        var newVal = !this.state.enable
        this.setState({ enable: newVal })

        // this.props.onSelect({ id: this.props.item.id, value: newVal });
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
            <td>{this.props.item.from}</td>
            <td>{this.props.item.to}</td>
            <td>{this.props.item.value + "%"}</td>
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
            <td> <Button variant="primary" onClick={this.onClickEdit} >Редактировать</Button>{' '}
                <Button variant="danger" onClick={this.onClickDelete}>Удалить</Button>{' '}</td>

        </tr>)
    }
}


export default SurchargeLineItem
