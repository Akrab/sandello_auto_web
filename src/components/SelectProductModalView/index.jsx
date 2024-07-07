
import React, { useEffect, useState } from "react";
import { Alert, Spinner, Container, Modal, Table, Form, Button } from "react-bootstrap";

import { useSelectProductModalViewProvider } from "../../contexts/SelectProductModalViewProvider";

export default function SelectProductModalView() {

    const {
        showSelectProductModal,
        setShowSelectProductModal
    } = useSelectProductModalViewProvider();

    const [chkbox, setChkbox] = useState(0);

    const selectProduct = (e) => {
        console.log(e.target.id);
    }

    const applySelectProduct = () => {

        setShowSelectProductModal(false);
    }

    const handleChangeChk = (e) => {
        console.log(e)
    }


    const createTableBody = ()=>{

    }

    return (<>

        <Modal
            size="lg"
            show={showSelectProductModal}
            onHide={() => setShowSelectProductModal(false)}
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
                        <Form.Control size="sm" type="text" placeholder="Введите текст" />
                    </Form.Group>

                    <Form.Group className="mb-3" >
                        <Table  size="sm">
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>SKU</th>
                                    <th>Артикул</th>
                                    <th>Название</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr type="radio" class="btn-check" name="options-base" id="option5" autocomplete="off" onClick={selectProduct}>
                                   
                                    <td>1</td>
                                    <td>Mark</td>
                                    <td>Otto</td>
                                    <td>@mdo</td>
                                </tr>
                                <tr onClick={selectProduct} id="1">
                                   
                                    <td>2</td>
                                    <td>Jacob</td>
                                    <td>Thornton</td>
                                    <td>@fat</td>
                                </tr>
                                <tr onClick={selectProduct} id="1">
                                  
                                    <td>2</td>
                                    <td>Jacob</td>
                                    <td>Thornton</td>
                                    <td>@fat</td>
                                </tr>
                                <tr  class="table-success" onClick={selectProduct} id="1">
                                  
                                    <td>2</td>
                                    <td>Jacob</td>
                                    <td>Thornton</td>
                                    <td>@fat</td>
                                </tr>

                            </tbody>
                        </Table>
                    </Form.Group>

                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" id="button-addon2" onClick={(e) => { applySelectProduct() }} >
                    Выбрать
                </Button>
            </Modal.Footer>

        </Modal>
    </>)

}