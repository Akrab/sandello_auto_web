import { Row, Spinner, Card, ListGroup, Col, InputGroup, Form, ToastContainer, Toast, Alert, Button, Container } from "react-bootstrap"
import { useState, useEffect } from "react";

import styles from '../../style/main.css';

export default function CreateLocalWarehouse() {
    const drawBtnBack = () => {
        return (<>
            <br />

            <Button class="btn btn-outline-primary" href="/localwarehouses" >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-backspace-fill" viewBox="0 0 16 16">
                    <path d="M15.683 3a2 2 0 0 0-2-2h-7.08a2 2 0 0 0-1.519.698L.241 7.35a1 1 0 0 0 0 1.302l4.843 5.65A2 2 0 0 0 6.603 15h7.08a2 2 0 0 0 2-2zM5.829 5.854a.5.5 0 1 1 .707-.708l2.147 2.147 2.146-2.147a.5.5 0 1 1 .707.708L9.39 8l2.146 2.146a.5.5 0 0 1-.707.708L8.683 8.707l-2.147 2.147a.5.5 0 0 1-.707-.708L7.976 8z" />
                </svg> <i class="bi bi-backspace-fill"></i>Назад</Button>

        </>)
    }

    const drawContentLeft = () => {
        return (
            <Form>
                <Form.Group className="mb-3" >
                    <Form.Label column="sm">Название</Form.Label>
                    <Form.Control size="sm" type="text" placeholder="Введите название" />
                </Form.Group>
                <Row>
                    <Col >
                        <Card>

                            <Card.Body>
                                <Form.Label column="sm">Комнаты</Form.Label>
                                <Form.Group className="mb-3" >
                                    <Form.Label column="sm">Название</Form.Label>
                                    <Form.Control size="sm" type="text" placeholder="Введите название" />
                                </Form.Group>
                                <ListGroup column="sm" size="sm">
                                    <div className="second">
                                        <ListGroup.Item size="sm"  column="sm" action href="#link1">
                                            Link 1
                                        </ListGroup.Item>
                                        <ListGroup.Item action href="#link2">
                                            Link 2
                                        </ListGroup.Item>
                                        <ListGroup.Item action href="#link2">
                                            Link 2
                                        </ListGroup.Item>
                                        <ListGroup.Item action href="#link2">
                                            Link 2
                                        </ListGroup.Item>
                                        <ListGroup.Item action href="#link2">
                                            Link 2
                                        </ListGroup.Item>
                                        <ListGroup.Item action href="#link2">
                                            Link 2
                                        </ListGroup.Item>
                                        <ListGroup.Item action href="#link2">
                                            Link 2
                                        </ListGroup.Item>
                                        <ListGroup.Item action href="#link2">
                                            Link 2
                                        </ListGroup.Item>
                                        <ListGroup.Item action href="#link2">
                                            Link 2
                                        </ListGroup.Item>
                                        <ListGroup.Item action href="#link2">
                                            Link 2
                                        </ListGroup.Item>
                                    </div>
                                </ListGroup>



                                <br />

                                <Row>
                                    <Col >                <div class="d-flex justify-content-start">
                                        <Button align="end" variant="danger" type="submit">
                                            Удалить
                                        </Button></div>
                                    </Col>
                                    <Col>                <div class="d-flex justify-content-end">
                                        <Button align="end" variant="primary" type="submit">
                                            Создать
                                        </Button></div> </Col>
                                </Row>
                               </Card.Body>
                        </Card>
                    </Col>
                    <Col >
                        <Card>

                            <Card.Body>
                                <Form.Label column="sm">Стеллаж</Form.Label>
                                <Form.Group className="mb-3" >
                                    <Form.Label column="sm">Название</Form.Label>
                                    <Form.Control size="sm" type="text" placeholder="Введите название" />
                                </Form.Group>
                                <ListGroup>
                                    <div className="second">
                                        <ListGroup.Item action href="#link1">
                                            Link 1
                                        </ListGroup.Item>
                                        <ListGroup.Item action href="#link2">
                                            Link 2
                                        </ListGroup.Item>
                                        <ListGroup.Item action href="#link2">
                                            Link 2
                                        </ListGroup.Item>
                                        <ListGroup.Item action href="#link2">
                                            Link 2
                                        </ListGroup.Item>
                                        <ListGroup.Item action href="#link2">
                                            Link 2
                                        </ListGroup.Item>
                                        <ListGroup.Item action href="#link2">
                                            Link 2
                                        </ListGroup.Item>
                                        <ListGroup.Item action href="#link2">
                                            Link 2
                                        </ListGroup.Item>
                                        <ListGroup.Item action href="#link2">
                                            Link 2
                                        </ListGroup.Item>
                                        <ListGroup.Item action href="#link2">
                                            Link 2
                                        </ListGroup.Item>
                                        <ListGroup.Item action href="#link2">
                                            Link 2
                                        </ListGroup.Item>
                                    </div>
                                </ListGroup>



                                <br />

                                <Row>
                                    <Col >                <div class="d-flex justify-content-start">
                                        <Button align="end" variant="danger" type="submit">
                                            Удалить
                                        </Button></div>
                                    </Col>
                                    <Col>                <div class="d-flex justify-content-end">
                                        <Button align="end" variant="primary" type="submit">
                                            Создать
                                        </Button></div> </Col>
                                </Row>
                                </Card.Body>
                        </Card> </Col>
                </Row>

                <br />
                <Row>
                    <Col >
                        <Card>

                            <Card.Body>
                                <Form.Label column="sm">Полка</Form.Label>
                                <Form.Group className="mb-3" >
                                    <Form.Label column="sm">Название</Form.Label>
                                    <Form.Control size="sm" type="text" placeholder="Введите название" />
                                </Form.Group>
                                <ListGroup column="sm">
                                    <div className="second">
                                        <ListGroup.Item action href="#link1">
                                            Link 1
                                        </ListGroup.Item>
                                        <ListGroup.Item action href="#link2">
                                            Link 2
                                        </ListGroup.Item>
                                        <ListGroup.Item action href="#link2">
                                            Link 2
                                        </ListGroup.Item>
                                        <ListGroup.Item action href="#link2">
                                            Link 2
                                        </ListGroup.Item>
                                        <ListGroup.Item action href="#link2">
                                            Link 2
                                        </ListGroup.Item>
                                        <ListGroup.Item action href="#link2">
                                            Link 2
                                        </ListGroup.Item>
                                        <ListGroup.Item action href="#link2">
                                            Link 2
                                        </ListGroup.Item>
                                        <ListGroup.Item action href="#link2">
                                            Link 2
                                        </ListGroup.Item>
                                        <ListGroup.Item action href="#link2">
                                            Link 2
                                        </ListGroup.Item>
                                        <ListGroup.Item action href="#link2">
                                            Link 2
                                        </ListGroup.Item>
                                    </div>
                                </ListGroup>
                                <br />

                                <Row>
                                    <Col >                <div class="d-flex justify-content-start">
                                        <Button align="end" variant="danger" type="submit">
                                            Удалить
                                        </Button></div>
                                    </Col>
                                    <Col>                <div class="d-flex justify-content-end">
                                        <Button align="end" variant="primary" type="submit">
                                            Создать
                                        </Button></div> </Col>
                                </Row>
                                </Card.Body>
                        </Card>
                    </Col>
                    <Col >
                        <Card>

                            <Card.Body>
                                <Form.Label column="sm">Коробка</Form.Label>
                                <Form.Group className="mb-3" >
                                    <Form.Label column="sm">Название</Form.Label>
                                    <Form.Control size="sm" type="text" placeholder="Введите название" />
                                </Form.Group>
                                <ListGroup>
                                    <div className="second">
                                        <ListGroup.Item action href="#link1">
                                            Link 1
                                        </ListGroup.Item>
                                        <ListGroup.Item action href="#link2">
                                            Link 2
                                        </ListGroup.Item>
                                        <ListGroup.Item action href="#link2">
                                            Link 2
                                        </ListGroup.Item>
                                        <ListGroup.Item action href="#link2">
                                            Link 2
                                        </ListGroup.Item>
                                        <ListGroup.Item action href="#link2">
                                            Link 2
                                        </ListGroup.Item>
                                        <ListGroup.Item action href="#link2">
                                            Link 2
                                        </ListGroup.Item>
                                        <ListGroup.Item action href="#link2">
                                            Link 2
                                        </ListGroup.Item>
                                        <ListGroup.Item action href="#link2">
                                            Link 2
                                        </ListGroup.Item>
                                        <ListGroup.Item action href="#link2">
                                            Link 2
                                        </ListGroup.Item>
                                        <ListGroup.Item action href="#link2">
                                            Link 2
                                        </ListGroup.Item>
                                    </div>
                                </ListGroup>



                                <br />

                                <Row>
                                    <Col >                <div class="d-flex justify-content-start">
                                        <Button align="end" variant="danger" type="submit">
                                            Удалить
                                        </Button></div>
                                    </Col>
                                    <Col>                <div class="d-flex justify-content-end">
                                        <Button align="end" variant="primary" type="submit">
                                            Создать
                                        </Button></div> </Col>
                                </Row>
                               </Card.Body>
                        </Card> </Col>
                </Row>
                <br /><br />
            </Form > )
    }

    const drawContentRight = () => {
        return (
            <>
                <Form>
                    <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlTextarea1"
                    >
                        <Form.Label column="sm">Комментарий</Form.Label>
                        <Form.Control size="sm" as="textarea" rows={4} max={10} />
                    </Form.Group>
                    <div class="d-flex justify-content-end">
                        <Button align="end" variant="primary" type="submit">
                            Создать
                        </Button></div>

                    <br />
                    {/* <Alert key="info" variant="info">
                        This is a alert—check it out!
                    </Alert> */}
                </Form>
            </>)
    }

    return (<>
        <div className="localwarehouses-create-page">
            <Container>
                {drawBtnBack()}
                <br />
                <br />
                <Row>
                    <Col sm={8}>{drawContentLeft()}</Col>
                    <Col sm={4}>{drawContentRight()}  </Col>
                </Row>
            </Container>
        </div>
    </>)

}