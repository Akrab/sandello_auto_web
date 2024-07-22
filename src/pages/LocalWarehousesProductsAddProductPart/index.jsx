import { Row, Spinner, Col, InputGroup, Form, ToastContainer, Toast, Alert, Button, Container } from "react-bootstrap"
import { useState, useEffect } from "react";
import SelectProductModalView from "../../components/SelectProductModalView"
import { useSelectProductModalViewProvider } from "../../contexts/SelectProductModalViewProvider";
import SelectBoxModalView from "../../components/SelectBoxModalView";

import { useLocalWarehouseAddProductProvider } from "../../contexts/LocalWarehouseAddProductProvider";

export default function LocalWarehousesProductsAddProductPart() {

    var {
        LoadWarehouses, warehouses, loadingStatus
    } = useLocalWarehouseAddProductProvider();

    const [showFindProductModal, setShowFindProductModal] = useState(false)
    const [showFindBoxModal, setShowFindBoxModal] = useState(false)

    const [product, setProduct] = useState(null)
    const [productValue, setProductValue] = useState("")
    const [box, setBox] = useState(null)
    const [boxValue, setBoxValue] = useState("")
    const [selectWarehouse, setSelectWarehouse] = useState(null)
    const [priceValue, setPriceValue] = useState(0)
    const [multiplicityValue, setMultiplicityValue] = useState(1)
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
        setShowFindBoxModal(true);
    }

    function selectBox(E) {
        setBox(E)
        setBoxValue("[" + E.name + "]");
    }

    const drawWarehouse = () => {

        return (<>
            <option value='-1'>Выберите склад(выбран склад по умолчанию)</option>
            {warehouses.map(item => {
                return <option value={item.id}>{item.name}</option>
            })}
        </>)

    }

    const onChangeWarehouse = () => {
        var obj = document.getElementById('selectWarehouse')
        var value = parseInt(obj.value);
        if (value == null)
            setSelectWarehouse(null);
        else
            setSelectWarehouse(value);
    }

    const onChangePrice = (e) => {
        setPriceValue(e.value)
    }

    const onChangeMultiplicity = (e) => {
        
        setMultiplicityValue(e.value)
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
                    <Form.Control size="sm" type="text" placeholder="10" onChange={onChangePrice} value={priceValue} />

                </Form.Group>

                <Form.Group className="mb-3" >
                    <Form.Label column="sm">Кратность</Form.Label>
                    <Form.Control size="sm" type="number" min="1" onChange={onChangeMultiplicity} value={multiplicityValue} />
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
                        <Form.Control size="sm" as="textarea" rows={4} max={10} />
                    </Form.Group>
                    <div class="d-flex justify-content-end">
                        <Button id="button-add-product" align="end" variant={box == null || product == null ? "secondary" : "primary"} >
                            Добавить
                        </Button></div>

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