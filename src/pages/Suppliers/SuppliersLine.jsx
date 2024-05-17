import { Form, Button, Spinner } from "react-bootstrap"
import { useState } from "react";


export default function SuppliersLine({ supplier, onUpdate, children }) {

    const [enable, setEnable] = useState(supplier.updated == undefined ? supplier.enable : supplier.updated);


    function inputHandler(e) {
        setEnable(!enable);
        onUpdate({ id: supplier.id, enable: !enable, old: supplier.enable });
    }

    function onClickEdit(e) {

    }

    function onClickDelete(e) {

    }

    return (<tr>
        <td>{supplier.id}</td>
        <td>{supplier.name_supplier}</td>
        <td>{supplier.email}</td>
        <td>{supplier.description}</td>
        <td>
            <Form>
                <Form.Check
                    type="switch"
                    id={supplier.id}
                    onInput={inputHandler}
                    value={enable}
                    checked={enable}
                />
            </Form>
        </td>
        <td> <Button variant="secondary" onClick={onClickEdit}>Редактировать</Button>{' '}
            <Button variant="secondary" onClick={onClickDelete}>Удалить</Button>{' '}</td>

    </tr>)
}