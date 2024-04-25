import React from "react";
import { useHistoryImportPriceProvider } from "../../contexts/HistoryImportPriceProvider";
import { Alert } from "react-bootstrap";

export default function HistoryImportPrice() {
    const { loadingStatus, history } = useHistoryImportPriceProvider();

    if (loadingStatus === "LOADING") return <div className="historyImportPrice-page">
        <h2 className="text-center text-info">Загрузка</h2>
    </div>

    if (loadingStatus === "ERROR") return <div className="historyImportPrice-page">
        <Alert key='danger' variant='danger'>
            Упс! Что-то пошло не так, перезагрузите страницу
        </Alert>
    </div>

    if (loadingStatus === "SUCCESS") return <div className="historyImportPrice-page">
        <h1 className="text-center">История импорта</h1>

        {history.map(record => {
            return <p>{record}</p>
        })}
    </div>

    return <div className="historyImportPrice-page">
        <br></br>
        <Alert key='danger' variant='danger'>
            Упс! Что-то пошло не так, перезагрузите страницу
        </Alert>
    </div>
};