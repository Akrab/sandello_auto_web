import React from "react";
import { useState } from "react";

import { GetOrdes } from "../api/orders";
export const OrdersContext = React.createContext({});

export const OrdersProvider = ({ children }) => {
    const [orders, setOrders] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [maxPages, setMaxPages] = useState(1);
    const [loadingStatus, setLoadingStatus] = useState("LOADING");
    const [updateStatus, setUpdateStatus] = useState("NONE");
    const [ordersInPage, setOrdersInPage] = useState(30);

    function calculateMaxPages(count) {
        setMaxPages(Math.ceil(count / ordersInPage));
    }

    async function load(limit, offset) {

        setLoadingStatus("LOADING");
        const res = await GetOrdes(limit, offset);
        if (!res || res.status === "error") return setLoadingStatus("ERROR");

        setOrders(res.result.orders || res.result);
        calculateMaxPages(res.result.count);
        setLoadingStatus("SUCCESS");
    }


    const value = {
        load,
        orders,
        maxPages,
        currentPage,
        loadingStatus,
        updateStatus,
        ordersInPage,
        setOrdersInPage
    };
    return (<OrdersContext.Provider value={value} >{children}</OrdersContext.Provider>)
}

export const useOrdersProvider = () => React.useContext(OrdersContext);