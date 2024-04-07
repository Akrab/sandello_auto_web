import React from 'react';
import Form from 'react-bootstrap/Form';

class BrandLineItem extends React.Component {

    constructor(props) {
        super(props)
        this.state = { statusState: props.item.isChecked }
        this.inputHandler = this.inputHandler.bind(this)
    }

    inputHandler(e) {
        e.preventDefault();
        var newVal = !this.state.statusState
        this.setState({ statusState: newVal })

        this.props.onSelect({ id: this.props.item.id, value: newVal });
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

