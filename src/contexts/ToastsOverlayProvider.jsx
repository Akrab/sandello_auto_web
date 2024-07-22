import React, { useEffect, useState } from "react";
import { GetHistoryPriceParse } from "../api/historyPriceParse";

export const ToastsOverlayProviderContext = React.createContext({});

export const ToastsOverlayProvider = ({ children }) => {
    const [enable, setEnable] = useState(true);

    const [toasts, setToasts] = useState([]);
    const [lastId, setLastId] = useState(0);

    const GetId = () => {
        var id = lastId;
        setLastId(id + 1)
        return id
    }


    const AddToast = (name, description, variant) => {

        if (variant == null) {
            variant = "info";
        }

        var t = toasts;
        t.push({
            id: GetId(),
            name,
            description,
            variant
        })

        setToasts(t);
    }

    const RemoveToast = (id) => {

        var array = toasts;

        const isIndex = (element) => element.id == id;
        var index = array.findIndex(isIndex)
        if (index > -1) { // only splice array when item is found
            array.splice(index, 1); // 2nd parameter means remove one item only
        }
        setToasts(array);

    }

    const value = {
        enable, AddToast, RemoveToast, toasts, setEnable
    };

    return (<ToastsOverlayProviderContext.Provider value={value} >{children}</ToastsOverlayProviderContext.Provider>)
};

export const useToastsOverlayProvider = () => React.useContext(ToastsOverlayProviderContext);