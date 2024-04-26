import { Form } from "react-bootstrap"
import { useState } from "react";
import { useBrandImportProvider } from "../../contexts/BrandImportProvider";

export default function BrandLine({ item, onUpdate, children }) {

    const [enable, setEnable] = useState(item.updated == undefined ? item.used : item.updated  );

    function OnInput(e) {
        setEnable(!enable);
        onUpdate({id : item.id,  used : !enable, old : item.used  });
    }

    return (<>
        <tr>
            <td>{item.id}</td>
            <td>{item.name}</td>
            <td>
                <Form>
                    <Form.Check type='switch' id={item.id} onInput={OnInput} value={enable} defaultChecked={enable} />
                </Form>
            </td>
        </tr>
    </>)
}

