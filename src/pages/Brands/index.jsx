
import React, { useEffect, useState } from "react";
import { useBrandImportProvider } from "../../contexts/BrandImportProvider";
import { Alert, Spinner, Container, Table, Button } from "react-bootstrap";

import BrandLine from "./BrandLine";

export default function Brands() {

    const { loadingStatus, brands, load, updateStatus, update, setUpdateStatus } = useBrandImportProvider();

    const [updated, setUpdated] = useState({});

    const onUpdate = (obj) => {

        updated[obj.id] = { used: obj.used, old: obj.old }

        setUpdated(prev => {
            return {
                ...prev,
                updated
            }
        });
    }

    const drawBrands = () => {
        return (<>
            {brands.map(item => {
                return <BrandLine item={item} updated={updated[item.id]} key={item.id} onUpdate={onUpdate} />
            })}
        </>)
    }

    const sendClick = (e) => {

        var sendObj = {};
        for (var key in updated) {
            if (updated[key].used != undefined && updated[key].used != updated[key].old)
                sendObj[key] = updated[key].used;
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
            if (updated[key].used != updated[key].old) dirty = true;
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

            return (<Alert variant="success" onClose = {()=>setUpdateStatus("NONE")} dismissible>
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

            return (<Alert variant="danger" onClose = {()=>setUpdateStatus("NONE")} dismissible>
                <Alert.Heading>Ошибка обновления</Alert.Heading>
                <p>
                    Что-то пошло не так.
                </p>
            </Alert>)
        }

    }

    useEffect(() => { load() }, []);


    if (loadingStatus === "LOADING") return <div className="brands-page">
        <br></br>
        <h2 className="text-center">Загрузка</h2>
        <Spinner animation="border" variant="info" />
    </div>


    if (loadingStatus === "SUCCESS") return (<div className="brands-page">
        <Container>
            <Table responsive="sm">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Название</th>
                        <th>Статус(вкл/выкл)</th>
                    </tr>
                </thead>
                <tbody>
                    {drawBrands()}
                </tbody>
            </Table>
            <br />
            {renderButtonSave()}
            {renderSuccess()}
            {renderAlertUpdate()}
            <br />

        </Container>

    </div>)


    return <div className="brands-page">
        <br></br>
        <Alert key='danger' variant='danger' >
            Упс! Что-то пошло не так, перезагрузите страницу
        </Alert>
    </div>
};
