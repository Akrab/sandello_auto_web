import React, { useState } from "react";
import Products from "../pages/Products";

export const LocalWarehousesProductsContext = React.createContext({});

export const LocalWarehousesProductsProvider = ({ children }) => {

    const [loadingStatus, setLoadingStatus] = useState("LOADING");
    const [products, setProsucts] = useState([]);
    const [newBoxViewShow, setNewBoxViewShow] = useState(false);
    const [addProductViewShow, setAddProductNewBoxViewShow] = useState(false);

    async function load() {

        setNewBoxViewShow(false);
        setLoadingStatus("SUCCESS")

        // var warehouses = [{ id: 1, name: "weqw", rooms: 1, products: 1000 },
        // { id: 2, name: "weqw11", rooms: 1, products: 10010 },
        // { id: 3, name: "weqw223", rooms: 1, products: 100 }];
        // setWarehouses(warehouses);

        // setLoadingStatus("LOADING");
        // const res = await GetSuppliers(100, 0);
        // if (!res || res.status === "error") return setLoadingStatus("ERROR");

        // setSuppliers(res.result.suppliers || res.result);
        // setLoadingStatus("SUCCESS");
    };

    const value = { loadingStatus, load, products, newBoxViewShow, setNewBoxViewShow,  addProductViewShow,  setAddProductNewBoxViewShow };
    return (<LocalWarehousesProductsContext.Provider value={value} >{children}</LocalWarehousesProductsContext.Provider>)
};

export const useLocalWarehousesProductsProvider= () => React.useContext(LocalWarehousesProductsContext);