import { Alert, Button, Container, Table, Form, InputGroup, Row, Col, Spinner } from "react-bootstrap"
import { useLocalWarehousesProductsProvider } from "../../contexts/LocalWarehousesProductsProvider"
import { useEffect } from "react";
import AddNewBoxView from "./AddNewBoxView";
import AddProductView from "./AddProductView";
import { Link } from "react-router-dom";
export default function LocalWarehousesProducts() {

    const {
        loadingStatus,
        load,
        products,
        setNewBoxViewShow, setAddProductNewBoxViewShow
    } = useLocalWarehousesProductsProvider();

    useEffect(() => { load() }, []);

    const showNewBoxView = (e) => {
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


    const drawWarehouses = () => {
        // return (<>
        //     {warehouses.map(warehouse => {
        //         return <WarehouseLine warehouse={warehouse} key={warehouse.id} />
        //     })}
        // </>)
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
                        <th align="left"> <p style={{ "text-align": "left" }}>Склады</p></th>
                    </tr>
                </thead>
                <tbody>
                    {drawWarehouses()}
                </tbody>
            </Table>

        </Container>
        <AddNewBoxView />
        <AddProductView />

    </div>)



    return <div className="localwarehouses-products-page">
        <br></br>
        <Alert key='danger' variant='danger' >
            Упс! Что-то пошло не так, перезагрузите страницу
        </Alert>
    </div>
}