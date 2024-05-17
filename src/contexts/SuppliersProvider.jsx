import React, { useEffect, useState } from "react";
import { GetSuppliers, UpdateSupplier } from "../api/suppliers";

export const SuppliersProviderContext = React.createContext({});

export const SuppliersProvider = ({ children }) => {
    const [suppliers, setSuppliers] = useState([]);
    const [loadingStatus, setLoadingStatus] = useState("LOADING");
    const [updateStatus, setUpdateStatus] = useState("NONE");

    async function load() {


        // setLoadingStatus("SUCCESS")
   
        // var suppliers = [{ id: 1, name_supplier: "weqw", email: "wedf", description : "", enable: false },
        // { id: 2, name_supplier: "222", email: "wesdcvdf", description : "", enable: false },
        // { id: 3, name_supplier: "333", email: "wesadfsfsdfdf", description : "", enable: false }];
        // setSuppliers(suppliers);

        setLoadingStatus("LOADING");
        const res = await GetSuppliers(100, 0);
        if (!res || res.status === "error") return setLoadingStatus("ERROR");

        setSuppliers(res.result.suppliers || res.result);
        setLoadingStatus("SUCCESS");
    };

    async function update(data) {
        setUpdateStatus("SEND");
        const res = await UpdateSupplier(data);
        if (!res || res.status === "error") return setUpdateStatus("ERROR");


        var s = suppliers;

        for (var i = 0; i < s.length; i++){
            var id = s[i].id;
            if(data[id] != null) {
                s[i].enable = data[id];
            }
        }
        setSuppliers(s);
        setUpdateStatus("SUCCESS");
    }


    const value = {
        loadingStatus,
        suppliers,
        load,
        updateStatus,
        setUpdateStatus,
        update

    };

    return (<SuppliersProviderContext.Provider value={value} >{children}</SuppliersProviderContext.Provider>)
};

export const useSuppliersProvider = () => React.useContext(SuppliersProviderContext);