import { useState, } from "react";
import { Modal, Spinner, Alert, Button, Form } from "react-bootstrap";
import { useLocalWarehouseCreateNewBoxProvider } from "../../contexts/LocalWarehouseCreateNewBoxProvider";
import { useToastsOverlayProvider } from "../../contexts/ToastsOverlayProvider";

export default function AddNewBoxView({ children }) {

    const {
        newBoxViewShow, CreateBox,
        setNewBoxViewShow, loadingStatus, warehouses
    } = useLocalWarehouseCreateNewBoxProvider();

    const{
        AddToast
    }= useToastsOverlayProvider();

    const [enableUsedBoxName, setEnableUsedBoxName] = useState("");
    const [boxName, setBoxName] = useState("");
    const [selectWarehouse, setSelectWarehouse] = useState(null);
    const [selectRoom, setSelectRoom] = useState(null);
    const [selectRack, setSelectRack] = useState(null);
    const [selectShelf, setSelectShelf] = useState(null);


    const clearAll = () => {

        setSelectWarehouse(null)
        setSelectRoom(null)
        setSelectRack(null)
        setSelectShelf(null)
        setBoxName("")
    }

    const getDisabledComponentsState = () => {

        return loadingStatus != "SUCCESS"
    }

    const createEnd = (success) => {
        if (success) {
            clearAll();
            AddToast("Успех", "Коробка добавлена");
        }
        else {
            AddToast("Ошибка", "Не удалось добавить коробку", "danger");
        }
    }

    const setBoxNameAndCheck = (value) => {

        setBoxName(value);
        {
            warehouses.map(warehouse => {

                if (warehouse.id != selectWarehouse) {
                    setEnableUsedBoxName(false);
                    return;
                }
                var rooms = warehouse.rooms;

                rooms.map(room => {

                    if (room.id != selectRoom) {
                        setEnableUsedBoxName(false);
                        return;
                    };

                    var racks = room.racks
                    racks.map(rack => {

                        if (rack.id != selectRack) {
                            setEnableUsedBoxName(false);
                            return;
                        };
                        var shelves = rack.shelves

                        if (shelves == null) {
                            setEnableUsedBoxName(false);
                            return;
                        };

                        shelves.map(shelf => {

                            setEnableUsedBoxName(shelf.boxes.findIndex(D => D.name == boxName) != -1)

                        })
                    })
                })
            })
        }

    }

    const onCreate = () => {
        var description = document.getElementById('description').value
        document.getElementById('description').value = ""
        CreateBox({ warehouse: parseInt (selectWarehouse), room: parseInt (selectRoom), rack: parseInt (selectRack), shelf: parseInt (selectShelf), name: boxName, description }, createEnd);
    }


    const drawHeader = () => {

        if (loadingStatus == "LOAD") {
            return (<>
                <Modal.Title id="example-modal-sizes-title-lg">
                    Создать коробку<span> </span>

                    <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="false"
                    />
                </Modal.Title> </>)
        }

        return (<>

            <Modal.Title id="example-modal-sizes-title-lg">
                Создать коробку<span> </span>
            </Modal.Title> </>)
    }

    const drawFooter = () => {


        if (loadingStatus == "CREATE_PROCESS") {
            return (
                <>
                    <Button variant="primary" disabled>
                        <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                        />
                        <span >Создание...</span>
                    </Button>{' '}</>)
        }

        return (
            <>

                <Button disabled={getDisabledComponentsState()} onClick={e => { onCreate() }}>Добавить</Button>
            </>)
    }


    const drawWarehoses = () => {
        return (<>
            <option value='-1'>Выберите склад</option>
            {warehouses.map(item => {
                return <option value={item.id}>{item.name}</option>
            })}
        </>)

    }



    const onChangeWarehouse = () => {
        var obj = document.getElementById('selectWarehouse')

        setSelectWarehouse(obj.value);
        setSelectRoom(null)
        setSelectRack(null)
        setSelectShelf(null)
    }

    const onChangeRoom = () => {
        var obj = document.getElementById('selectRoom')

        setSelectRoom(obj.value);
        setSelectRack(null)
        setSelectShelf(null)
    }

    const onChangeRack = () => {
        var obj = document.getElementById('selectRack')
        setSelectRack(obj.value);
        setSelectShelf(null)
    }

    const onChangeShalf = () => {
        var obj = document.getElementById('selectShelf')
        setSelectShelf(obj.value);
    }

    const drawRooms = () => {

        if (selectWarehouse == null) {
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
        if (selectWarehouse == null || selectRoom == null) {
            return
        }
        return (<>
            <option value='-1'>Выберите стеллаж(выбран стеллаж по умолчанию)</option>
            {warehouses.map(warehouse => {

                if (warehouse.id != selectWarehouse) return;
                var rooms = warehouse.rooms;

                return rooms.map(room => {

                    if (room.id != selectRoom) return;

                    var racks = room.racks
                    if (racks == null) return;
                    return racks.map(rack => {
                        return <option value={rack.id}>{rack.name}</option>
                    })
                })
            })} </>)

    }


    const drawShelf = () => {
        if (selectWarehouse == null || selectRoom == null || selectRack == null) {
            return
        }

        return (<>
            <option value='-1'>Выберите полку(выбрана полка по умолчанию)</option>
            {warehouses.map(warehouse => {

                if (warehouse.id != selectWarehouse) return;
                var rooms = warehouse.rooms;

                return rooms.map(room => {

                    if (room.id != selectRoom) return;

                    var racks = room.racks
                    return racks.map(rack => {

                        if (rack.id != selectRack) return;
                        var shelves = rack.shelves

                        if (shelves == null) return;

                        return shelves.map(shelf => {
                            return <option value={shelf.id}>{shelf.name}</option>
                        })
                    })
                })
            })} </>)

    }

    const drawAlertUseBoxName = () => {
        if (enableUsedBoxName == false) return
        return (<>
            <Alert key="warning" variant="warning"> Такое имя коробки уже используется
            </Alert>
        </>)

    }

    return (<>
        <Modal
            size="lg"
            show={newBoxViewShow}
            onHide={() => setNewBoxViewShow(false)}
            aria-labelledby="example-modal-sizes-title-lg"
        >
            <Modal.Header closeButton>
                {drawHeader()}

            </Modal.Header>
            <Modal.Body>

                <Form>
                    <Form.Group className="mb-3" >
                        <Form.Label column="sm">Название</Form.Label>
                        <Form.Control size="sm" type="text" placeholder="Введите текст"
                            value={boxName} onChange={(e) => setBoxNameAndCheck(e.target.value)}
                            disabled={getDisabledComponentsState()}
                        />
                        {drawAlertUseBoxName()}
                    </Form.Group>
                    <Form.Group className="mb-3" >
                        <Form.Label column="sm">Склад</Form.Label>
                        <Form.Select id="selectWarehouse" size="sm" aria-label="Default select example"
                            onChange={e => { onChangeWarehouse() }} disabled={getDisabledComponentsState()} >
                            {drawWarehoses()}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3" >
                        <Form.Label column="sm">Помещение</Form.Label>
                        <Form.Select id="selectRoom" size="sm" aria-label="Default select example"
                            onChange={e => { onChangeRoom() }} disabled={getDisabledComponentsState()} >

                            {drawRooms()}

                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3" >
                        <Form.Label column="sm">Стеллаж</Form.Label>
                        <Form.Select id="selectRack" size="sm" aria-label="Default select example"
                            onChange={e => { onChangeRack() }} disabled={getDisabledComponentsState()} >

                            {drawRacks()}

                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3" >
                        <Form.Label column="sm">Полка</Form.Label>
                        <Form.Select id="selectShelf" size="sm" aria-label="Default select example"
                            onChange={e => { onChangeShalf() }} disabled={getDisabledComponentsState()} >

                            {drawShelf()}

                        </Form.Select>
                    </Form.Group>
                    <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlTextarea1"
                    >
                        <Form.Label column="sm" disabled={getDisabledComponentsState()} >Комментарий</Form.Label>
                        <Form.Control id="description" size="sm" as="textarea" rows={1} />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>

                {drawFooter()}

            </Modal.Footer>

        </Modal> </>
    )
}