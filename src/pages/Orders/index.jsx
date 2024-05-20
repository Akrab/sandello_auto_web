import React from "react";
import { Alert, Container, Table, Row, Col, FormGroup } from "react-bootstrap";

export default function Orders() {


    let loadingStatus = "SUCCESS"


    const navigation = () => {
        return (<>
            <br />
            <Row>
                <Col>Маркетплейс</Col>
                <Col>Магазин</Col>
                <Col>Дата отгрузки</Col>
                <Col>Статус</Col>
                <Col>Поиск</Col>
                <Col>Товаров на странице</Col>
            </Row>
            <br></br></>)
    }



    if (loadingStatus === "SUCCESS") return (<main className="orders-page">

        <Container>
            {navigation()}
            <Table responsive="sm">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Название</th>
                        <th>e-mail</th>
                        <th>Описание</th>
                        <th>Статус(вкл/выкл)</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {/* {drawSuppliers()} */}
                </tbody>
            </Table>
            <br />
            {/* {renderButtonSave()}
            {renderSuccess()}
            {renderAlertUpdate()} */}
            <br />

        </Container>

    </main>)




    return <main className="orders-page">
        <br></br>
        <Alert key='danger' variant='danger' >
            Упс! Что-то пошло не так, перезагрузите страницу
        </Alert>
    </main>
}