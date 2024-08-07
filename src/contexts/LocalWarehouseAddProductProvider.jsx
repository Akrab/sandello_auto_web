import React, { useState } from "react";

import { LoadLocalWarehousesStruct, AddNewProduct } from "../api/localwarehouse";

import { useToastsOverlayProvider } from "./ToastsOverlayProvider";

export const LocalWarehouseAddProductContext = React.createContext({});

export const LocalWarehouseAddProductProvider = ({ children }) => {

    const [loadingStatus, setLoadingStatus] = useState("LOADING");
    const [warehouses, setWarehouses] = useState([]);

    const [warehouseNames, setWarehouseNames] = useState([])

    const { AddToast } = useToastsOverlayProvider();

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

        for (var i = 0; i < warehouses.length; i++) {
            names.push({ id: warehouses[i].id, name: warehouses[i].name });
        }
        setWarehouseNames(names);

    }

    async function AddProduct(obj, action) {
        setLoadingStatus("CREATED")

        const res = await AddNewProduct(obj);

        if (!res || res.status === "error") {
            AddToast("Добавление продукта", "Ошибка. " + res.error, "Warning");
            action(false);
        }
        AddToast("Добавление продукта", "Продукт успешно добавлен.");
        action(true);

        setLoadingStatus("SUCCESS")
    }

    const value = { loadingStatus, LoadWarehouses, warehouses, warehouseNames, AddProduct };


    return (<LocalWarehouseAddProductContext.Provider value={value} >{children}</LocalWarehouseAddProductContext.Provider>)
};

export const useLocalWarehouseAddProductProvider = () => React.useContext(LocalWarehouseAddProductContext);