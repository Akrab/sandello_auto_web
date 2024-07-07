import { useState } from "react";
import { useLocalWarehousesProductsProvider } from "../../contexts/LocalWarehousesProductsProvider";
import { Modal, Row, Col, Button, Form } from "react-bootstrap";
import DropdownFilter from "../../components/DropdownFilter";

export default function AddProductView({ children }) {


    const {
        addProductViewShow, setAddProductNewBoxViewShow
    } = useLocalWarehousesProductsProvider();

    const [price, setPrice] = useState([]);

    const onInputValue = (e) => {
        var v = checkInputFloat(e.target.value);

        setPrice(v);
    }

    const checkInputInt = (data, min) => {
        try {
            var v = parseInt(data);
            if (isNaN(v)) {
                v = min
            }

            if (v < min)
                v = min;
        } catch (err) {
            v = min;
        }
        return v;
    }

    const checkInputFloat = (data, min) => {

        if (min == null)
            min = 0;

        if (data == null || data.length == 0)
            return min;
        var s = data.split('.');
        var convertData = [];
        for (var i = 0; i < s.length; i++) {
            var part = s[i]
            if (i > 0 && part == "") {
                convertData.push(0)
                continue;
            }
            var newText = "";
            for (var t in part) {
                var v = parseInt(part[t])
                if (!isNaN(v)) {
                    newText += part[t]
                }
            }
            newText = parseInt(newText)
            if (!isNaN(newText))
                convertData.push(newText)
        }


        if (convertData.length == 1) {
            return convertData[0];
        }
        if (convertData.length == 2) {
            return convertData[0] + "." + convertData[1];
        }

        return min;
    }


    return (<>
        <Modal
            size="lg"
            show={addProductViewShow}
            onHide={() => setAddProductNewBoxViewShow(false)}
            aria-labelledby="example-modal-sizes-title-lg"
        >
            <Modal.Header closeButton>
                <Modal.Title id="example-modal-sizes-title-lg">
                    Добавить товар
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>

                <Form>
                    <Form.Group className="mb-3" >
                        <Form.Label column="sm">SKU/Название</Form.Label>
                        <Form.Control size="sm" type="text" placeholder="Введите текст" />
                    </Form.Group>
                    <Form.Group className="mb-3" >
                        <Form.Label column="sm">Цена</Form.Label>
                        <Form.Control size="sm" type="text" placeholder="10" value={price} onChange={onInputValue} />

                    </Form.Group>
                    <Form.Group className="mb-3" >
                        <Form.Label column="sm">Кратность</Form.Label>
                        <Form.Control size="sm" type="number" min="1" />
                    </Form.Group>
                    <Form.Group className="mb-3" >
                        <Form.Label column="sm">Склад</Form.Label>
                        <Form.Select size="sm" aria-label="Default select example">
                            <option>Выберите склад(выбран склад по умолчанию)</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </Form.Select>
                    <DropdownFilter></DropdownFilter>
                        
                    </Form.Group>
                    <Form.Group className="mb-3" >
                        <Form.Label column="sm">Ячейка</Form.Label>
                        <Form.Select size="sm" aria-label="Default select example">
                            <option>Выберите ячейку(выбрана ячейка по умолчанию)</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                            <option value="4">One</option>
                            <option value="5">Two</option>
                            <option value="6">Three</option>
                            <option value="7">One</option>
                            <option value="8">Two</option>
                            <option value="9">Three</option>
                            <option value="10">One</option>
                            <option value="11">Two</option>
                            <option value="12">Three</option>
                            <option value="13">One</option>
                            <option value="14">Two</option>
                            <option value="15">Three</option>
                            <option value="16">One</option>
                            <option value="17">Two</option>
                            <option value="117">Three</option>
                            <option value="18">One</option>
                            <option value="21">Two</option>
                            <option value="32">Three</option>

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
