import { Row, Spinner, Card, Col, Form, Alert, Button, Modal, Container } from "react-bootstrap"
import { useState } from "react";

import styles from '../../style/main.css';
import RoomsWarehouse from "./rooms.";
import RacksWarehouse from "./racks";
import BoxesWarehouse from "./boxes";
import ShelvesWarehouse from "./shelves";

import { useCreateLocalWarehouseProvider } from "../../contexts/CreateLocalWarehouseProvider";

export default function CreateLocalWarehouse() {

    const { newWarehouseObj, AddRoom, SelectRoom, RemoveRoom, AddRack, SelectRack, RemoveRack,
        AddShelf, SelectShelf, RemoveShelf,
        AddBox, SelectBox, RemoveBox, CreateWarehouse, loadingStatus, textError, CloseAlert, Added, SetAdded,
    } = useCreateLocalWarehouseProvider();

    const [updateData, setUpdateData] = useState("NONE");
    const [description, setDescription] = useState("");
    const [name, setName] = useState("");

    const closeAlert = () => {
        CloseAlert();
        setUpdateData(getRandomStr());
    }

    const createWarehouse = () => {
        CreateWarehouse(name, description);
    }

    const addRoom = (data) => {
        AddRoom(data);
        setUpdateData(data)
    }

    const selectRoom = (data) => {
        SelectRoom(data);
        setUpdateData(data)
    }

    const removeRoom = () => {
        var r = RemoveRoom();
        setUpdateData(r + getRandomStr());
    }


    const addRack = (data) => {
        AddRack(data);
        setUpdateData(data)
    }

    const selectRack = (data) => {
        SelectRack(data);
        setUpdateData(data)
    }

    const removeRack = () => {
        var r = RemoveRack();
        setUpdateData(r + getRandomStr());
    }

    const addShelf = (data) => {
        AddShelf(data);
        setUpdateData(data)
    }

    const selectShelf = (data) => {
        SelectShelf(data);
        setUpdateData(data)
    }

    const removeShelf = () => {
        var r = RemoveShelf();
        setUpdateData(r + getRandomStr());
    }

    const addBox = (data) => {
        AddBox(data);
        setUpdateData(data)
    }

    const selectBox = (data) => {
        SelectBox(data);
        setUpdateData(data)
    }

    const removeBox = () => {
        var r = RemoveBox();
        setUpdateData(r + getRandomStr());
    }

    const getRandomStr = () => {
        return (Math.random() + 1).toString(36).substring(7);
    }


    const drawBtnBack = () => {
        return (<>
            <br />

            <Button class="btn btn-outline-primary" href="/localwarehouses" >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-backspace-fill" viewBox="0 0 16 16">
                    <path d="M15.683 3a2 2 0 0 0-2-2h-7.08a2 2 0 0 0-1.519.698L.241 7.35a1 1 0 0 0 0 1.302l4.843 5.65A2 2 0 0 0 6.603 15h7.08a2 2 0 0 0 2-2zM5.829 5.854a.5.5 0 1 1 .707-.708l2.147 2.147 2.146-2.147a.5.5 0 1 1 .707.708L9.39 8l2.146 2.146a.5.5 0 0 1-.707.708L8.683 8.707l-2.147 2.147a.5.5 0 0 1-.707-.708L7.976 8z" />
                </svg> <i class="bi bi-backspace-fill"></i>Назад</Button>

        </>)
    }

    const drawError = () => {

        if (loadingStatus == "BAD_NAME") {
            return (<>
                <Alert variant="danger" onClose={() => { closeAlert() }} dismissible>
                    <Alert.Heading>Упс, что-то пошло не так.</Alert.Heading>
                    <p>
                        Склад с таким именем уже существует. Назовите склад другим именем.
                    </p>
                </Alert>
            </>)
        }

        if (loadingStatus == "ERROR") {
            return (<>
                <Alert variant="danger" onClose={() => { closeAlert() }} dismissible>
                    <Alert.Heading>Упс, что-то пошло не так.</Alert.Heading>
                    <p>
                        {textError}
                    </p>
                </Alert>
            </>)
        }

    }

    const drawLoadState = () => {
        if (loadingStatus != "LOADING") return
        return <>
            <Button variant="primary" disabled>
                <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                />
                <span >В процессе...</span>
            </Button>{' '}</>
    }

    const drawCreateButton = () => {
        if (loadingStatus == "LOADING") return
        return <>
            <Button align="end" variant="primary" onClick={e => { createWarehouse() }} >
                Создать
            </Button></>
    }


    const drawContentLeft = () => {
        return (
            <Form>
                <Form.Group className="mb-3" >
                    <Form.Label column="sm">Название</Form.Label>
                    <Form.Control size="sm" type="text" placeholder="Введите название"
                        onChange={(e) => { setName(e.target.value) }}
                        value={name}
                    />
                </Form.Group>
                <Row>
                    <Col >
                        <Card>

                            <RoomsWarehouse newWarehouseObj={newWarehouseObj} Add={addRoom} Select={selectRoom}
                                Remove={removeRoom} />
                        </Card>
                    </Col>
                    <Col >
                        <Card>
                            <RacksWarehouse newWarehouseObj={newWarehouseObj} Add={addRack} Select={selectRack}
                                Remove={removeRack} />
                        </Card>
                    </Col>
                </Row>
                <br />
                <Row>
                    <Col >
                        <Card>
                            <ShelvesWarehouse newWarehouseObj={newWarehouseObj} Add={addShelf} Select={selectShelf}
                                Remove={removeShelf} />
                        </Card>
                    </Col>
                    <Col >
                        <Card>
                            <BoxesWarehouse newWarehouseObj={newWarehouseObj} Add={addBox} Select={selectBox}
                                Remove={removeBox} />
                        </Card> </Col>
                </Row>
                <br /><br />
            </Form >)
    }

    const drawContentRight = () => {
        return (
            <>
                <Form>
                    <Form.Group
                        className="mb-3"

                    >
                        <Form.Label column="sm">Комментарий</Form.Label>
                        <Form.Control size="sm" as="textarea" rows={4} max={10}
                            onChange={(e) => { setDescription(e.target.value) }}
                            value={description} />
                    </Form.Group>
                    <div class="d-flex justify-content-end">
                        {drawLoadState()}
                        {drawCreateButton()}
                    </div >
                    <br />
                    {drawError()}

                </Form>
            </>)
    }

    const closeAddedModal = () => {
        SetAdded(false);
        window.open("/localwarehouses", "_self");
    }

    const drawModalAdded = () => {
        return (<>
            <Modal show={Added} onHide={closeAddedModal} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Информация</Modal.Title>
                </Modal.Header>
                <Modal.Body>Склад успешно добавлен!</Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={closeAddedModal}>
                        Закрыть
                    </Button>
                </Modal.Footer>
            </Modal></>
        );
    }


    return (<>
        <div className="localwarehouses-create-page">
            <Container>
                {drawBtnBack()}
                <br />
                <br />
                <Row>
                    <Col sm={8}>{drawContentLeft()}</Col>
                    <Col sm={4}>{drawContentRight()}  </Col>
                </Row>

                {drawModalAdded()}
            </Container>
        </div>
    </>)

}