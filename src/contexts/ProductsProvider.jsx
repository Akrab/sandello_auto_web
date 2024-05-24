import React, { useState } from "react";

export const ProductsContext = React.createContext({});

export const ProductsProvider = ({ children }) => {


    async function loadUsedProducts(limit, offset, searchText) {

    }

    async function loadAllProducts(limit, offset, searchText) {

    }

    async function loadUsedProducts() {

    }
    async function loadAllProducts() {

    }

    const value = { loadUsedProducts, loadAllProducts };

    return (<ProductsContext.Provider value={value} >{children}</ProductsContext.Provider>)
};

export const useProductsProvider = () => React.useContext(ProductsContext);