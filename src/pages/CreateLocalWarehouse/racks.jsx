//стеллажи
import styles from '../../style/main.css';
import { useState } from 'react';
import { Card, Form, ListGroup, Button, Row, Col } from "react-bootstrap"

export default function RacksWarehouse({ newWarehouseObj, Add,  Select, Remove }) {

    const [rackName, setRackName] = useState("")

    const ClickSelect = (name) => {
        Select(name);
    }

    const ClickCreate = () => {
        Add(rackName);
        setRackName("");
    }

    const ClickRemove = () => {
        Remove();
    }


    const RenderRacks = () => {

        var rooms = newWarehouseObj.rooms;
        if (rooms == null) rooms = {};


        var racksArr = [];
        for (var key in rooms) {
            if (rooms[key].isSelect) {
                for (var keyRack in rooms[key].racks) {
                    racksArr.push({ name: keyRack, isSelect: rooms[key].racks[keyRack].isSelect })
                }
            }
        }

        return (<>
            {racksArr.map(item => {
                return <>
                    <ListGroup.Item size="sm" column="sm" onClick={E => { ClickSelect(item.name) }} active={item.isSelect} >
                        {item.name}
                    </ListGroup.Item>
                </>
            })}
        </>)
    }

    return (<>
        <Card.Body>
            <Form.Label column="sm">Стеллажи</Form.Label>
            <Form.Group className="mb-3" >
                <Form.Label column="sm">Название</Form.Label>
                <Form.Control size="sm" type="text" placeholder="Введите название"
                    onChange={(e) => { setRackName(e.target.value) }}
                    value={rackName}
                />
            </Form.Group>
            <ListGroup column="sm" size="sm">
                <div className="second">
                    {RenderRacks()}
                </div>
            </ListGroup>
            <br />

            <Row>
                <Col >                <div class="d-flex justify-content-start">
                    <Button align="end" variant="danger"  onClick={(e) => { ClickRemove() }}  >
                        Удалить
                    </Button></div>
                </Col>
                <Col>                <div class="d-flex justify-content-end">
                    <Button align="end" variant="primary" onClick={(e) => { ClickCreate() }}>
                        Создать
                    </Button></div> </Col>
            </Row>
        </Card.Body></>)
}