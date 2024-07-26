import React, { useState } from "react";

import { ListProducts, ProductBoxInfo, UpdateBoxProductData } from "../api/localwarehouse";
import { useToastsOverlayProvider } from "./ToastsOverlayProvider";

export const LocalWarehousesProductsContext = React.createContext({});

export const LocalWarehousesProductsProvider = ({ children }) => {

    const COUTN_ITEMS_IN_PAGE = 20;
    const [loadingStatus, setLoadingStatus] = useState("LOADING");
    const [loadingSlotInfoStatus, setLoadingSlotInfoStatus] = useState("NONE");

    const [serverError, setServerError] = useState(null);
    const [products, setProducts] = useState([]);
    const [addProductViewShow, setAddProductNewBoxViewShow] = useState(false);

    const [showEditModal, setShowEditModal] = useState(false);
    const [editSlot, setEditSlot] = useState(null);
    const [currentPage, setCurentPage] = useState(0);
    const [maxPage, setMaxPage] = useState(1);
    const [totalCount, setTotalCount] = useState(0);

    const { AddToast } = useToastsOverlayProvider();

    const [lastSearch, setLastSearch] = useState({
        page: -1,
        search: ""
    })

    async function Load(search) {
        setLoadingStatus("SUCCESS");
        setLoadingStatus("LOADING")

        if (search == null) search = "";

        if (search.length < 3) search = "";

        var obj = {
            limit: COUTN_ITEMS_IN_PAGE,
            offset: COUTN_ITEMS_IN_PAGE * currentPage,
            filter: {
                search: search
            }
        }

        var res = await ListProducts(obj)
        if (!res || res.status === "error") {
            setServerError(res.error)
            return setLoadingStatus("ERROR");
        }

        setProducts(res.result.products);
        setTotalCount(res.result.count);
        setMaxPage(Math.ceil(res.result.count / COUTN_ITEMS_IN_PAGE))

        setLoadingStatus("SUCCESS");
        setServerError(null);

    };

    async function LoadInfo(boxProductId) {
        setLoadingSlotInfoStatus("LOADING");

        var res = await ProductBoxInfo(boxProductId);
        setLoadingSlotInfoStatus("NONE");
        if (!res || res.status === "error") {
            AddToast("Ошибка", "Не смогли получить информацию об [" + boxProductId  + "], ошибка: " + res.error )
            setServerError(res.error)
            return
        }

        var product = res.result.product;

        var slot = setEditSlot;
        if (parseInt(slot.boxProduct.id) != parseInt(product.id))
            return

        var slot = editSlot;
        slot.boxProduct.count = product.count;
        slot.boxProduct.price = product.price;
        slot.boxProduct.multiply = product.multiply;
        slot.boxProduct.description = product.description;

        setEditSlot(slot);

    }

    async function UpdateBoxProduct(obj, callback) {
        setLoadingSlotInfoStatus("UPDATE_PROCESS");

        var res = await UpdateBoxProductData(obj);

        setLoadingSlotInfoStatus("NONE");
        if (!res || res.status === "error") {
            AddToast("Ошибка", "При обновлении слота [" + obj.id  + "], ошибка: " + res.error )
            setServerError(res.error)
            return
        }

        var product = res.result.product;

        var editProducts = products;
        for (var i = 0; i < editProducts.length; i++){
            if(parseInt(editProducts[i].boxProduct.id) == parseInt(product.id)){

                editProducts[i].boxProduct.count = product.count;
                editProducts[i].boxProduct.price = product.price;
                editProducts[i].boxProduct.multiply = product.multiply;
                editProducts[i].boxProduct.description = product.description;
                break
            }
        }
        callback();
        setProducts(editProducts);
        setShowEditModal(false);
        setEditSlot(null);
    
        AddToast("Успешно", "Данные слота [" + obj.id  + "] обновлены.")
    }

    const value = {
        loadingStatus, Load, products,
        serverError,
        addProductViewShow,
        setAddProductNewBoxViewShow,
        showEditModal, setShowEditModal, editSlot, setEditSlot, loadingSlotInfoStatus, LoadInfo, UpdateBoxProduct
    };


    return (<LocalWarehousesProductsContext.Provider value={value} >{children}</LocalWarehousesProductsContext.Provider>)
};

export const useLocalWarehousesProductsProvider = () => React.useContext(LocalWarehousesProductsContext);