//полки
import { Card, Form, ListGroup, Button, Row, Col } from "react-bootstrap"
import { useState } from "react";


export default function ShelvesWarehouse({ newWarehouseObj, Add, Select, Remove }) {

    const [inputValue, setInputValue] = useState("")

    const ClickSelect = (name) => {
        Select(name);
    }

    const ClickCreate = () => {
        Add(inputValue);
        setInputValue("");
    }

    const ClickRemove = () => {
        Remove();
    }


    const RenderShelves = () => {

        var rooms = newWarehouseObj.rooms;
        if (rooms == null) rooms = {};


        var shelvesArr = [];
        var shelves  = {};
        for (var key in rooms) {
            if (rooms[key].isSelect) {
                for (var keyRack in rooms[key].racks) {

                    if (rooms[key].racks[keyRack].isSelect){
                        shelves = rooms[key].racks[keyRack].shelves;
                        break
                    }

                }
            }
        }

        for (var key in shelves)
            shelvesArr.push({ name: key, isSelect: shelves[key].isSelect })

        return (<>
            {shelvesArr.map(item => {
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
            <Form.Label column="sm">Полки</Form.Label>
            <Form.Group className="mb-3" >
                <Form.Label column="sm">Название</Form.Label>
                <Form.Control size="sm" type="text" placeholder="Введите название"
                    onChange={(e) => { setInputValue(e.target.value) }}
                    value={inputValue}
                />
            </Form.Group>
            <ListGroup column="sm" size="sm">
                <div className="second">
                    {RenderShelves()}
                </div>
            </ListGroup>
            <br />

            <Row>
                <Col >                <div class="d-flex justify-content-start">
                    <Button align="end" variant="danger" onClick={(e) => { ClickRemove() }}  >
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