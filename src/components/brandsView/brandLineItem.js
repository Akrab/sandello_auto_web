import React from 'react';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

class BrandLineItem extends React.Component {

    constructor(props) {
        super(props)
        this.state = { statusState: true }
        this.inputHandler = this.inputHandler.bind(this)
    }

    inputHandler(e) {
        e.preventDefault();
        var newVal = !this.state.statusState
        this.setState({ statusState: newVal })

    }


    render() {
        return (<tr>
            <td>{this.props.item.id}</td>
            <td>{this.props.item.title}</td>
            <td>
                <Form>
                    <Form.Check
                        type="switch"
                        id={this.props.item.id_switch}
                        onInput={this.inputHandler}
                        value={this.state.statusState}
                        checked={this.state.statusState}
                    //onChange={this.inputHandler}

                    />
                </Form>
            </td>
        </tr>)
    }
}
export default BrandLineItem

