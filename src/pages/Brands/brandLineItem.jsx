
import Form from 'react-bootstrap/Form';
import React, { useState, useContext } from "react";


export default function BrandLineItem(props) {


    const [enabled, setEnabled] = useState(props.enabled == "true");

    function inputHandler(e) {
        setEnabled(!enabled)
    }

    return (<tr>
        <td>{props.id}</td>
        <td>{props.title}</td>
        <td>
            <Form>
                <Form.Check
                    type="switch"
                    id={props.id_switch}
                    onInput={inputHandler}
                    value={enabled}
                    checked={enabled}
                />
            </Form>
        </td>
    </tr>)

}


