import React, { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';

// The forwardRef is important!!
// Dropdown needs access to the DOM node in order to position the Menu
const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <a
        href=""
        ref={ref}
        onClick={(e) => {
            e.preventDefault();
            onClick(e);
        }}
    >
        {children}
        &#x25bc;
    </a>
));

// forwardRef again here!
// Dropdown needs access to the DOM of the Menu to measure it
const CustomMenu = React.forwardRef(
    ({ children, style, className, 'aria-labelledby': labeledBy }, ref) => {
        const [value, setValue] = useState('');

        return (
            <div
                ref={ref}
                style={style}
                className={className}
                aria-labelledby={labeledBy}
            >
                <Form.Control
                    autoFocus
                    className="mx-3 my-2 w-auto"
                    placeholder="Type to filter..."
                    onChange={(e) => setValue(e.target.value)}
                    value={value}
                />
                <ul className="list-unstyled">
                    {React.Children.toArray(children).filter(
                        (child) =>
                            !value || child.props.children.toLowerCase().startsWith(value),
                    )}
                </ul>
            </div>
        );
    },
);


export default function DropdownFilter({ children }) {
    return (

        <>
            <Form.Group className="mb-3" >
                <Form.Label as ={CustomToggle}  column="sm">Ячейка1111</Form.Label>
                <Form.Select  as={CustomMenu} size="sm" aria-label="Default select example">
                    <option>Выберите ячейку(выбрана ячейка по умолчанию)</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                </Form.Select>
            </Form.Group>
        </>
        // <Dropdown>
        //     <Dropdown.Toggle  id="dropdown-custom-components">
        //         Custom toggle
        //     </Dropdown.Toggle>

        //     <Dropdown.Menu as={CustomMenu}>
        //         <Dropdown.Item eventKey="1">Red</Dropdown.Item>
        //         <Dropdown.Item eventKey="2">Blue</Dropdown.Item>
        //         <Dropdown.Item eventKey="3" active>
        //             Orange
        //         </Dropdown.Item>
        //         <Dropdown.Item eventKey="1">Red-Orange</Dropdown.Item>
        //     </Dropdown.Menu>
        // </Dropdown>
    )
}
