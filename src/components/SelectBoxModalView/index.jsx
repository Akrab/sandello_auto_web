import React, { useState } from "react";
import { Alert, Spinner, Modal, Row, Col, OverlayTrigger, Tooltip, Table, Form, Button } from "react-bootstrap";

import BasePaginator from "../BasePaginator";


export default function SelectBoxModalView({ showModal, setShowModal, warehouses, selectWarehouse, onSelect }) {

    const [inputValue, setInputValue] = useState("");
    const [chkbox, setChkbox] = useState(-1);

    const [selectRoom, setSelectRoom] = useState(null);
    const [selectShelf, setSelectShelf] = useState(null);
    const [selectRack, setSelectRack] = useState(null);

    const onHideClick = () => {
        setShowModal(false);
    }

    const onChangeBox = (e) => {
        setChkbox(parseInt(e))
    }

    const onInputValue = (e) => {
        setInputValue(e.target.value);
    }


    const getAllBoxesShelves = (roomName, rackName, shelves) => {
        var boxes = [];

        if (shelves == null) return boxes;
        shelves.map(shelf => {

            var shelfBoxes = shelf.boxes;
            if (shelfBoxes == null)
                return;


            for (var i = 0; i < shelfBoxes.length; i++) {
                boxes.push({ id: shelfBoxes[i].id, box: shelfBoxes[i].name, shelf: shelf.name, rack: rackName, room: roomName });
            }

        });

        return boxes;
    }

    const getAllBoxesRacks = (roomName, racks) => {
        var boxes = [];
        if (racks == null) return boxes;
        racks.map(rack => {

            var boxesShelf = getAllBoxesShelves(roomName, rack.name, rack.shelves);

            for (var i = 0; i < boxesShelf.length; i++) {
                boxesShelf[i].rack = rack.name
                boxes.push(boxesShelf[i]);
            }

        });

        return boxes;
    }

    const getAllBoxesRooms = (rooms) => {
        var boxes = [];

        if (rooms == null) return boxes;
        rooms.map(room => {

            var boxesRack = getAllBoxesRacks(room.name, room.racks);

            for (var i = 0; i < boxesRack.length; i++) {
                boxesRack[i].room = room.name
                boxes.push(boxesRack[i]);
            }

        });

        return boxes;
    }

    const createTableBody = () => {


        if (warehouses == null) {
            return drawTableField([]);
        }
        var boxes = [];

        warehouses.map(warehouse => {

            if (warehouse.id != selectWarehouse) return;
            var rooms = warehouse.rooms;

            if (rooms == null) return;

            if (selectRoom == null) {
                boxes = getAllBoxesRooms(rooms);
                return
            }


            return rooms.map(room => {

                if (room.id != selectRoom) return

                if (selectRack == null) {
                    boxes = getAllBoxesRacks(room.name, room.racks);
                    return
                }

                var racks = room.racks;
                return racks.map(rack => {

                    if (rack.id != selectRack) return

                    if (selectShelf == null) {
                        boxes = getAllBoxesShelves(room.name, rack.name, rack.shelves);
                        return
                    }

                    var shelves = rack.shelves;

                    return shelves.map(shelf => {


                        if (shelf.id != selectShelf) return

                        boxes = getAllBoxesShelves(room.name, rack.name, [shelf]);
                        return
                    })

                })

            })
        })


        return drawTableField(boxes);
    }

    const drawRooms = () => {
        if (warehouses == null) {
            return
        }

        return (<>
            <option value='-1'>Выберите помещение(выбрана комната по умолчанию)</option>
            {warehouses.map(warehouse => {

                if (warehouse.id != selectWarehouse) return;
                var rooms = warehouse.rooms;

                if (rooms == null) return;
                return rooms.map(room => {
                    return <option value={room.id}>{room.name}</option>
                })
            })}
        </>)
    }

    const drawRacks = () => {
        if (warehouses == null) {
            return
        }

        return (<>
            <option value='-1'>Выберите стеллаж</option>
            {warehouses.map(warehouse => {

                if (warehouse.id != selectWarehouse) return;
                var rooms = warehouse.rooms;

                if (rooms == null) return;
                return rooms.map(room => {


                    if (room.id != selectRoom) return
                    var racks = room.racks;
                    if (racks == null) return;


                    return racks.map(rack => {

                        return <option value={rack.id}>{rack.name}</option>
                    });
                })
            })}
        </>)
    }

    const drawShelves = () => {
        if (warehouses == null) {
            return
        }

        return (<>
            <option value='-1'>Выберите полку</option>
            {warehouses.map(warehouse => {

                if (warehouse.id != selectWarehouse) return;
                var rooms = warehouse.rooms;

                if (rooms == null) return;
                return rooms.map(room => {


                    if (room.id != selectRoom) return
                    var racks = room.racks;
                    if (racks == null) return;


                    return racks.map(rack => {


                        if (rack.id != selectRack) return
                        var shelves = rack.shelves;
                        if (shelves == null) return;

                        return shelves.map(shelf => {
                            return <option value={shelf.id}>{shelf.name}</option>
                        });
                    });
                })
            })}
        </>)
    }

    const drawTableField = (newItems) => {

        return (<>
            {newItems.map(item => {
                return <>
                    <tr size="sm"
                        onClick={(e) => onChangeBox(item.id == "-" ? -1 : item.id)}
                        class={chkbox == item.id && item.id != -1 ? "table-primary" : ""} >
                        <td >{item.id}</td>
                        <td >{item.room}</td>
                        <td >{item.rack}</td>
                        <td >{item.shelf}</td>
                        <td >{item.box}</td>
                    </tr>
                </>
            })}
        </>)
    }


    const onChangeRoom = () => {
        var obj = document.getElementById('onChangeRoom')

        if (parseInt(obj.value) != -1)
            setSelectRoom(obj.value)
        else setSelectRoom(null)
        setSelectRack(null)
        setSelectShelf(null)
    }

    const onChangeRack = () => {
        var obj = document.getElementById('onChangeRack')
        if (parseInt(obj.value) != -1)
            setSelectRack(obj.value)
        else setSelectRack(null)
        setSelectShelf(null)
    }

    const onChangeShelf = () => {
        var obj = document.getElementById('onChangeShelf')
        if (parseInt(obj.value) != -1)
            setSelectShelf(obj.value)
        else setSelectShelf(null)
    }

    const onApplyChangeBox = () => {

        if (chkbox == null || chkbox == -1) return;

        warehouses.map(warehouse => {

            var rooms = warehouse.rooms;

            if (rooms == null) return;

            return rooms.map(room => {

                var racks = room.racks;
                if (racks == null) return;

                return racks.map(rack => {

                    var shelves = rack.shelves;
                    if (shelves == null) return;

                    return shelves.map(shelf => {

                        var boxes = shelf.boxes;
                        if (boxes == null) return;

                        return boxes.map(box => {
                            if (box.id == chkbox) {
                                onSelect(box, room.name, rack.name, shelf.name )
                                return
                            }

                        });
                    });
                });
            })
        })

        setSelectRoom(null)
        setSelectRack(null)
        setSelectShelf(null)
        setShowModal(false);

    }

    return (<>
        <Modal
            size="lg"
            show={showModal}
            onHide={() => { onHideClick() }}
            aria-labelledby="find-products-modal-sizes-title-lg"
        >
            <Modal.Header closeButton>
                <Modal.Title id="find-products-modal-sizes-title-lg">
                    Поиск коробки
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    {/* <Form.Group className="mb-3" >
                        <Form.Label column="sm">Название коробки</Form.Label>
                        <Form.Control size="sm" type="text" placeholder="Введите текст" value={inputValue} onChange={onInputValue} />
                    </Form.Group> */}
                    <Form.Group className="mb-3" >
                        <Form.Label column="sm">Помещение</Form.Label>
                        <Form.Select id="onChangeRoom" onChange={e => { onChangeRoom() }} size="sm" aria-label="Default select example">
                            {drawRooms()}
                        </Form.Select>
                    </Form.Group>
                    <Row>
                        <Col>
                            <Form.Group className="mb-3" >
                                <Form.Label column="sm">Стеллаж</Form.Label>
                                <Form.Select id="onChangeRack" onChange={e => { onChangeRack() }} size="sm" aria-label="Default select example">
                                    {drawRacks()}
                                </Form.Select>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="mb-3" >
                                <Form.Label column="sm">Полка</Form.Label>
                                <Form.Select id="onChangeShelf" onChange={e => { onChangeShelf() }} size="sm" aria-label="Default select example">
                                    {drawShelves()}
                                </Form.Select>
                            </Form.Group>
                        </Col>
                    </Row>


                    <Form.Group className="mb-3" >
                        <Table responsive size="sm" >

                            <thead>
                                <tr size="sm">
                                    <th>id</th>
                                    <th>Помещение</th>
                                    <th>Стеллаж</th>
                                    <th>Полка</th>
                                    <th>Коробка</th>
                                </tr>
                            </thead>

                        </Table>

                        <div class="scrollView" >
                            <Table responsive size="sm" >
                                <thead>
                                </thead>

                                <tbody>

                                    {createTableBody()}

                                </tbody>

                            </Table>
                        </div>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" id="button-select-box"
                    className={warehouses == null ? "secondary" : chkbox != -1 ? "primary" : "secondary"} onClick={(e) => { onApplyChangeBox() }}>
                    Выбрать
                </Button>
            </Modal.Footer>

        </Modal>
    </>)
}
