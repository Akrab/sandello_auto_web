
import { GetSurcharges, UpdateSurcharges } from "../api/surcharges";
import React, { useState } from "react";


export const SurchargesProviderContext = React.createContext({});

export const SurchargesProvider = ({ children }) => {
    const [surcharges, setSurcharges] = useState([]);
    const [loadingStatus, setLoadingStatus] = useState("LOADING");
    const [updateStatus, setUpdateStatus] = useState("NONE");

    const [showModal, setShowModal] = useState(false);
    const [editSurcharge, setEditSurcharge] = useState(null);

    async function load() {

        // setLoadingStatus("SUCCESS")

        // var surcharges = [{ id: 1, from: 0, to: 500, value: 300, enable: true },
        // { id: 2, from: 501, to: 1000, value: 100, enable: true },
        // { id: 3, from: 1001, to: 1500, value: 30, enable: true }];
        // setSurcharges(surcharges);

        setLoadingStatus("LOADING");
        const res = await GetSurcharges(1000, 0);

        if (!res || res.status === "error") return setLoadingStatus("ERROR");

        setSurcharges(res.result.surcharges || res.result);
        setLoadingStatus("SUCCESS");
    };


    async function update(data) {
        setUpdateStatus("SEND");
        const res = await UpdateSurcharges(data);
        if (!res || res.status === "error") return setUpdateStatus("ERROR");

        var s = surcharges;

        for (var i = 0; i < s.length; i++){
            var id = s[i].id;
            if(data[id] != null) {
         
                s[i].from = data.from;
                s[i].to = data.to;
                s[i].value = data.value;
                s[i].enable = data.enable;
                break
            }
        }
        setSurcharges(s);
        setUpdateStatus("SUCCESS");
    }

    const value = {
        loadingStatus,
        surcharges,
        load,
        updateStatus,
        setUpdateStatus,
        update,
        showModal, 
        setShowModal,
        editSurcharge, 
        setEditSurcharge
    };

    return (<SurchargesProviderContext.Provider value={value} >{children}</SurchargesProviderContext.Provider>)
};

export const useSurchargesProvider = () => React.useContext(SurchargesProviderContext);