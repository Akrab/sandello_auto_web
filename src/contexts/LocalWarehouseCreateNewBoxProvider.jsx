import React, { useState } from "react";
import { LoadLocalWarehousesStruct } from "../api/localwarehouse";
export const LocalWarehouseCreateNewBoxContext = React.createContext({});

export const LocalWarehouseCreateNewBoxProvider = ({ children }) => {

    const [loadingStatus, setLoadingStatus] = useState("LOADING");
    const [warehouses, setWarehouses] = useState([]);
    const [newBoxViewShow, setNewBoxViewShow] = useState(false);

    const [warehouseNames, setWarehouseNames] = useState([])

    function parseWarehouseNames() {
        var names = [];

        for (var i = 0; i <  warehouses.length; i++){
            names.push(warehouses[i].name);
        }
        setWarehouseNames(names);

    }


    async function CreateBox() {

        setLoadingStatus("SUCCESS")
    };

    async function LoadWarehousesData() {
        setLoadingStatus("LOAD")

        const res = await LoadLocalWarehousesStruct();

        if (!res || res.status === "error") return setLoadingStatus("ERROR");

        setWarehouses(res.result.warehouses);
        parseWarehouseNames()
        setLoadingStatus("LOADED")
    }


    const value = { loadingStatus, CreateBox, warehouses, newBoxViewShow, setNewBoxViewShow, warehouseNames, LoadWarehousesData };
    return (<LocalWarehouseCreateNewBoxContext.Provider value={value} >{children}</LocalWarehouseCreateNewBoxContext.Provider>)
};

export const useLocalWarehouseCreateNewBoxProvider = () => React.useContext(LocalWarehouseCreateNewBoxContext);