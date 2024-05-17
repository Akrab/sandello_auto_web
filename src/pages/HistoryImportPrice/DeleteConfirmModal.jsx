import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Table from 'react-bootstrap/Table';
import { useHistoryImportPriceProvider } from '../../contexts/HistoryImportPriceProvider';

export default function DeleteConfirmModal({ onDelete, children }) {

    const {
        showModal,
        setShowModal,
        selectSlot
    } = useHistoryImportPriceProvider();


    const handleClose = (e) => {
        setShowModal(false);

    }

    const onInputDelete = (e) => {
        setShowModal(false);
        onDelete();
    }


    return (
        <>
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Удалить №{selectSlot == null ? "-1" : selectSlot.id}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Если файл последний то удаление приведет новой загрузке</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>
                        Закрыть
                    </Button>
                    <Button variant="danger" onClick={onInputDelete}>
                        Удалить
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
