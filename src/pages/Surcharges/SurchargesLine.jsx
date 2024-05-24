import { Form, Button, } from "react-bootstrap"

import React, {  useState } from "react";
import { useSurchargesProvider } from "../../contexts/SurchargesProvider";

export default function SurchargesLine({ surcharge, onUpdate, children }) {

    const {
        setShowModal,
        setEditSurcharge
    } = useSurchargesProvider();


    const [enable, setEnable] = useState(surcharge.updated === undefined ? surcharge.enable : surcharge.updated);

    function inputHandler(e) {
        setEnable(!enable);
        onUpdate({ id: surcharge.id, enable: !enable, old: surcharge.enable });
    }

    function onClickEdit(e) {

        setEditSurcharge(surcharge);
        setShowModal(true)
    }

    function onClickDelete(e) {

    }

    return (<tr>
        <td>{surcharge.id}</td>
        <td>{surcharge.from}</td>
        <td>{surcharge.to}</td>
        <td>{surcharge.value + "%"}</td>
        <td>
            <Form>
                <Form.Check
                    type="switch"
                    id={surcharge.id}
                    onInput={inputHandler}
                    value={enable}
                    checked={enable}
                    disabled="true"
                />
            </Form>
        </td>
        <td> <Button variant="primary" onClick={onClickEdit}>Редактировать</Button>{' '}
            <Button variant="secondary" onClick={onClickDelete}>Удалить</Button>{' '}</td>

    </tr>
    )
}