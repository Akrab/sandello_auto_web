import React, { useState } from "react";
import { GetProducts } from "../api/productsFind";

export const SelectProductModalViewContext = React.createContext({});

export const SelectProductModalViewProvider = ({ children }) => {
    const ITEMS_IN_PAGE = 10;

    const [loadingState, setLoadingState] = useState("NONE");
    const [maxPage, setMaxPage] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [itemsCount, setItemsCount] = useState(0);
    const [limit, setLimit] = useState(10);
    const [offset, setOffset] = useState(0);
    const [items, setItems] = useState([]);
    

    async function Find(data) {

        if (data.length < 3) {
            ClearData();
            setLoadingState("SUCCESS");
            return;
        }


        // setItems([{
        //     id: 0, sku: "CLEANFILTERS-MA435", vendor_code: "MA435", brandName: { id: 0, name: "CLEAN FILTERS" }, product_name: "Фильтр воздушный AUDI: 100 77-82, 100 82-90, 200 79-82, 200 83-91, LADA: 110 95-, 111 95-, 112 95-, KALINA хечбэк 04-, KALINA седан 04-, NIVA II 02-, SEAT: TERR"
        // }, {
        //     id: 1, sku: "CLEANFILTERS-MA435", vendor_code: "MA435", brandName: { id: 0, name: "CLEAN FILTERS" }, product_name: "Фильтр воздушный AUDI: 100 77-82, 100 82-90, 200 79-82, 200 83-91, LADA: 110 95-, 111 95-, 112 95-, KALINA хечбэк 04-, KALINA седан 04-, NIVA II 02-, SEAT: TERR"
        // }, { id: 2, sku: "CLEANFILTERS-MA435", vendor_code: "MA435", brandName: { id: 0, name: "CLEAN FILTERS" }, product_name: "Фильтр воздушный AUDI: 100 77-82, 100 82-90, 200 79-82, 200 83-91, LADA: 110 95-, 111 95-, 112 95-, KALINA хечбэк 04-, KALINA седан 04-, NIVA II 02-, SEAT: TERR" }]);

        // setItemsCount(parseInt(3))
        // calculateMaxPages();
        // setLoadingState("SUCCESS");
        // return;
        //fuck
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
        setLimit(10)
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