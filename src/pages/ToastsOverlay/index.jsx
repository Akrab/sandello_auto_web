import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import { useState } from 'react';

import { useToastsOverlayProvider } from '../../contexts/ToastsOverlayProvider';
export default function ToastsOverlay({ children }) {

    const {
        enable, RemoveToast, toasts
    } = useToastsOverlayProvider();

    const [dummy, reload] = useState(true);

    const onClose = (id) => {
        RemoveToast(id)
        reload(!dummy)
    }

    const drawToasts = () => {

        if (enable == false) {
            return
        }

        return (<>
            {toasts.map(toast => {
                return (
                    <>
                        <Toast>
                            <Toast.Header onClick={e => { onClose(toast.id); }}>
                                <strong className="me-auto">{toast.name}</strong>
                            </Toast.Header>
                            <Toast.Body className={toast.variant === 'Dark' && 'text-white'}> {toast.description}</Toast.Body>
                        </Toast>
                    </>
                )
            })}
        </>)

    }


    return (
        <>
            {children}
            <div
                aria-live="polite"
                aria-atomic="true"
                style={{ minHeight: '240px' }}
            >

                <ToastContainer position="top-end" className="p-3" style={{ zIndex: 1 }}>
                    {drawToasts()}
                </ToastContainer>

            </div>
        </>
    );
}