import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function Example({ title, body, onClose, children }) {
    const [smShow, setSmShow] = useState(true);

    const OnClose = (e)=>{
        setSmShow(false)
    }


    return (
        <>
            <Modal
                size="sm"
                show={smShow}
                onHide={OnClose}
                aria-labelledby="example-modal-sizes-title-sm"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-sm">
                        {title}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>{body}</Modal.Body>
            </Modal>
        </>
    );
}