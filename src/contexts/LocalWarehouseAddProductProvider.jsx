import React, { useState } from "react";

import { LoadLocalWarehousesStruct } from "../api/localwarehouse";

export const LocalWarehouseAddProductContext = React.createContext({});

export const LocalWarehouseAddProductProvider = ({ children }) => {

    const [loadingStatus, setLoadingStatus] = useState("LOADING");
    const [warehouses, setWarehouses] = useState([]);

    const [warehouseNames, setWarehouseNames] = useState([])
    async function LoadWarehouses() {

        setLoadingStatus("LOADING")

        const res = await LoadLocalWarehousesStruct();

        if (!res || res.status === "error") return setLoadingStatus("ERROR");

        setWarehouses(res.result.warehouses);
        parseWarehouseNames()
        setLoadingStatus("SUCCESS")
    };

    function parseWarehouseNames() {
        var names = [];

        for (var i = 0; i <  warehouses.length; i++){
            names.push( {id : warehouses[i].id, name :warehouses[i].name });
        }
        setWarehouseNames(names);

    }

    const value = { loadingStatus, LoadWarehouses, warehouses, warehouseNames };


    return (<LocalWarehouseAddProductContext.Provider value={value} >{children}</LocalWarehouseAddProductContext.Provider>)
};

export const useLocalWarehouseAddProductProvider = () => React.useContext(LocalWarehouseAddProductContext);