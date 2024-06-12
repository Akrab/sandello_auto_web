import React from "react";
import { useState } from "react";

import { GetOrders, AcceptTheOrderProdectToProcess } from "../api/orders";
export const OrdersContext = React.createContext({});

export const OrdersProvider = ({ children }) => {
    const [orders, setOrders] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [maxPages, setMaxPages] = useState(1);
    const [loadingStatus, setLoadingStatus] = useState("LOADING");
    const [updateStatus, setUpdateStatus] = useState("NONE");
    const [ordersInPage, setOrdersInPage] = useState(30);
    const [acceptProcessOrder, setAcceptProcessOrder] = useState({})
    const [totalCountOrders, setTotalCountOrders] = useState(0);
    function calculateMaxPages() {
        setMaxPages(Math.ceil(totalCountOrders / ordersInPage));
    }

    async function acceptTheOrderToProcess(data) {

        var obj = acceptProcessOrder;

        var ordData = obj[data.id];
        if (ordData == null) {
            ordData = {}
        }
        ordData[data.productId] = true;
        obj[data.id] = ordData;
        setAcceptProcessOrder(obj)

        const res = await AcceptTheOrderProdectToProcess(data);

        if (res != null && res.status != "error") {
            var newOrders = orders;
            for (var i = 0; i < newOrders.length; i++) {
                if (newOrders[i].id == data.id) {
                    newOrders[i] = res.result.orders || res.result;
                    break
                }
            }

            setOrders(newOrders);
        }



        deleteOrderToProcess(data);

    }

    function deleteOrderToProcess(data) {
        var obj = acceptProcessOrder;

        var ordData = obj[data.id];
        if (ordData == null) {
            return
        }

        delete ordData[data.productId];

        var count = 0;
        for (var k in ordData) {
            count++
        }
        if (count == 0) delete obj[data.id]

        setAcceptProcessOrder(obj)
        return

    }

    async function testData() {
        var orders = [{
            id: 10, marketplace: "ozon", shop: "geak Auto", state: 1, postingNumber: "wegdfsft", shippingDate: 12312312312,

            products: [{
                id: 34234, state: 1, count: 1, name: "Мега ключик ключиииищеее", sku: "YATO-24323534", price: 100.45,
                warehouse: [{ id: 123, name: "Forum Auto+", price: 50, count: 1 }, { id: 123, name: "Forum Auto+", price: 10, count: 0 },
                { id: 123, name: "Forum Auto+", price: 80, count: 100 }]
            }, {
                id: 34234, state: 0, count: 2, name: "ДомкраДДДД", sku: "YATO-24323534", price: 100.45,
                warehouse: [{ id: 123, name: "Forum Auto+", price: 50, count: 1 }, { id: 123, name: "Forum Auto+", price: 10, count: 0 },
                { id: 123, name: "Forum Auto+", price: 80, count: 100 }]
            }]
        },
        {
            id: 2, marketplace: "ozon", shop: "geak Auto", state: 0, postingNumber: "wegdfsft", shippingDate: 12312312312,

            products: [{
                id: 34234, state: 0, count: 1, name: "Мега ключик ключиииищеее", sku: "YATO-24323534", price: 100.45,
                warehouse: [{ id: 123, name: "Forum Auto+", price: 50, count: 1 }, { id: 123, name: "Forum Auto+", price: 10, count: 0 },
                { id: 123, name: "Forum Auto+", price: 80, count: 100 }]
            }]
        },
        {
            id: 3, marketplace: "ozon", shop: "geak Auto", state: 0, postingNumber: "wegdfsft", shippingDate: 12312312312,

            products: [{
                id: 34234, state: 0, count: 1, name: "Мега ключик ключиииищеее", sku: "YATO-24323534", price: 100.45,
                warehouse: [{ id: 123, name: "Forum Auto+", price: 50, count: 1 }, { id: 123, name: "Forum Auto+", price: 10, count: 0 },
                { id: 123, name: "Forum Auto+", price: 80, count: 100 }]
            }]
        },
        {
            id: 4, marketplace: "ozon", shop: "geak Auto", state: 0, postingNumber: "wegdfsft", shippingDate: 12312312312,

            products: [{
                id: 34234, state: 0, count: 2, name: "Мега ключик ключиииищеее", sku: "YATO-24323534", price: 100.45,
                warehouse: [{ id: 123, name: "Forum Auto+", price: 50, count: 1 }, { id: 123, name: "Forum Auto+", price: 10, count: 0 },
                { id: 123, name: "Forum Auto+", price: 80, count: 100 }]
            }]
        }];

        return {
            result : {
                orders : orders,
                count : 50
            },
            status : "ok",
        } ;
    }

    async function load(limit, offset) {


        setLoadingStatus("LOADING");
        const res = await GetOrders(limit, offset);
        //const res = await testData();
        if (!res || res.status === "error") return setLoadingStatus("ERROR");

        setOrders(res.result.orders || res.result);
        setTotalCountOrders(res.result.count);
        calculateMaxPages();
        setLoadingStatus("SUCCESS");
    }

    const selectPage = (page) => {

        if (page >= maxPages)
            page = maxPages - 1;
        setCurrentPage(page);

        load(ordersInPage, currentPage * ordersInPage);

    }

    async function selectOrdersInPage(count) {

        setOrdersInPage(count);
        calculateMaxPages();

        if (currentPage >= maxPages) currentPage = maxPages - 1; // set last paga

        await load(count, currentPage * count);
    }


    const value = {
        load,
        orders,
        maxPages,
        currentPage,
        loadingStatus,
        updateStatus,
        ordersInPage,
        selectPage,
        selectOrdersInPage,
        acceptTheOrderToProcess,
        acceptProcessOrder,
    };
    return (<OrdersContext.Provider value={value} >{children}</OrdersContext.Provider>)
}

export const useOrdersProvider = () => React.useContext(OrdersContext);