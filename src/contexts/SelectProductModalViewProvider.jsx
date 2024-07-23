import React, { useState } from "react";
import { GetProducts } from "../api/productsFind";

export const SelectProductModalViewContext = React.createContext({});

export const SelectProductModalViewProvider = ({ children }) => {
    const ITEMS_IN_PAGE = 10;

    const [loadingState, setLoadingState] = useState("NONE");
    const [maxPage, setMaxPage] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [itemsCount, setItemsCount] = useState(0);
    const [limit, setLimit] = useState(ITEMS_IN_PAGE);
    const [offset, setOffset] = useState(0);
    const [items, setItems] = useState([]);
    
    async function Find(data) {

        if (data.length < 3) {
            ClearData();
            setLoadingState("SUCCESS");
            return;
        }

        data = data.replaceAll("\r", " ");
        data = data.replaceAll("\n", " ");
        data = data.replaceAll("  ", " ");
        data = data.replaceAll("   ", " ");

        setLoadingState("LOADING");
        const res = await GetProducts(data, limit, offset);
        if (!res || res.status === "error") {
            ClearData();
            setLoadingState("ERROR");
            return
        }

        try {
            setItems(res.result.items)
            setItemsCount(parseInt(res.result.count))
            calculateMaxPages();
            setLoadingState("SUCCESS");
        } catch (err) {
            setLoadingState("ERROR");
        }

    }

    const ClearData = () => {
        setItems([])
        setItemsCount(0)
        calculateMaxPages();
        setLimit(ITEMS_IN_PAGE)
        setOffset(0)
        setCurrentPage(0)
    }


    async function LoadPage (data, page) {
        setOffset(page * ITEMS_IN_PAGE);
        await Find(data);
        setCurrentPage(page);
    }

    const calculateMaxPages = () => {

        var p = Math.ceil(itemsCount / ITEMS_IN_PAGE)
        if (p <= 0) p = 1;
        setMaxPage(p);
    }

    var value = {
        items, currentPage, loadingState, maxPage, LoadPage, Find, ClearData
    };

    return (<SelectProductModalViewContext.Provider value={value} >{children}</SelectProductModalViewContext.Provider>)
};



export const useSelectProductModalViewProvider = () => React.useContext(SelectProductModalViewContext);