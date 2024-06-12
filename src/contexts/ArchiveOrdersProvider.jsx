import React, { useState } from "react";
import { GetOrders } from "../api/archiveOrders";

export const ArchiveOrdersContext = React.createContext({});

export const ArchiveOrdersProvider = ({ children }) => {

    const [orders, setOrders] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [maxPages, setMaxPages] = useState(1);
    const [loadingStatus, setLoadingStatus] = useState("LOADING");
    const [updateStatus, setUpdateStatus] = useState("NONE");
    const [ordersInPage, setOrdersInPage] = useState(30);
    const [totalCountOrders, setTotalCountOrders] = useState(0);

    function calculateMaxPages() {
        setMaxPages(Math.ceil(totalCountOrders / ordersInPage));
    }

    async function testData() {
        var orders = [{
            id: 10, marketplace: "ozon", shop: "geak Auto", state: 1, postingNumber: "wegdfsft", shippingDate: 12312312312,

            products: [{
                id: 34234, state: 1, count: 1, name: "Мега ключик ключиииищеее", sku: "YATO-24323534", price: 100.45,

            }, {
                id: 34234, state: 0, count: 2, name: "ДомкраДДДД", sku: "YATO-24323534", price: 100.45,

            }]
        },
        {
            id: 2, marketplace: "ozon", shop: "geak Auto", state: 0, postingNumber: "wegdfsft", shippingDate: 12312312312,

            products: [{
                id: 34234, state: 0, count: 1, name: "Мега ключик ключиииищеее", sku: "YATO-24323534", price: 100.45,

            }]
        },
        {
            id: 3, marketplace: "ozon", shop: "geak Auto", state: 0, postingNumber: "wegdfsft", shippingDate: 12312312312,

            products: [{
                id: 34234, state: 0, count: 1, name: "Мега ключик ключиииищеее", sku: "YATO-24323534", price: 100.45,

            }]
        },
        {
            id: 4, marketplace: "ozon", shop: "geak Auto", state: 0, postingNumber: "wegdfsft", shippingDate: 12312312312,

            products: [{
                id: 34234, state: 0, count: 2, name: "Мега ключик ключиииищеее", sku: "YATO-24323534", price: 100.45,

            }]
        }];

        return {
            result: {
                orders: orders,
                count: 50
            },
            status: "ok",
        };
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

    };


    async function selectOrdersInPage(count) {

        // setOrdersInPage(count);
        // calculateMaxPages();

        // if (currentPage >= maxPages) currentPage = maxPages - 1; // set last paga

        // await load(count, currentPage * count);
    }

    const selectPage = (page) => {

        if (page >= maxPages)
            page = maxPages - 1;
        setCurrentPage(page);

        load(ordersInPage, currentPage * ordersInPage);

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
    };

    return (<ArchiveOrdersContext.Provider value={value} >{children}</ArchiveOrdersContext.Provider>)
}

export const useArchiveOrdersProvider = () => React.useContext(ArchiveOrdersContext);