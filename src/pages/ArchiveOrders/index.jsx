
import { Alert } from "react-bootstrap"
import { useArchiveOrdersProvider } from "../../contexts/ArchiveOrdersProvider";
import { useEffect } from "react";
import {Container, Table} from "react-bootstrap";
import OrdersPaginator from "./OrdersPaginator";
import OrderLine from "./OrderLine";
export default function ArchiveOrders() {

    const {
        load,
        orders,
        maxPages,
        currentPage,
        loadingStatus,
        selectPage,

    } = useArchiveOrdersProvider();

    useEffect(() => { load(50, 0) }, []);


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
                });
            }


        }

        return (<>
            {items.map(item => {
                return <OrderLine orderData={item} key={item.id} />
            })}
        </>)

    }
    
    if (loadingStatus === "SUCCESS") return (<main className="archive-orders-page">

        <Container>
            <br/>
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



    return <div className="archive-orders-page">
        <br></br>
        <Alert key='danger' variant='danger' >
            Упс! Что-то пошло не так, перезагрузите страницу
        </Alert>
    </div>

}
