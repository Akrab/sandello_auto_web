
import { Form } from 'react-bootstrap';
import React, { useEffect, useState } from "react";

export default function HeaderOnOffSystem({ children }) {


    const [enable, setEnable] = useState(false);
    function inputHandler(e) {
        setEnable(!enable);
        
    }

    const load =()=>{

        console.log("asds")
    }


    useEffect(() => { load() }, []);

    return (
        <Form>
            <Form.Check 
                type="switch"
                id="custom-switch"
                label="Вкл/Выкл"
                onInput={inputHandler}
                value={enable}
                checked={enable}
            />

        </Form>
    )
}