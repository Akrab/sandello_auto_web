import { Row, Spinner, Col, InputGroup, Form, ToastContainer, Toast, Alert, Button, Container } from "react-bootstrap"
import { useState, useEffect } from "react";
import SelectProductModalView from "../../components/SelectProductModalView"
import SelectBoxModalView from "../../components/SelectBoxModalView";

import { useLocalWarehouseAddProductProvider } from "../../contexts/LocalWarehouseAddProductProvider";

export default function LocalWarehouseAddProduct() {

    var {
        LoadWarehouses, warehouses, loadingStatus, AddProduct
    } = useLocalWarehouseAddProductProvider();

    const [showFindProductModal, setShowFindProductModal] = useState(false)
    const [showFindBoxModal, setShowFindBoxModal] = useState(false)

    const [product, setProduct] = useState(null)
    const [productValue, setProductValue] = useState("")
    const [box, setBox] = useState(null)
    const [boxValue, setBoxValue] = useState("")
    const [selectWarehouse, setSelectWarehouse] = useState(null)
    const [priceValue, setPriceValue] = useState(0)
    const [countProduct, setCountProduct] = useState(1)
    const [multiplicityValue, setMultiplicityValue] = useState(1)
    const [description, setDescription] = useState("")

    useEffect(() => {
        setShowFindProductModal(false);
        LoadWarehouses();
    }, []);

    const drawBtnBack = () => {
        return (<>
            <br />

            <Button class="btn btn-outline-primary" href="/localwarehousesProducts" >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-backspace-fill" viewBox="0 0 16 16">
                    <path d="M15.683 3a2 2 0 0 0-2-2h-7.08a2 2 0 0 0-1.519.698L.241 7.35a1 1 0 0 0 0 1.302l4.843 5.65A2 2 0 0 0 6.603 15h7.08a2 2 0 0 0 2-2zM5.829 5.854a.5.5 0 1 1 .707-.708l2.147 2.147 2.146-2.147a.5.5 0 1 1 .707.708L9.39 8l2.146 2.146a.5.5 0 0 1-.707.708L8.683 8.707l-2.147 2.147a.5.5 0 0 1-.707-.708L7.976 8z" />
                </svg> Назад</Button>

        </>)
    }

    function selectItem(E) {
        setProduct(E)
        setProductValue("[" + E.sku + "] " + E.product_name);
    }

    const clickSelectProduct = () => {
        setShowFindProductModal(true);
    }

    const clickSelectBox = () => {

        if (selectWarehouse == null) return;
        setShowFindBoxModal(true);
    }

    const onAddProduct = () => {
        AddProduct({
            boxId: box.id,
            productId: product.id,
            price: parseFloat(priceValue),
            multiple: parseInt(multiplicityValue),
            count: parseInt(countProduct),
            description
        },
            productAddCompleted)
    }

    const productAddCompleted = (isGood) => {

        if (isGood) {
            setProduct(null);
            setBoxValue("");
            setBox(null);
            setProductValue("")
            setPriceValue(0)
            setCountProduct(1)
            setMultiplicityValue(1)
            setDescription("");
        }
    }

    const selectBox = (E, roomName, rackName, shelfName) => {
        setBox(E)

        setBoxValue("[" + roomName + ":" + rackName + ":" + shelfName + ":" + E.name + "]");
    }

    const drawWarehouse = () => {

        return (<>
            <option value='-1'>Выберите склад</option>
            {warehouses.map(item => {
                return <option value={item.id}>{item.name}</option>
            })}
        </>)

    }

    const onChangeWarehouse = () => {
        var obj = document.getElementById('selectWarehouse')
        var value = parseInt(obj.value);
        if (value == -1)
            setSelectWarehouse(null);
        else
            setSelectWarehouse(value);
    }


    const onChangePrice = (e) => {
        setPriceValue(e.target.value)
    }

    const onChangeMultiplicity = (e) => {
        setMultiplicityValue(e.target.value)
    }

    const drawContentLeft = () => {
        return (
            <Form>
                <Form.Group className="mb-3" >
                    <Form.Label column="sm">Продукт</Form.Label>
                    <InputGroup className="mb-3">

                        <Form.Control
                            placeholder="Выбраный продукт"
                            aria-describedby="basic-addon2"
                            readOnly
                            value={productValue}
                        />
                        <Button variant="outline-primary" id="button-addon2" onClick={(e) => { clickSelectProduct() }} >
                            Выбрать
                        </Button>
                    </InputGroup>
                </Form.Group>
                <Form.Group className="mb-3" >
                    <Form.Label column="sm">Цена</Form.Label>
                    <Form.Control size="sm" type="number" min="0.00" max="1000000.00" step="0.01" placeholder="10" onChange={onChangePrice} value={priceValue} />
                </Form.Group>

                <Form.Group className="mb-3" >
                    <Form.Label column="sm">Кратность</Form.Label>
                    <Form.Control size="sm" type="number" min="1" onChange={onChangeMultiplicity} value={multiplicityValue} />
                </Form.Group>

                <Form.Group className="mb-3" >
                    <Form.Label column="sm">Количество</Form.Label>
                    <Form.Control size="sm" type="number" min="1" max="1000000" step="1" placeholder="1" onChange={e => { setCountProduct(e.target.value) }} value={countProduct} />
                </Form.Group>

                <Form.Group className="mb-3" >
                    <Form.Label column="sm">Склад</Form.Label>
                    <Form.Select id="selectWarehouse" size="sm" aria-label="Default select example"
                        onChange={e => { onChangeWarehouse() }} >
                        {drawWarehouse()}

                    </Form.Select>

                </Form.Group>
                <Form.Group className="mb-3" >
                    <Form.Label column="sm">Коробка</Form.Label>
                    <InputGroup className="mb-3">

                        <Form.Control
                            placeholder=""
                            aria-describedby="basic-addon2"
                            readOnly
                            value={boxValue}
                        />
                        <Button variant={selectWarehouse == null ? "outline-secondary" : "outline-primary"} id="button-open-select-box-modal" onClick={(e) => { clickSelectBox() }} >
                            Выбрать
                        </Button>
                    </InputGroup>
                </Form.Group>
            </Form>)
    }


    const drawAlert = () => {

        if (product == null) {
            return (<>
                <Alert key="info" variant="info">
                    Веберите продукт.
                </Alert></>)
        }

        if (selectWarehouse == null) {
            return (<>
                <Alert key="info" variant="info">
                    Веберите склад.
                </Alert></>)
        }

        if (box == null) {
            return (<>
                <Alert key="info" variant="info">
                    Веберите коробку.
                </Alert></>)
        }

        if (priceValue == 0) {
            return (<>
                <Alert key="info" variant="info">
                    Ценник равен 0! Вы уверены?
                </Alert></>)
        }

    }

    const drawButtonAdd = () => {

        if (loadingStatus == "CREATED") {
            return (<>
                <Button variant="primary" disabled>
                    <Spinner
                        as="span"
                        animation="grow"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                    />
                    <span> Загрузка...</span>
                </Button></>)
        }

        return (<>
            <Button id="button-add-product" align="end" variant={box == null || product == null ? "secondary" : "primary"} onClick={(e) => { onAddProduct() }}>
                Добавить
            </Button>
        </>)
    }


    const drawContentRight = () => {
        return (
            <>
                <Form>
                    <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlTextarea1"
                    >
                        <Form.Label column="sm">Комментарий</Form.Label>
                        <Form.Control size="sm" as="textarea" rows={4} max={10} value={description} onInput={e => { setDescription(e.target.value) }} />
                    </Form.Group>
                    <div class="d-flex justify-content-end">

                        {drawButtonAdd()}

                    </div >
                    <br />

                    {drawAlert()}

                </Form>
            </>)
    }

    const drawLoadingState = () => {

        if (loadingStatus != "LOADING")
            return;
        return (<>
            <br />
            <Spinner animation="border" variant="primary" /> <span> Загрузка данных</span>
        </>)
    }

    return (<>
        <div className="localwarehouses-add-product-page">
            <Container>
                <SelectProductModalView showModal={showFindProductModal} setShowModal={setShowFindProductModal} onSelect={selectItem} />
                <SelectBoxModalView showModal={showFindBoxModal} setShowModal={setShowFindBoxModal}

                    warehouses={warehouses} selectWarehouse={selectWarehouse}

                    onSelect={selectBox} />

                {drawBtnBack()}
                <br />
                {drawLoadingState()}
                <br />
                <Row>
                    <Col sm={8}>{drawContentLeft()}</Col>
                    <Col sm={4}>{drawContentRight()}  </Col>
                </Row>

                <SelectProductModalView />
            </Container>
        </div>
    </>)

}