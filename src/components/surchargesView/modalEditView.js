import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Table from 'react-bootstrap/Table';

class ModalEditView extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            data: props.data,
            runtimeData: {
                id : props.data.item.id,
                from: props.data.item.from,
                to: props.data.item.to,
                value: props.data.item.value,
                enable: props.data.item.enable
            }
        }
        this.handleClose = this.handleClose.bind(this)
        this.onInputValue = this.onInputValue.bind(this)
        this.onInputTo = this.onInputTo.bind(this)
        this.onInputFrom = this.onInputFrom.bind(this)
        this.handleSave = this.handleSave.bind(this)
    }

    handleClose(e) {
        var data = this.state.data
        data.show = false;
        this.props.onClose(this.props.data.item);
        this.setState({ data: data })
    }

    handleSave(e) {
        this.props.onSave(this.state.runtimeData);

        var data = this.state.data
        data.show = false;
        this.props.onClose();
        this.setState({ data: data })
    }

    onInputTo(e) {
        var runtimeData = this.state.runtimeData

        try {
            var v = parseInt(e.target.value);
            if (isNaN(v)) {
                v = 1.0
            }
            runtimeData.to = v;
            if (runtimeData.to < 1.0)
                runtimeData.to = 1.0;
        } catch (err) {
            runtimeData.to = 1;
        }
        this.setState({ runtimeData: runtimeData })
    }
    onInputFrom(e) {
        var runtimeData = this.state.runtimeData

        try {
            var v = parseFloat(e.target.value);
            if (isNaN(v)) {
                v = 0
            }
            runtimeData.from = v
            if (runtimeData.from < 0)
                runtimeData.from = 0;
        } catch (err) {
            runtimeData.from = 0;
        }
        e.value = runtimeData.from
        this.setState({ runtimeData: runtimeData })
    }

    onInputValue(e) {
        var runtimeData = this.state.runtimeData

        try {
            var v = parseInt(e.target.value);
            if (isNaN(v)) {
                v = 0
            }
            runtimeData.value = v;
            if (runtimeData.value < 0)
                runtimeData.value = 0;
        } catch (err) {
            runtimeData.value = 0;
        }
        this.setState({ runtimeData: runtimeData })
    }

    render() {
        return (
            <>
                <Modal show={this.state.data.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Редактирование №{this.state.data.item.id}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <Table >
                            <thead>
                                <tr>
                                    <th>От(включительно)</th>
                                    <th>До(Не включительно)</th>
                                    <th>Наценка в %</th>
                                </tr>
                            </thead>
                            <tbody>

                                <tr>
                                    <td>
                                        <InputGroup className="mb-3">
                                            <Form.Control
                                                placeholder="От"
                                                aria-label="from"
                                                aria-describedby="basic-addon1"
                                                type='numeric'
                                                min="0.0"
                                                value={this.state.runtimeData.from}

                                                onInput={this.onInputFrom}
                                            />
                                        </InputGroup>
                                    </td>
                                    <td>                                <InputGroup className="mb-3">
                                        <Form.Control
                                            placeholder="До"
                                            aria-label="to"
                                            aria-describedby="basic-addon1"
                                            type='numeric'
                                            min="1.0"
                                            value={this.state.runtimeData.to}
                                            onInput={this.onInputTo}
                                        />
                                    </InputGroup></td>
                                    <td>                                <InputGroup className="mb-3">
                                        <Form.Control
                                            placeholder="Значение"
                                            aria-label="percent"
                                            aria-describedby="basic-addon1"
                                            type='numeric'
                                            min="0.0"
                                            value={this.state.runtimeData.value}
                                            onInput={this.onInputValue}
                                        />
                                    </InputGroup></td>
                                </tr>
                            </tbody>
                        </Table>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={this.handleClose}>
                            Закрыть
                        </Button>
                        <Button variant="danger" onClick={this.handleSave}>
                            Сохранить
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
}


export default ModalEditView;