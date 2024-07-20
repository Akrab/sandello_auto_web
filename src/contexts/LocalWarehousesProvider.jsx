import React, { useState } from "react";
import { ListLocalWarehouse } from "../api/localwarehouse";
export const LocalWarehousesContext = React.createContext({});

export const LocalWarehousesProvider = ({ children }) => {

    const [loadingStatus, setLoadingStatus] = useState("LOADING");
    const [warehouses, setWarehouses] = useState([]);

    async function load() {

        setLoadingStatus("SUCCESS")

        const res = await ListLocalWarehouse(10, 0);
        if (!res || res.status === "error") return setLoadingStatus("ERROR");

        var warehouses = res.result.warehouses;
        // Id          int            `json:"id"`
        // Name        string         `json:"name"`
        // Description string         `json:"description"`
        // Rooms       map[int]string `json:"rooms"`
        // Items       int            `json:"items"`
        setWarehouses(warehouses);

    };

    const value = { loadingStatus, load, warehouses };
    return (<LocalWarehousesContext.Provider value={value} >{children}</LocalWarehousesContext.Provider>)
};

export const useLocalWarehousesProvider = () => React.useContext(LocalWarehousesContext);