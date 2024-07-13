import { useState } from 'react';
import { useCreateLocalWarehouseProvider } from '../../contexts/CreateLocalWarehouseProvider';
import styles from '../../style/main.css';
import { Card, Form, ListGroup, Button, Row, Col } from "react-bootstrap"

export default function RoomsWarehouse({ newWarehouseObj, Add, Select, Remove }) {


    const [roomName, setRoomName] = useState("")

    const ClickSelectRoom = (name) => {
        Select(name);
    }

    const ClickRemove = () => {
        Remove();
    }

    const RenderRooms = () => {

        var rooms = newWarehouseObj.rooms;
        if (rooms == null) rooms = {};

        var roomsArr = [];

        for (var key in rooms)
            roomsArr.push({ name: key, isSelect: rooms[key].isSelect })


        return (<>
            {roomsArr.map(item => {
                return <>
                    <ListGroup.Item size="sm" column="sm" onClick={E => { ClickSelectRoom(item.name) }} active={item.isSelect} >
                        {item.name}
                    </ListGroup.Item>
                </>
            })}
        </>)
    }

    const CreateRoom = () => {
        Add(roomName);
        setRoomName("");
    }


    return (<>
        <Card.Body>
            <Form.Label column="sm">Комнаты</Form.Label>
            <Form.Group className="mb-3" >
                <Form.Label column="sm">Название</Form.Label>
                <Form.Control size="sm" type="text" placeholder="Введите название"
                    onChange={(e) => { setRoomName(e.target.value) }}
                    value={roomName}
                />
            </Form.Group>
            <ListGroup column="sm" size="sm">
                <div className="second">
                    {RenderRooms()}
                </div>
            </ListGroup>
            <br />

            <Row>
                <Col >
                    <div class="d-flex justify-content-start">
                        <Button align="end" variant="danger" onClick={(e) => { ClickRemove() }}>
                            Удалить
                        </Button>
                    </div>
                </Col>
                <Col>
                    <div class="d-flex justify-content-end">
                        <Button align="end" variant="primary" onClick={(e) => { CreateRoom() }}>
                            Создать
                        </Button>
                    </div>
                </Col>
            </Row>
        </Card.Body></>)
}