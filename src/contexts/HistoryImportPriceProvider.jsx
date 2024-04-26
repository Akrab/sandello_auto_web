import React, { useEffect, useState } from "react";
import { GetHistoryPriceParse } from "../api/historyPriceParse";

export const HistoryImportPriceContext = React.createContext({});

export const HistoryImportPriceProvider = ({ children }) => {
    const [history, setHistory] = useState([]);
    const [loadingStatus, setLoadingStatus] = useState("LOADING");

    async function load() {
        setLoadingStatus("LOADING");
       // console.log("LOADING 111");
        const res = await GetHistoryPriceParse(30, 0);
        if (!res || res.status === "error") return setLoadingStatus("ERROR");

        setHistory(res.result.history || res.result);
        setLoadingStatus("SUCCESS");
    };

   // useEffect(() => { load() }, []);

    const value = {
        loadingStatus: loadingStatus,
        history: history,
    };

    return (<HistoryImportPriceContext.Provider value={value} >{children}</HistoryImportPriceContext.Provider>)
};

export const useHistoryImportPriceProvider = () => React.useContext(HistoryImportPriceContext);