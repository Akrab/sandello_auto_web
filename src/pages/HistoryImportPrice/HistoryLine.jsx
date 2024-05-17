import { Button } from "react-bootstrap"
import { useState } from "react";

import { useHistoryImportPriceProvider } from "../../contexts/HistoryImportPriceProvider";

export default function HistoryLine({ item }) {


    const { setShowModal, setSelectSlot } = useHistoryImportPriceProvider();

    const onClickDelete = (e) => {

        setShowModal(true);
        setSelectSlot(item)

    }

    const dateToStr = (unixTime) => {
        return new Date(unixTime).toLocaleString("ru-RU")
    }

    const statusToStr = (status) => {

        switch (status) {
            case 0: return "None";
            case 1: return "Загружено";
            case 2: return "Преобразовано";
            case 3: return "В процессе";
            case 4: return "Ценники загружены";
            case 5: return "Файл удален";
            case 6: return "Ошибка";
            default: return "Ошибка типа"
        }

    }

    const btnIsActive = () => {
        switch (item.status) {

            case 4: return true;
            case 5: return true;
            case 6: return true;
            default: return false;
        }
    }

    const statusBtn = () => {

        if (btnIsActive()) return "primary"
        return "secondary"

    }


    return (<>
        <tr>
            <td>{item.id}</td>
            <td>{item.uid}</td>
            <td>{item.supplierName}</td>
            <td>{item.fileName}</td>
            <td>{dateToStr(item.created)}</td>
            <td>{dateToStr(item.updated)}</td>
            <td>{statusToStr(item.status)}</td>
            <td>
                <Button variant={statusBtn()} id={item.id} disabled={!btnIsActive()} onClick={onClickDelete}>Удалить</Button>{' '}</td>
        </tr >
    </>)
}
