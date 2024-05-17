import React from "react";
import { useHistoryImportPriceProvider } from "../../contexts/HistoryImportPriceProvider";
import { Alert, Spinner, Table, Container } from "react-bootstrap";
import HistoryLine from "./HistoryLine";
import DeleteConfirmModal from "./DeleteConfirmModal";
import PaginatorHistory from "./PaginatorHistory";

export default function HistoryImportPrice() {
    const { loadingStatus, history, updateStatus, setUpdateStatus, selectSlot, setSelectSlot, deleteItem } = useHistoryImportPriceProvider();


    const onDelete = () => {
        deleteItem(selectSlot.id);
        setSelectSlot(null);
    }

    const drawHistory = () => {
        return (<>
            {history.map(record => {
                return <HistoryLine item={record} />
            })}
        </>)
    }

    const renderSuccess = () => {
        // 
        if (updateStatus === "SUCCESS") {

            return (<Alert variant="success" onClose={() => setUpdateStatus("NONE")} dismissible>
                <Alert.Heading>Обновлено</Alert.Heading>
                <p>
                    Данные обновлены.
                </p>
            </Alert>)
        }

    }


    const renderAlertUpdate = () => {
        // 
        if (updateStatus === "ERROR") {

            return (<Alert variant="danger" onClose={() => setUpdateStatus("NONE")} dismissible>
                <Alert.Heading>Ошибка обновления</Alert.Heading>
                <p>
                    Что-то пошло не так.
                </p>
            </Alert>)
        }
    }

    if (loadingStatus === "LOADING") return <div className="historyImportPrice-page">
        <br></br>
        <h2 className="text-center">Загрузка</h2>
        <Spinner animation="border" variant="info" />
    </div>

    if (loadingStatus === "SUCCESS") return <div className="historyImportPrice-page">
        <Container>
            <Table responsive="sm">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>UID</th>
                        <th>Поставщик</th>
                        <th>Файл</th>
                        <th>Дата создания</th>
                        <th>Дата последнего обновления</th>
                        <th>Статус</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {drawHistory()}
                </tbody>
            </Table>
            <br />
            {renderSuccess()}
            {renderAlertUpdate()}
            <PaginatorHistory/>
            <br />
            <DeleteConfirmModal onDelete={onDelete}  />
        </Container>


    </div>

    return <div className="historyImportPrice-page">
        <br></br>
        <Alert key='danger' variant='danger'>
            Упс! Что-то пошло не так, перезагрузите страницу
        </Alert>
    </div>


};