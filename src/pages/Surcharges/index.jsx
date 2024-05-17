import React, { useEffect, useState } from "react";
import { Alert, Spinner, Container, Table, Button } from "react-bootstrap";
import { useSurchargesProvider } from "../../contexts/SurchargesProvider";
import SurchargesLine from "./SurchargesLine";
import SurchargeModal from "./SurchargeModal";

export default function Surcharges() {

    const {
        loadingStatus,
        surcharges,
        load,
        updateStatus,
        setUpdateStatus,
        update,
        setEditSurcharge } = useSurchargesProvider();

    useEffect(() => { load() }, []);

    const onUpdate = (obj) => {

        update(obj);
        setEditSurcharge({});
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

    const drawSurcharges = () => {

        return (<>
            {surcharges.map(surcharge => {
                return <SurchargesLine surcharge={surcharge} key={surcharge.id} onUpdate={onUpdate} />
            })}
        </>)
    }


    if (loadingStatus === "SUCCESS") {
        return (<div className="surcharges-page">
            <Container>

                {/* {this.showModal()} */}


                <Table responsive="sm">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Начиная(включительно)</th>
                            <th>До(Не включительно)</th>
                            <th>Наценка в %</th>
                            <th>Активен</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {drawSurcharges()}



                    </tbody>
                </Table>
                {renderSuccess()}
                {renderAlertUpdate()}
            </Container >
            <SurchargeModal onUpdate={onUpdate} />
        </div>)
    }

    return <div className="suppliers-page">
        <br></br>
        <Alert key='danger' variant='danger' >
            Упс! Что-то пошло не так, перезагрузите страницу
        </Alert>
    </div>
}