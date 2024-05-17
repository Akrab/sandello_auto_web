import React, { useEffect, useState } from "react";
import { DeleteHistoryPriceParse, GetHistoryPriceParse } from "../api/historyPriceParse";

export const HistoryImportPriceContext = React.createContext({});

export const HistoryImportPriceProvider = ({ children }) => {
    const [history, setHistory] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [maxPages, setMaxPages] = useState(1);
    const [loadingStatus, setLoadingStatus] = useState("LOADING");
    const [updateStatus, setUpdateStatus] = useState("NONE");
    const [showModal, setShowModal] = useState(false);
    const [selectSlot, setSelectSlot] = useState(null);


    async function load(limit, offset) {

        setHistory([{ id: 0, uid: 100, supplierName: "2odolsk_RUB", fileName: "2024_03_19_export_Podolsk_RUB_RS62334", created: 1715911880000, updated: 1715911880000, status: 3 },
        { id: 1, uid: 110, supplierName: "Gig1", fileName: "2024_03_19_export_Podolsk_RUB_RS62334", created: 1715911880000, updated: 1715911880000, status: 5 },
        { id: 2, uid: 120, supplierName: "Gig2", fileName: "2024_03_19_export_Podolsk_RUB_RS62334", created: 1715911880000, updated: 1715911880000, status: 4 }])
        setLoadingStatus("SUCCESS");

        //     setLoadingStatus("LOADING");
        //     const res = await GetHistoryPriceParse(limit, offset);
        //     if (!res || res.status === "error") return setLoadingStatus("ERROR");

        //     setHistory(res.result.history || res.result);
        //     setMaxPages(res.result.pages);
        //     setLoadingStatus("SUCCESS");
        // };
    };

    async function deleteItem(id) {

        setUpdateStatus("SEND");
        const resDel = await DeleteHistoryPriceParse(id)
        if (!resDel || resDel.status === "error") return setUpdateStatus("ERROR");

        const res = await GetHistoryPriceParse(10, currentPage * 10);
        if (!res || res.status === "error") return setLoadingStatus("ERROR");

        setHistory(res.result.history || res.result);
        setMaxPages(res.result.pages);
        setLoadingStatus("SUCCESS");

    };

    useEffect(() => {
        setCurrentPage(0);
        setMaxPages(1);
        load(10, currentPage * 10)
    }, []);

    const value = {
        loadingStatus,
        history,
        load,
        maxPages,
        currentPage,
        setCurrentPage,
        showModal,
        setShowModal,
        selectSlot,
        setSelectSlot,
        deleteItem,
        updateStatus,
        setUpdateStatus
    };

    return (<HistoryImportPriceContext.Provider value={value} >{children}</HistoryImportPriceContext.Provider>)
};

export const useHistoryImportPriceProvider = () => React.useContext(HistoryImportPriceContext);