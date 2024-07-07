import React, { useState } from "react";
import Products from "../pages/Products";

export const LocalWarehousesContext = React.createContext({});

export const LocalWarehousesProvider = ({ children }) => {

    const [loadingStatus, setLoadingStatus] = useState("LOADING");
    const [warehouses, setWarehouses] = useState([]);

    async function load() {


        setLoadingStatus("SUCCESS")

        var warehouses = [{ id: 1, name: "weqw", rooms: 1, products: 1000 },
        { id: 2, name: "weqw11", rooms: 1, products: 10010 },
        { id: 3, name: "weqw223", rooms: 1, products: 100 }];
        setWarehouses(warehouses);

        // setLoadingStatus("LOADING");
        // const res = await GetSuppliers(100, 0);
        // if (!res || res.status === "error") return setLoadingStatus("ERROR");

        // setSuppliers(res.result.suppliers || res.result);
        // setLoadingStatus("SUCCESS");
    };

    const value = { loadingStatus, load, warehouses };
    return (<LocalWarehousesContext.Provider value={value} >{children}</LocalWarehousesContext.Provider>)
};

export const useLocalWarehousesProvider = () => React.useContext(LocalWarehousesContext);