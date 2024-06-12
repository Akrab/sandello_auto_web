import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Table from 'react-bootstrap/Table';
import { useSurchargesProvider } from '../../contexts/SurchargesProvider';
import { useEffect } from 'react';


export default function SurchargeModal({onUpdate, children }) {

    const {
        editSurcharge,
        setEditSurcharge,
    } = useSurchargesProvider();

    const [enable, setEnable] = useState(editSurcharge ==null ? false : editSurcharge.updated === undefined ? editSurcharge.enable : editSurcharge.updated);
    const [to, setTo] = useState(editSurcharge == null ? 0: editSurcharge.to);
    const [from, setFrom] = useState(editSurcharge == null ? 0: editSurcharge.from);
    const [value, setValue] = useState(editSurcharge == null ? 0: editSurcharge.value);


    const handleClose = (e) => {

        setEnable(editSurcharge.updated === undefined ? editSurcharge.enable : editSurcharge.updated)
        setTo(editSurcharge.to);
        setFrom(editSurcharge.from);
        setValue(editSurcharge.value);

        setEditSurcharge(null)
    }

    const handleSave = (e) => {
        onUpdate({ id: editSurcharge.id, to, from, value, enable });
        setEditSurcharge(null)
    }

    const onInputTo = (e) => {
        var v = checkInputInt(e.target.value, 1)
        setTo(v);

    }
    const onInputFrom = (e) => {

        var v = checkInputInt(e.target.value, 0)
        setFrom(v);
    }

    const onInputEnableValue = (e) => {
        setEnable(!enable);
    }

    const onInputValue = (e) => {
        var v = checkInputFloat(e.target.value);
        setValue(v);
    }

    const checkInputInt = (data, min) => {
        try {
            var v = parseInt(data);
            if (isNaN(v)) {
                v = min
            }

            if (v < min)
                v = min;
        } catch (err) {
            v = min;
        }
        return v;
    }

    const checkInputFloat = (data, min) => {
        try {
            var v = parseFloat(data);
            if (isNaN(v)) {
                v = min
            }

            if (v < min)
                v = 0;
        } catch (err) {
            v = min;
        }

        return v;
    }

    const isShowModel =()=>{

        return editSurcharge != null;
    }

    if (isShowModel() == false) {
        return ;
    }

    return (
        
        <>
            <Modal show={isShowModel()} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Редактирование №{editSurcharge.id}</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Table >
                        <thead>
                            <tr>
                                <th>От(включительно)</th>
                                <th>До(Не включительно)</th>
                                <th>Наценка в %</th>
                                <th>Активен</th>
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
                                            value={from}

                                            onInput={onInputFrom}
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
                                        value={to}
                                        onInput={onInputTo}
                                    />
                                </InputGroup></td>
                                <td>                                <InputGroup className="mb-3">
                                    <Form.Control
                                        placeholder="Значение"
                                        aria-label="percent"
                                        aria-describedby="basic-addon1"
                                        type='numeric'
                                        min="0.0"
                                        value={value}
                                        onInput={onInputValue}
                                    />
                                </InputGroup></td>
                                <td>
                                    <Form.Check
                                        type="switch"
                                        id={editSurcharge.id}
                                        onInput={onInputEnableValue}
                                        value={enable}
                                        checked={enable}
                                    />
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>
                        Закрыть
                    </Button>
                    <Button variant="danger" onClick={handleSave}>
                        Сохранить
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
