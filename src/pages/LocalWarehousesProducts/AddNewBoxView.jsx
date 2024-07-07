import { useState } from "react";
import { useLocalWarehousesProductsProvider } from "../../contexts/LocalWarehousesProductsProvider";
import { Modal, Row, Col, Button, Form } from "react-bootstrap";

export default function AddNewBoxView({ children }) {

    const {
        newBoxViewShow,
        setNewBoxViewShow,
    } = useLocalWarehousesProductsProvider();


    return (<>
        <Modal
            size="lg"
            show={newBoxViewShow}
            onHide={() => setNewBoxViewShow(false)}
            aria-labelledby="example-modal-sizes-title-lg"
        >
            <Modal.Header closeButton>
                <Modal.Title id="example-modal-sizes-title-lg">
                    Создать ячейку
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>

                <Form>
                    <Form.Group className="mb-3" >
                        <Form.Label column="sm">Название</Form.Label>
                        <Form.Control size="sm" type="text" placeholder="Введите текст" />
                    </Form.Group>
                    <Form.Group className="mb-3" >
                        <Form.Label column="sm">Склад</Form.Label>
                        <Form.Select size="sm" aria-label="Default select example">
                            <option>Выберите склад</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3" >
                        <Form.Label column="sm">Комната</Form.Label>
                        <Form.Select size="sm" aria-label="Default select example">
                            <option>Выберите комнату(выбрана комната по умолчанию)</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3" >
                        <Form.Label column="sm">Стеллаж</Form.Label>
                        <Form.Select size="sm" aria-label="Default select example">
                            <option>Выберите стеллаж(выбран стеллаж по умолчанию)</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3" >
                        <Form.Label column="sm">Полка</Form.Label>
                        <Form.Select size="sm" aria-label="Default select example">
                            <option>Выберите полку(выбрана полка по умолчанию)</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3" >
                        <Form.Label column="sm">Коробка</Form.Label>
                        <Form.Select size="sm" aria-label="Default select example">
                            <option>Выберите коробку(выбрана коробка по умолчанию)</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlTextarea1"
                    >
                        <Form.Label column="sm">Комментарий</Form.Label>
                        <Form.Control size="sm" as="textarea" rows={1} />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button >Добавить</Button>
            </Modal.Footer>

        </Modal> </>
    )
}
