import React, { useState, createContext } from "react";


export const SetBrandsContext = createContext();

export const SetBrandsProvider = ({ children }) => {

    const [brands, setBrands] = useState({})
    return (<SetBrandsProvider.Provider value={[brands, setBrands]} >{children}</SetBrandsProvider.Provider>)
}
