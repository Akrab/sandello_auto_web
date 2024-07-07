import React from "react";
import { Alert, Container, Table, Row, Col } from "react-bootstrap";
import OrdersInPage from "./OrdersInPage";
import OrderLine from "./OrderLine";
import { useOrdersProvider } from "../../contexts/OrdersProvider";
import { useEffect } from "react";
import OrdersPaginator from "./OrdersPaginator";

export default function Orders() {

    const {
        load,
        orders,
        maxPages,
        currentPage,
        loadingStatus,
        updateStatus,
        ordersInPage,
        setOrdersInPage,
        selectPage } = useOrdersProvider();

    useEffect(() => { load(ordersInPage, 0) }, []);

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

        var date = new Date(unixTime);

        var month = date.toLocaleString('ru', { month: 'long' });

        var top = month + " " + ("0" + date.getDate()).slice(-2);
        var time = ("0" + date.getHours()).slice(-2) + ":" + ("0" + date.getMinutes()).slice(-2)
  
        return <><div align="center"> {top} <br /> {time} </div></>;
    }


    const drawOrders = () => {
        var items = [];


        for (var indexOrder = 0; indexOrder < orders.length; indexOrder++) {

            var order = orders[indexOrder]
            var products = order.products;
            for (var productIndex = 0; productIndex < products.length; productIndex++) {
                var product = products[productIndex]
                items.push({
                    id: order.id,
                    productId: product.id,
                    marketplace: order.marketplace,
                    shop: order.shop,
                    state: product.state,
                    shippingDate: dateToStr(order.shippingDate),
                    price: product.price,
                    name: product.name,
                    sku: product.sku,
                    count: product.count,
                    warehouseSellers: product.warehouse
                });
            }


        }

        return (<>
            {items.map(item => {
                return <OrderLine orderData={item} key={item.id} />
            })}
        </>)

    }


    if (loadingStatus === "SUCCESS") return (<main className="orders-page">

        <Container>
            {navigation()}
            <Table responsive>
                <thead>
                    <tr>
                        <th align="left" > <p style={{ "text-align": "left" }}>ID</p></th>
                        <th align="center"> <p style={{ "text-align": "center" }}>  Магазин </p></th>
                        <th align="center"> <p style={{ "text-align": "center" }}> Статус</p></th>
                        <th><p style={{ "text-align": "center" }}> Дата отгрузки </p></th>
                        <th align="center" > <p style={{ "text-align": "center" }}> Наименование</p></th>
                        <th align="center"> <p style={{ "text-align": "center" }}> Артикул</p></th>
                        <th align="center"> <p style={{ "text-align": "center" }}> Кол-во</p></th>
                        <th align="center"> <p style={{ "text-align": "center" }}> Цена за 1 шт.</p></th>
                        <th align="left"> <p style={{ "text-align": "left" }}>Поставщики</p></th>
                    </tr>
                </thead>
                <tbody>
                    {drawOrders()}
                </tbody>
            </Table>
            <br />

            <OrdersPaginator page={currentPage} setPage={selectPage} maxPages={maxPages} />
            <br />

        </Container>

    </main >)




    return <main className="orders-page">
        <br></br>
        <Alert key='danger' variant='danger' >
            Упс! Что-то пошло не так, перезагрузите страницу
        </Alert>
    </main>
}