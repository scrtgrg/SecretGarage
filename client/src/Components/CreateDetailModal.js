import React from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import axios from 'axios'


async function postData(url = '', data = {}, callbackFunction = Function) {
    axios.post(url, data)
      .then(function (response) {
        console.log(response);
        callbackFunction();
      })
      .catch(function (error) {
        console.log(error);
      });
}

function CreateDetailModal(props) {    
    const [name, setName] = React.useState("");
    const [car, setCar] = React.useState("");
    const [price, setPrice] = React.useState("");
    const [message, setMessage] = React.useState(null);

    function onNameChange(e) {
        setName(e.target.value);
        console.log(name);
    }

    function onCarCnahge(e) { setCar(e.target.value); }
    
    function onPriceCnahge(e) { setPrice(e.target.value); }

    function validate(model) {
        if (model.name && model.car) {
            return true;
        } else {
            return false;
        }
    }

    function handleSubmit(event) {
        event.preventDefault();
        let model = { name: name, car: car, price };
        let isValid = validate(model);
        if (isValid) {
            setMessage(null);
            postData("/add_detail", model, props.callback);
            props.close();
        } else {
            setMessage("Input data is invalid.");
        }
    }

    return (
        <Modal show={props.show} onHide={props.close}>
            <Modal.Header closeButton>
                <Modal.Title>Create new detail</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {/* <CreateDetailForm></CreateDetailForm> */}
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter name" value={name} onChange={onNameChange} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Car</Form.Label>
                    <Form.Control type="text" placeholder="Enter Car" value={car} onChange={onCarCnahge} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Price</Form.Label>
                    <Form.Control type="number" placeholder="Enter Price" value={price} onChange={onPriceCnahge} />
                </Form.Group>
                {message &&
                    <Alert key="errorMessage" variant="danger">
                        {message}
                    </Alert>
                }
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.close}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleSubmit}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default CreateDetailModal;