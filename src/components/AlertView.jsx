import { Alert, Button } from "react-bootstrap"
import { useState } from "react";

export default function AlertView({ header, title, onClose, children }) {

    const OnCloseClick = (e) => {

        onClose()

    }

    return (
        <Alert variant="danger" onClose={OnCloseClick} dismissible>
            <Alert.Heading>{header}</Alert.Heading>
            <p>
                {title}
            </p>
        </Alert>
    );

};