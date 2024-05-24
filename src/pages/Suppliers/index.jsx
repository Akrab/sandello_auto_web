import React, { useEffect, useState } from "react";
import { Alert, Spinner, Container, Table, Button } from "react-bootstrap";
import { useSuppliersProvider } from "../../contexts/SuppliersProvider";
import SuppliersLine from "./SuppliersLine";

export default function Suppliers() {

    const {
        loadingStatus,
        suppliers,
        load,
        updateStatus,
        setUpdateStatus,
        update } = useSuppliersProvider();


    const [updated, setUpdated] = useState({});
    useEffect(() => { load() }, []);


    const onUpdate = (obj) => {

        updated[obj.id] = { enable: obj.enable, old: obj.old }

        setUpdated(prev => {
            return {
                ...prev,
                updated
            }
        });
    }

    const drawSuppliers = () => {

        return (<>
            {suppliers.map(supplier => {
                return <SuppliersLine supplier={supplier} key={supplier.id} onUpdate={onUpdate} />
            })}
        </>)
    }


    const sendClick = (e) => {
        var sendObj = {};
        for (var key in updated) {
            if (updated[key].enable != undefined && updated[key].enable != updated[key].old)
                sendObj[key] = updated[key].enable;
        }

        var count = Object.keys(sendObj).length;

        if (count == 0) return;


        update(sendObj);
        setUpdated({})


    }

    const renderButtonSave = () => {

        if (updateStatus === "SEND") {
            return (<div align="right" > <Button variant="primary" disabled>
                <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                />Обновление</Button> </div>)
        }

        if (updateStatus !== "NONE") return;

        var dirty = false
        for (var key in updated) {
            if (updated[key].enable != updated[key].old) dirty = true;
        }

        if (!dirty) {
            return (<div align="right" >
                <Button variant="secondary" >Сохранить</Button>{' '}
            </div>)
        }

        return (<div align="right" >
            <Button variant="primary" onClick={sendClick} >Сохранить</Button>{' '}
        </div>)
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

    if (loadingStatus === "LOADING") return <div className="suppliers-page">
        <br></br>
        <h2 className="text-center">Загрузка</h2>
        <Spinner animation="border" variant="info" />
    </div>



    if (loadingStatus === "SUCCESS") return (<div className="suppliers-page">
        <Container>
            <Table responsive="sm">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Название</th>
                        <th>e-mail</th>
                        <th>Описание</th>
                        <th>Статус(вкл/выкл)</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {drawSuppliers()}
                </tbody>
            </Table>
            <br />
            {renderButtonSave()}
            {renderSuccess()}
            {renderAlertUpdate()}
            <br />

        </Container>

    </div>)


    return <div className="suppliers-page">
        <br></br>
        <Alert key='danger' variant='danger' >
            Упс! Что-то пошло не так, перезагрузите страницу
        </Alert>
    </div>

};