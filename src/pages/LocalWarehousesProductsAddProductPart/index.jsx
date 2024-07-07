import { Row, Spinner, Col, InputGroup, Form, ToastContainer, Toast, Alert, Button, Container } from "react-bootstrap"
import { useState, useEffect } from "react";
import SelectProductModalView from "../../components/SelectProductModalView"
import { useSelectProductModalViewProvider } from "../../contexts/SelectProductModalViewProvider";


export default function LocalWarehousesProductsAddProductPart() {

    const {
        setShowSelectProductModal
    } = useSelectProductModalViewProvider();


    useEffect(() => { setShowSelectProductModal(false) }, []);

    const drawBtnBack = () => {
        return (<>
            <br />

            <Button class="btn btn-outline-primary" href="/localwarehousesProducts" >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-backspace-fill" viewBox="0 0 16 16">
                    <path d="M15.683 3a2 2 0 0 0-2-2h-7.08a2 2 0 0 0-1.519.698L.241 7.35a1 1 0 0 0 0 1.302l4.843 5.65A2 2 0 0 0 6.603 15h7.08a2 2 0 0 0 2-2zM5.829 5.854a.5.5 0 1 1 .707-.708l2.147 2.147 2.146-2.147a.5.5 0 1 1 .707.708L9.39 8l2.146 2.146a.5.5 0 0 1-.707.708L8.683 8.707l-2.147 2.147a.5.5 0 0 1-.707-.708L7.976 8z" />
                </svg> Назад</Button>

        </>)
    }


    const clickSelectProduct = () => {
        setShowSelectProductModal(true);
    }

    const drawContentLeft = () => {
        return (
            <Form>
                <Form.Group className="mb-3" >
                    <Form.Label column="sm">Продукт</Form.Label>
                    <InputGroup className="mb-3">

                        <Form.Control
                            placeholder="Recipient's username"
                            aria-label="Recipient's username"
                            aria-describedby="basic-addon2"
                            readOnly
                            value="test"
                        />
                        <Button variant="outline-primary" id="button-addon2" onClick={(e)=>{clickSelectProduct()}} >
                            Выбрать
                        </Button>
                    </InputGroup>
                </Form.Group>
                <Form.Group className="mb-3" >
                    <Form.Label column="sm">Цена</Form.Label>
                    <Form.Control size="sm" type="text" placeholder="10" />

                </Form.Group>

                <Form.Group className="mb-3" >
                    <Form.Label column="sm">Кратность</Form.Label>
                    <Form.Control size="sm" type="number" min="1" />
                </Form.Group>

                <Form.Group className="mb-3" >
                    <Form.Label column="sm">Склад</Form.Label>
                    <Form.Select size="sm" aria-label="Default select example">
                        <option>Выберите склад(выбран склад по умолчанию)</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                    </Form.Select>

                </Form.Group>
                <Form.Group className="mb-3" >
                    <Form.Label column="sm">Ячейка</Form.Label>
                    <Form.Select size="sm" aria-label="Default select example">
                        <option>Выберите ячейку(выбрана ячейка по умолчанию)</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                        <option value="4">One</option>
                        <option value="5">Two</option>
                        <option value="6">Three</option>
                        <option value="7">One</option>
                        <option value="8">Two</option>
                        <option value="9">Three</option>
                        <option value="10">One</option>
                        <option value="11">Two</option>
                        <option value="12">Three</option>
                        <option value="13">One</option>
                        <option value="14">Two</option>
                        <option value="15">Three</option>
                        <option value="16">One</option>
                        <option value="17">Two</option>
                        <option value="117">Three</option>
                        <option value="18">One</option>
                        <option value="21">Two</option>
                        <option value="32">Three</option>

                    </Form.Select>
                </Form.Group>
            </Form>)
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
                        <Button align="end" variant="primary" type="submit">
                            Добавить
                        </Button></div>

                    <br />
                    <Alert key="info" variant="info">
                        This is a alert—check it out!
                    </Alert>
                </Form>
            </>)
    }

    return (<>
        <div className="localwarehouses-add-product-page">
            <Container>
                {drawBtnBack()}
                <br />
                <br />
                <Row>
                    <Col sm={8}>{drawContentLeft()}</Col>
                    <Col sm={4}>  {drawContentRight()}  </Col>
                </Row>

                <SelectProductModalView/>
            </Container>
        </div>
    </>)

}