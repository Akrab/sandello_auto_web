
import React, { useState } from "react";
import { Alert, Spinner, Modal, OverlayTrigger, Tooltip, Table, Form, Button } from "react-bootstrap";

import { useSelectProductModalViewProvider } from "../../contexts/SelectProductModalViewProvider";
import BasePaginator from "../BasePaginator";

export default function SelectProductModalView({ showModal, setShowModal, onSelect }) {

    const {
        items, currentPage, loadingState, maxPage, LoadPage, Find, ClearData
    } = useSelectProductModalViewProvider();

    const [chkbox, setChkbox] = useState(-1);
    const [inputValue, setInputValue] = useState("");

    const selectProduct = (e) => {
        setChkbox(parseInt(e))
    }

    const onInputValue = (e) => {
        setInputValue(e.target.value);
        Find(e.target.value);
    }

    const ApplySelectProduct = () => {

        if (chkbox >= 0) {
            if (onSelect != null)
                onSelect(items.find((e) => e.id == parseInt(chkbox)));

        }

        setChkbox(-1)
        setInputValue("")
        setShowModal(false);
        ClearData();

    }

    const SelectPage =(page)=>{

        LoadPage(inputValue, page)
    }


    const createTableBody = () => {

        var newItems = items == null ? [] : items;
        var dItem = 10 - newItems.length;
        for (var i = 0; i < dItem; i++) {
            newItems.push({
                id: "-", sku: "-", vendor_code: "-", brandName: {
                    id: 0,
                    name: "-",
                }, product_name: "-"
            });
        }

        return drawTableField(newItems);
    }



    const drawTableField = (newItems) => {

        return (<>
            {newItems.map(item => {
                return <>
                    <tr size="sm" onClick={(e) => selectProduct(item.id == "-" ? -1 : item.id)}
                        class={chkbox == item.id && item.id != -1 ? "table-primary" : ""} >
                        <td >{item.id}</td>
                        <td >{item.sku}</td>
                        <td >{item.vendor_code}</td>
                        <td >{item.brandName.name}</td>
                        <OverlayTrigger
                            key={item.id}
                            placement="auto"

                            overlay={
                                <Tooltip id={"tooltip"} >
                                    <strong>{item.product_name}</strong>
                                </Tooltip>
                            }
                        >
                            <td >{
                                item.product_name.length > 45 ? item.product_name.substring(0, 45) + "..." : item.product_name}</td>
                        </OverlayTrigger>

                    </tr>

                </>
            })}
        </>)
    }

    const drawErrorInfo = () => {
        if (loadingState != "ERROR") return
        return <>        <Alert key="danger" variant="danger">
            ЧТо-то пошло не так.
        </Alert></>

    }

    const drawLoadState = () => {
        if (loadingState != "LOADING") return
        return <>
            <Button variant="primary" disabled>
                <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                />
                <span className="visually-hidden">Loading...</span>
            </Button>{' '}</>
    }

    return (<>
        <Modal
            size="lg"
            show={showModal}
            onHide={() => { setChkbox(-1); setShowModal(false); setInputValue(""); ClearData(); }}
            aria-labelledby="find-products-modal-sizes-title-lg"
        >
            <Modal.Header closeButton>
                <Modal.Title id="find-products-modal-sizes-title-lg">
                    Поиск продукта
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" >
                        <Form.Label column="sm">SKU/Название (мин 3 символа)</Form.Label>
                        <Form.Control size="sm" type="text" placeholder="Введите текст" value={inputValue} onChange={onInputValue} />
                    </Form.Group>

                    <Form.Group className="mb-3" >
                            <Table size="sm" >
                                <thead>
                                    <tr size="sm">
                                        <th>Id</th>
                                        <th>SKU</th>
                                        <th>Артикул</th>
                                        <th>Бренд</th>
                                        <th>Название</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {createTableBody()}
                                </tbody>
                            </Table>
                
                    </Form.Group>
                </Form>
                <BasePaginator page={currentPage} setPage={SelectPage} maxPages={maxPage > 20 ? 20 : maxPage} />
            </Modal.Body>
            {drawErrorInfo()}
            <Modal.Footer>
                {drawLoadState()}
                <Button variant={

                    loadingState == "ERROR" ? "secondary" : (
                        chkbox != -1 ? "primary" : "secondary")} id="button-addon2" onClick={(e) => { ApplySelectProduct() }} >
                    Выбрать
                </Button>
            </Modal.Footer>

        </Modal>
    </>)

}