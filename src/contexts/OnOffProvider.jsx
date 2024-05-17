import React, { useEffect, useState } from "react";
import { GetHistoryPriceParse } from "../api/historyPriceParse";

export const OnOffProviderContext = React.createContext({});

export const OnOffProvider = ({ children }) => {
    const [enable, setEnable] = useState([]);


    async function load() {
        setLoadingStatus("LOADING");
       // console.log("LOADING 111");
        const res = await GetHistoryPriceParse(30, 0);
        if (!res || res.status === "error") return setLoadingStatus("ERROR");

        setHistory(res.result.history || res.result);
        setLoadingStatus("SUCCESS");
    };

    useEffect(() => { load() }, []);

    const value = {
        enable
    };

    return (<OnOffProviderContext.Provider value={value} >{children}</OnOffProviderContext.Provider>)
};

export const useOnOffProvider = () => React.useContext(OnOffProviderContext);