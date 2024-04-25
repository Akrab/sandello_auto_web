
import React from "react";
import { useBrandImportProvider } from "../../contexts/BrandImportProvider";
import { Alert } from "react-bootstrap";

export default function Brands() {

    const { loadingStatus, brands } = useBrandImportProvider();

    if (loadingStatus === "LOADING") return <div className="brands-page">
        <h2 className="text-center text-info">Загрузка</h2>
    </div>


    return <div className="brands-page">
        <br></br>
        <Alert key='danger' variant='danger'>
            Упс! Что-то пошло не так, перезагрузите страницу
        </Alert>
    </div>
};