import React, { useContext, useReducer, useState } from 'react'
import { Button, Container, Row, Col } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { useNavigate } from 'react-router-dom';
import { addProduct, updateProduct } from '../components/ProductAPIs';
import { productContext } from '../context/AppContextProvider';

//Reducer to handle inputs
const inputs = {
    name: "",
    description: "",
    price: "",
    unitsAvailable: "",
    productImage: ""
}

export default function AddProduct() {
    //state to handle inputs
    const [inputState, dispatch] = useReducer(inputReducer, inputs);
    //state to handle Add or Edit button
    const [buttonName, setButtonName] = useState('AddProduct');
    //handling details to edit 
    const { editDetails, setEditDetails } = useContext(productContext);
    const navigate = useNavigate();

    //Initiating for Edit
    if (editDetails.edit) { editInput(editDetails) };

    //function to add or update products to API
    async function addProductFun() {
        //To add product
        if (buttonName === "AddProduct") {
            await addProduct({ data: inputState });
            dispatch("reset");
            navigate("/productadmin");
        }
        //To Update product
        else {
            await updateProduct({ data: inputState, id: editDetails._id });
            dispatch("reset");
            setEditDetails({ edit: false });
            setButtonName("AddProduct");
            navigate("/productadmin");
        }
    }

    //placing details in inputs for edit
    function editInput(editDetails) {
        setButtonName("Update");
        editDetails.edit = false;
        dispatch({ type: "name", value: editDetails.name });
        dispatch({ type: "description", value: editDetails.description });
        dispatch({ type: "price", value: editDetails.price });
        dispatch({ type: "unitsAvailable", value: editDetails.unitsAvailable });
        dispatch({ type: "productImage", value: editDetails.productImage });
    }

    return (
        <Container className='my-3'>
            <Row className='justify-content-center'>
                <Col md={8}>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="product-name">Product</InputGroup.Text>
                        <Form.Control
                            placeholder="name"
                            aria-label="name"
                            aria-describedby="product-name"
                            onChange={(e) => { dispatch({ type: "name", value: e.target.value }) }}
                            value={inputState.name}
                        />
                    </InputGroup>
                </Col>
            </Row>
            <Row className='justify-content-center'>
                <Col md={8}>
                    <InputGroup className="mb-3">
                        <InputGroup.Text>description</InputGroup.Text>
                        <Form.Control as="textarea" aria-label="description"
                            onChange={(e) => { dispatch({ type: "description", value: e.target.value }) }}
                            value={inputState.description} />
                    </InputGroup>
                </Col>
            </Row>

            <Row className='justify-content-center'>
                <Col md={8}>
                    <InputGroup className="mb-3">
                        <InputGroup.Text>₹</InputGroup.Text>
                        <Form.Control aria-label="price"
                            onChange={(e) => { dispatch({ type: "price", value: e.target.value }) }}
                            value={inputState.price} />
                    </InputGroup>
                </Col>
            </Row>

            <Row className='justify-content-center'>
                <Col md={8}>
                    <InputGroup className="mb-3">
                        <InputGroup.Text>unitsAvailable</InputGroup.Text>
                        <Form.Control aria-label="units"
                            onChange={(e) => { dispatch({ type: "unitsAvailable", value: e.target.value }) }}
                            value={inputState.unitsAvailable} />
                    </InputGroup>
                </Col>
            </Row>

            <Row className='justify-content-center'>
                <Col md={8}>
                    <Form.Label htmlFor="Image-url">Product image URL</Form.Label>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="Image-url">
                            https://image.com
                        </InputGroup.Text>
                        <Form.Control id="Image-url" aria-describedby="Image-url"
                            onChange={(e) => { dispatch({ type: "productImage", value: e.target.value }) }}
                            value={inputState.productImage} />
                    </InputGroup>
                </Col>
            </Row>
            <Row className='justify-content-center'>
                <Col xs={4}>
                    <Button onClick={addProductFun}>{buttonName}</Button>
                </Col>
            </Row>
        </Container>
    )
}

//handling input details with reducer
function inputReducer(state, action) {
    switch (action.type) {
        case "name":
            return { ...state, name: action.value }
        case "description":
            return { ...state, description: action.value }
        case "price":
            return { ...state, price: action.value }
        case "unitsAvailable":
            return { ...state, unitsAvailable: action.value }
        case "productImage":
            return { ...state, productImage: action.value }
        default:
            return state;
    }
}