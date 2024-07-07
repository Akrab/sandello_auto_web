import React, { useState } from "react";

export const SelectProductModalViewContext = React.createContext({});

export const SelectProductModalViewProvider = ({ children }) => {

    const [showSelectProductModal, setShowSelectProductModal] = useState(false);

    const value = {
        showSelectProductModal, 
        setShowSelectProductModal
    };

    return (<SelectProductModalViewContext.Provider value={value} >{children}</SelectProductModalViewContext.Provider>)
};



export const useSelectProductModalViewProvider = () => React.useContext(SelectProductModalViewContext);