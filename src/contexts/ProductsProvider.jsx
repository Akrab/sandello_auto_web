import React, { useState } from "react";
import { GetAllProductsByFilter } from "../api/products";
export const ProductsContext = React.createContext({});

export const ProductsProvider = ({ children }) => {

    const ITEMS_IN_PAGE = 30;

    const [products, setProducts] = useState([]);
    const [loadingStatus, setLoadingStatus] = useState("SUCCESS");

    const [currentPage, setCurentPage] = useState(0);
    const [maxPage, setMaxPage] = useState(1);
    const [totalCount, setTotalCount] = useState(0);


    const calculateMaxPages = () => {
        setMaxPage(Math.max(1, Math.ceil(totalCount / ITEMS_IN_PAGE)));
    }

    async function loadUsedProducts(limit, offset, searchText) {

    }

    async function allProducts(limit, offset, searchSkuOrBrand, searchName) {


        // setProducts([{

        //     "id": 125278,
        //     "brandName": {
        //         "id": 58,
        //         "name": "KYB"
        //     },
        //     "vendor_code": "441040",
        //     "product_name": "Амортизатор подвески задн AUDI: 100 82-91, 100 Avant 82-90, 200 83-91, 200 Avant 85-91",
        //     "applicability": "Амортизатор подвески задн AUDI: 100 82-91, 100 Avant 82-90, 200 83-91, 200 Avant 85-91",
        //     "barcode": "000441",
        //     "pictures": {
        //         "id": 125278,
        //         "url": ""
        //     },
        //     "metaProducts": {
        //         "id": 125278,
        //         "weight": -1000,
        //         "volume": -1000
        //     },
        //     "sku": "KYB-441040"

        // }, {
        //     "id": 125288,
        //     "brandName": {
        //         "id": 58,
        //         "name": "KYB"
        //     },
        //     "vendor_code": "443246",
        //     "product_name": "Амортизатор подвески задн VW: PASSAT 88-96, PASSAT Variant 88-97",
        //     "applicability": "Амортизатор подвески задн VW: PASSAT 88-96, PASSAT Variant 88-97",
        //     "barcode": "000480",
        //     "pictures": {
        //         "id": 125288,
        //         "url": ""
        //     },
        //     "metaProducts": {
        //         "id": 125288,
        //         "weight": -1000,
        //         "volume": -1000
        //     },
        //     "sku": "KYB-443246"
        // }])

        // setTotalCount(10);
        // calculateMaxPages();
        // setLoadingStatus("SUCCESS");

        setLoadingStatus("LOADING");
        return;
        var obj = {
            limit, offset, filter: { search: searchSkuOrBrand, searchName }
        }

        var res = await GetAllProductsByFilter(obj);
        if (!res || res.status === "error") return setLoadingStatus("ERROR");

        setProducts(res.result.products);
        setTotalCount(res.result.count);
        calculateMaxPages();
        setLoadingStatus("SUCCESS");

    }

    async function loadUsedProducts() {


    }
    async function LoadByData(searchSkuOrBrand, searchName, newPage, callback) {
        
        newPage = parseInt(newPage)
        await allProducts(ITEMS_IN_PAGE, ITEMS_IN_PAGE * newPage, searchSkuOrBrand, searchName);

        if(newPage > maxPage) 
            newPage = maxPage;
        setCurentPage(newPage);
        callback();
    }

    async function LoadAllProducts(searchSkuOrBrand, searchName) {
        await allProducts(ITEMS_IN_PAGE, ITEMS_IN_PAGE * currentPage, searchSkuOrBrand, searchName);
    }

    const value = { loadUsedProducts, LoadAllProducts, LoadByData, products, loadingStatus, currentPage, maxPage, totalCount };

    return (<ProductsContext.Provider value={value} >{children}</ProductsContext.Provider>)
};

export const useProductsProvider = () => React.useContext(ProductsContext);