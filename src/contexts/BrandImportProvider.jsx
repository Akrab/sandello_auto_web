import React, {useState } from "react";
import { GetBrandNames, UpdateBrandName } from "../api/brands";

export const BrandsContext = React.createContext({});

export const BrandImportProvider = ({ children }) => {


    const [brands, setBrands] = useState([]);
    const [loadingStatus, setLoadingStatus] = useState("LOADING");
    const [updateStatus, setUpdateStatus] = useState("NONE");

    async function load() {

        // setLoadingStatus("SUCCESS")
   
        // var brands = [{ id: 1, title: "weqw", id_switch: "wedf", enable: false },
        // { id: 2, title: "asd", id_switch: "wedfs", enable: true }];
        // setBrands(brands);
        setLoadingStatus("LOADING");

        const res = await GetBrandNames(1000, 0);
        if (!res || res.status === "error") return setLoadingStatus("ERROR");

        setBrands(res.result.brands || res.result);
        setLoadingStatus("SUCCESS");
    };

    async function update(data) {
        setUpdateStatus("SEND");
        const res =  await UpdateBrandName(data);
        if (!res || res.status === "error") return setUpdateStatus("ERROR");
        setBrands(res.result.brands || res.result);
        setUpdateStatus("SUCCESS");
    }

    const value = {
        loadingStatus,
        brands,
        load,
        updateStatus,
        update,
        setUpdateStatus,

    };

    return (<BrandsContext.Provider value={value} >{children}</BrandsContext.Provider>)
}

export const useBrandImportProvider = () => React.useContext(BrandsContext);