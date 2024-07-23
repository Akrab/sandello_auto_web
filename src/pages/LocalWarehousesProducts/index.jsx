import { Alert, Button, Container, Table, Form, InputGroup, Row, Col, Spinner } from "react-bootstrap"
import { useLocalWarehousesProductsProvider } from "../../contexts/LocalWarehousesProductsProvider"
import { useEffect } from "react";
import AddNewBoxView from "./AddNewBoxView";

import { Link } from "react-router-dom";
import { useLocalWarehouseCreateNewBoxProvider } from "../../contexts/LocalWarehouseCreateNewBoxProvider";
export default function LocalWarehousesProducts() {

    const {
        loadingStatus,
        load,
        products,
    } = useLocalWarehousesProductsProvider();

    const {
        LoadWarehousesData,
        setNewBoxViewShow
    } = useLocalWarehouseCreateNewBoxProvider();

    useEffect(() => {
        load();
        setNewBoxViewShow(false);
    }, []);

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

    const drawWarehouseSellers = (warehouses) => {
        return (<>
            {warehouses.map(item => {
                if (item.count <= 0)
                    return <>    <span class="text-black-50"> {item.name + " " + " x" + item.count}</span> <br /> </>
                return <>   <span class="text-success">{item.name + " " + " x" + item.count}</span><br /> </>
            })}
        </>)
    }


    const drawProducts = () => {


        var products = [
            {
                id: 1, sku: "YATO-3124432", name: "Трещетка", count: 10, warehouses: [
                    { name: "Главный", count: 9 }, { name: "Удаленный", count: 1 }
                ]
            },
            {
                id: 1, sku: "ВАЗ-312", name: "ШРУС", count: 1, warehouses: [
                    { name: "Удаленный", count: 1 }
                ]
            },
            {
                id: 1, sku: "YATO-3124432", name: "Трещетка", count: 10, warehouses: [
                    { name: "Главный", count: 9 }, { name: "Удаленный", count: 1 }
                ]
            }
        ];

        return (<>
            {products.map(product => {
                return (<>
                    <tr>
                        <td align="left"> {product.id}</td>
                        <td align="center">{product.sku}</td>
                        <td style={{ "word-break": "break-all", "width": "15%" }} align="center">{product.name}</td>
                        <td align="center">{product.count}</td>
                        <td align="center">123</td>
                        <td align="center">Удаленный</td>
                        <td align="center">А:1:Большая коробка</td>
                        <td style={{ "width": "1%" }} align="left">
                            <Button id="button-add-product" align="end" variant="primary">
                                Редактировать
                            </Button></td>
                    </tr>
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
                    <tr>
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

        </Container>
        <AddNewBoxView />

    </div>)



    return <div className="localwarehouses-products-page">
        <br></br>
        <Alert key='danger' variant='danger' >
            Упс! Что-то пошло не так, перезагрузите страницу
        </Alert>
    </div>
}