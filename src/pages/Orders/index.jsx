import React from "react";
import { Alert, Container, Table, Row, Col } from "react-bootstrap";
import OrdersInPage from "./OrdersInPage";
import OrderLine from "./OrderLine";
import { useOrdersProvider } from "../../contexts/OrdersProvider";
import { useEffect } from "react";

export default function Orders() {

    const {
        load,
        orders,
        maxPages,
        currentPage,
        loadingStatus,
        updateStatus,
        ordersInPage,
        setOrdersInPage } = useOrdersProvider();

    useEffect(() => { load( ordersInPage, 0) }, []);

    const navigation = () => {
        return (<>
            <br />
            <Row>
                <Col>Маркетплейс</Col>
                <Col>Магазин</Col>
                <Col>Дата отгрузки </Col>
                <Col>Статус</Col>
                <Col>Поиск</Col>
                <Col>Товаров на странице<OrdersInPage /> </Col>
            </Row>

            <br></br></>)
    }

    const dateToStr = (unixTime) => {
        return new Date(unixTime).toLocaleString("ru-RU")
    }

    
    const drawOrders = () => {
        var items = [];


        for ( var indexOrder = 0; indexOrder < orders.length; indexOrder++) {

            var order = orders[indexOrder]
            var products =  order.products;
            for ( var productIndex = 0; productIndex < products.length; productIndex++) {
                var product = products[productIndex]
                items.push({
                    id : order.id, 
                    marketplace : order.marketplace,
                    shop :"Склад А",
                    state : product.state,
                    shipping_date: dateToStr(order.shippingDate),
                    price : product.price,
                    name : product.name,
                    sku : product.sku,
                    count : product.count,
                    warehouseSellers: product.warehouse
                });
            }

     
        }

        return (<>
            {items.map(item => {
                return <OrderLine orderData={item} key={item.id}/>
            })}
        </>)

    }


    if (loadingStatus === "SUCCESS") return (<main className="orders-page">

        <Container>
            {navigation()}
            <Table responsive>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Магазин</th>
                        <th>Статус</th>
                        <th>Дата отгрузки</th>
                        <th>Наименование</th>
                        <th>Артикул</th>
                        <th>Кол-во</th>
                        <th>Цена за 1 шт.</th>
                        <th>Поставщики</th>
                    </tr>
                </thead>
                <tbody>
                    {drawOrders()}
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