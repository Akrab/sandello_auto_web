import { useState, } from "react";
import { Modal, Spinner, InputGroup, Accordion, Tabs, Tab, Alert, Button, Form } from "react-bootstrap";
import { useLocalWarehousesProductsProvider } from "../../contexts/LocalWarehousesProductsProvider"

export default function EditProduct({onUpdate}) {

    const {
        showEditModal, setShowEditModal, editSlot, setEditSlot, loadingSlotInfoStatus, UpdateBoxProduct
    } = useLocalWarehousesProductsProvider();

    const [newCount, setNewCount] = useState(-1);
    const [newPrice, setNewPrice] = useState(-1);

    const onClickClose = () => {

        setShowEditModal(false);
        setEditSlot(null);
        newCount(-1)
        newPrice(-1)
    }

    const onClickApply = () => {

       var modValue =  editSlot.boxProduct.id + newCount + newPrice
        UpdateBoxProduct({id : editSlot.boxProduct.id, count : newCount, price : newPrice + "" }, ()=>{ onClickClose(); onUpdate(getRandomStr());} );
    }

    const getRandomStr = () => {
        return (Math.random() + 1).toString(36).substring(7);
    }

    const isEditedData = ()=>{
        if(newCount == -1 && newPrice == -1) return false;

        if(newCount != -1 && newCount != editSlot.boxProduct.count) return true;
        if(newPrice != -1 && newPrice != editSlot.boxProduct.price) return true;

        return false
    }

    const onEditNewCount = (e) => {
        setNewCount(parseInt(e.target.value));
    }

    const onEditNewPrice = (e) => {
        if (parseFloat(e.target.value) < 0)
            setNewPrice(0);
        else
            setNewPrice(e.target.value);
    }

    const isLoaded = () => {
        return loadingSlotInfoStatus != "NONE"
    }

    const drawLoadInfoButton = () => {

        if (loadingSlotInfoStatus != "LOADING") return

        return (<><Button variant="primary" disabled>
            <Spinner
                as="span"
                animation="grow"
                size="sm"
                role="status"
                aria-hidden="true"
            />
            <span> Загружаем актуальные данные... </span>
        </Button>  </>)
    }

    
    const drawUpdateInfoButton = () => {

        if (loadingSlotInfoStatus != "UPDATE_PROCESS") return
        return (<><Button variant="primary" disabled>
            <Spinner
                as="span"
                animation="grow"
                size="sm"
                role="status"
                aria-hidden="true"
            />
            <span> Обновляем данные... </span>
        </Button>  </>)
    }

    const drawButtons = () => {
        if (loadingSlotInfoStatus != "NONE") return;
        return (<>
            <Button variant="primary" onClick={e => { onClickClose() }}>
                Закрыть
            </Button>
            <Button variant="danger" onClick={e => { onClickApply() }} disabled = {!isEditedData()}>
                Сохранить
            </Button>
        </>)
    }

    const drawDescription = () => {

        if( editSlot.boxProduct.description == null || editSlot.boxProduct.description == "" )
            return

        return (<>
                   <br />
            <Accordion size="sm">
                <Accordion.Item size="sm" eventKey="0">
                    <Accordion.Header size="sm" >Описание</Accordion.Header>
                    <Accordion.Body size="sm" > {editSlot.boxProduct.description}
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </>)
    }

    if (editSlot == null) return;
    return (

        <>
            <Modal show={showEditModal} onHide={e => { onClickClose() }}>
                <Modal.Header closeButton>
                    <Modal.Title>Редактирование слота №{editSlot.boxProduct.id}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>SKU: {editSlot.product.sku}</Form.Label>
                    </Form.Group>
                    <Tabs
                        defaultActiveKey="leftovers"
                        className="mb-3"
                        justify
                    >
                        <Tab eventKey="leftovers" title="Остатки">

                            <InputGroup>
                                <InputGroup.Text type="number" min="1">Количество</InputGroup.Text>
                                <Form.Control
                                    size="sm" type="number" min="0" step="1"
                                    value={newCount == -1 ? editSlot.boxProduct.count : newCount} onChange={e => onEditNewCount(e)}
                                    disabled={isLoaded()}
                                />
                            </InputGroup>
                        </Tab>
                        <Tab eventKey="price" title="Цена">

                            <InputGroup>
                                <InputGroup.Text type="number" min="1"> Новая цена</InputGroup.Text>
                                <Form.Control
                                    size="sm" type="number" min="1" max="1000000.00" step="0.01"
                                    value={newPrice == -1 ? editSlot.boxProduct.price : newPrice} onChange={e => onEditNewPrice(e)}
                                    disabled={isLoaded()}
                                />
                            </InputGroup>
                        </Tab>

                    </Tabs>
         
                {drawDescription()}
                </Modal.Body>
                <Modal.Footer>
                    {drawButtons()}
                    {drawLoadInfoButton()}
                    {drawUpdateInfoButton()}
                </Modal.Footer>
            </Modal>
        </>
    );

}
