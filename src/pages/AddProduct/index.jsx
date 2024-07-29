
import { Row, Spinner, Card, Col, Form, InputGroup, FloatingLabel, Alert, Button, Modal, Container } from "react-bootstrap"
import { useState } from "react";


export default function AddProduct() {

    //бренд или добавить
    //Код
    //Имя
    //Описание
    //Кнопка

    return (<>
        <Form>
            <Form.Group className="mb-3" >
                <Form.Label column="sm">Бренд</Form.Label>
                <InputGroup column="sm" className="mb-3">
                    <Form.Control
                        aria-describedby="basic-brand"
                        readOnly
                        size="sm"
                    />
                    <Button variant="outline-primary" id="button-brand">
                        Выбрать
                    </Button>
                </InputGroup>
            </Form.Group>
            <Form.Group className="mb-3" >
                <Form.Label column="sm">Код производителя</Form.Label>
                <Form.Control size="sm" type="text" />
            </Form.Group>
            <Form.Group className="mb-3" >
                <Form.Label column="sm">Название</Form.Label>
                <FloatingLabel controlId="floatingTextarea2">
                    <Form.Control as="textarea" />
                </FloatingLabel>
            </Form.Group>

            <Form.Group className="mb-3" >
                <Form.Label column="sm">Описание</Form.Label>
                <FloatingLabel controlId="floatingTextarea2" >
                    <Form.Control as="textarea" />
                </FloatingLabel>
            </Form.Group>

            <div class="d-flex flex-row-reverse bd-highlight">
                <Button align="right" variant="primary"  > Создать </Button>
            </div>

        </Form>

    </>)
}
