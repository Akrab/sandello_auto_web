import React, { useEffect, useState } from "react";
import { GetBrandNames, UpdateBrandName  } from "../api/brands";

export const BrandsContext = React.createContext({});

export const BrandImportProvider = ({ children }) => {


    const [brands, setBrands] = useState([]);
    const [loadingStatus, setLoadingStatus] = useState("LOADING");
    
    const value = {
        loadingStatus: loadingStatus,
        brands: brands,
    };

    async function load() {
        setLoadingStatus("LOADING");

        const res = await GetBrandNames(100, 0);
        if (!res || res.status === "error") return setLoadingStatus("ERROR");

        setBrands(res.result.brands || res.result);
        setLoadingStatus("SUCCESS");
    };

    useEffect(() => { load() }, []);


    return (<BrandsContext.Provider value={value} >{children}</BrandsContext.Provider>)
}

export const useBrandImportProvider = () => React.useContext(BrandsContext);