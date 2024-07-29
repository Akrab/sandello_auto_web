import { Alert, Button, OverlayTrigger, Tooltip, Container, Table, Form, InputGroup, Row, Col, Spinner } from "react-bootstrap"
import { useLocalWarehousesProductsProvider } from "../../contexts/LocalWarehousesProductsProvider"
import { useEffect, useState } from "react";
import AddNewBoxView from "./AddNewBoxView";
import EditProduct from "./EditProduct";
import AdvancePaginator from "../../components/AdvancePaginator";

import { useLocalWarehouseCreateNewBoxProvider } from "../../contexts/LocalWarehouseCreateNewBoxProvider";

export default function LocalWarehousesProducts() {

    const {
        loadingStatus,
        Load,
        products,
        serverError, setShowEditModal, setEditSlot, LoadInfo, maxPage, currentPage, LoadPage
    } = useLocalWarehousesProductsProvider();

    const {
        LoadWarehousesData,
        setNewBoxViewShow
    } = useLocalWarehouseCreateNewBoxProvider();

    useEffect(() => {
        Load();
        setNewBoxViewShow(false);
        setShowEditModal(false);
        setEditSlot(null);
    }, []);

    const [update, setUpdate] = useState("");

    const onSetPage = (e)=>{
        setUpdate(e);
        LoadPage(e);
        setUpdate(getRandomStr());

    } 

    const getRandomStr = () => {
        return (Math.random() + 1).toString(36).substring(7);
    }

    const showNewBoxView = (e) => {
        LoadWarehousesData();
        setNewBoxViewShow(true);
    }

    const navigation = () => {
        return (<>
            <Row>
                <Col xs={5}>
                    <Form>
                        <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                            <Form.Label column sm={3}>
                                SKU/Название
                            </Form.Label>
                            <Col xs="auto">
                                <Form.Control type="text" placeholder="Введите для поиска" />
                            </Col>
                        </Form.Group>
                    </Form>

                </Col>
                <Col xs={3}></Col>
                <Col>       <Form>
                    <Row className="align-items-end">

                        <Col xs="auto">
                            <Button href="/localwarehousesProducts/addProduct" className="mb-2">
                                Добавить Товар
                            </Button>
                        </Col>

                        <Col xs="auto">
                            <Button onClick={showNewBoxView} className="mb-2">
                                Создать ячейку
                            </Button>
                        </Col>
                    </Row>
                </Form></Col>
            </Row>
        </>)
    }

    const onClickEditSlot = (slot) => {
        setEditSlot(slot);
        setShowEditModal(slot);
        LoadInfo(slot.boxProduct.id);
    }


    const drawProducts = () => {

        return (<>
            {products.map(item => {
                return (<>
                    <tr >
                        <td style={{ "word-break": "break-all", "width": "10%" }} align="left">

                            <OverlayTrigger
                                key={item.id}
                                placement="auto"

                                overlay={
                                    <Tooltip id={"tooltip"} >
                                        <strong>{item.boxProduct.description ?? "Нет описания"}</strong>
                                    </Tooltip>
                                }
                            >
                                <td >    {item.boxProduct.id}    </td >
                            </OverlayTrigger>

                        </td >
                        <td style={{ "word-break": "break-all", "width": "23%" }} align="center">{item.product.sku}</td>
                        <td style={{ "word-break": "break-word", "width": "23%" }} align="center">

                            <OverlayTrigger
                                key={item.id}
                                placement="auto"

                                overlay={
                                    <Tooltip id={"tooltip"} >
                                        <strong>{item.product.name}</strong>
                                    </Tooltip>
                                }
                            >
                                <td > {item.product.name.length > 20 ? item.product.name.substring(0, 20) + "..." : item.product.name}</td>
                            </OverlayTrigger>

                        </td>
                        <td style={{ "width": "7%" }} align="center">{item.boxProduct.count}</td>
                        <td style={{ "width": "7%" }} align="center">{item.boxProduct.price} ₽</td>
                        <td align="center">{item.warehouse.name}</td>
                        <td style={{ "width": "13%" }} align="center">

                            <OverlayTrigger
                                key={item.id}
                                placement="auto"

                                overlay={
                                    <Tooltip id={"tooltip"} >
                                        <strong>Помещение: {item.room.name}<br />Стеллаж: {item.rack.name}<br />Полка: {item.shelf.name}
                                            <br />Коробка: {item.box.name}</strong>
                                    </Tooltip>
                                }
                            >
                                <td >  {item.room.name}:{item.rack.name}:{item.shelf.name}:{item.box.name}</td>
                            </OverlayTrigger>

                        </td>
                        <td style={{ "width": "1%" }} align="left">
                            <Button id="button-add-product" align="end" variant="success" onClick={e => { onClickEditSlot(item); }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16">
                                    <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.5.5 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11z" />
                                </svg>
                            </Button></td>
                    </tr >
                </>)
            })}
        </>)
    }


    const drawLoad = () => {
        return (
            <div className="localwarehouses-products-page">
                <br></br>

                <Container>
                    <div align="center">
                        <h2 className="text-center">Загрузка  </h2><Spinner animation="border" variant="info" align="center" />
                    </div>

                </Container>

            </div>
        )
    }



    if (loadingStatus === "LOADING") return drawLoad();


    if (loadingStatus === "SUCCESS") return (<div className="localwarehouses-products-page">
        <Container>
            <br></br>
            {navigation()}
            <br></br>
            <Table responsive="sm">
                <thead>
                    <tr >
                        <th align="left" > <p style={{ "text-align": "left" }}>ID</p></th>
                        <th align="center"> <p style={{ "text-align": "center" }}>SKU </p></th>
                        <th align="center"> <p style={{ "text-align": "center" }}>Наименование</p></th>
                        <th align="center"> <p style={{ "text-align": "center" }}>Кол-во</p></th>
                        <th align="center"> <p style={{ "text-align": "center" }}>Цена</p></th>
                        <th align="left"> <p style={{ "text-align": "center" }}>Склад</p></th>
                        <th align="left"> <p style={{ "text-align": "center" }}>Коробка</p></th>
                        <th> </th>
                    </tr>
                </thead>
                <tbody>
                    {drawProducts()}
                </tbody>
            </Table>

            <EditProduct onUpdate = {setUpdate} />
            <AdvancePaginator  page = {currentPage} setPage = {onSetPage} maxPages = {maxPage} />
            
        </Container>
        <AddNewBoxView />

    </div>)

    const drawServerError = () => {
        if (serverError == null || serverError == "") return
        <div className="localwarehouses-products-page">
            <br></br>
            <Alert key='danger' variant='danger' >
                {serverError}
            </Alert>
        </div>
    }

    return <div className="localwarehouses-products-page">
        <br></br>
        <Alert key='danger' variant='danger' >
            Упс! Что-то пошло не так, перезагрузите страницу
        </Alert>

    </div>
}