import React, { useContext } from 'react'
import { productContext } from '../context/AppContextProvider';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';

export default function Cart() {

    //Hadling cart using reducer
    const { state, dispatch } = useContext(productContext);

    return (
        <div>
            <h3 className='text-center text-danger opacity-75'>Cart</h3>
            <Container>
                {state.cartItems.length !== 0 ?
                    <>
                        <Row>
                            {state.cartItems.map((item, index) => (
                                <Col key={index}>
                                    <Card style={{ width: '18rem' }}>
                                        <Card.Img variant="top" src={item.productImage} />
                                        <Card.Body>
                                            <Card.Title>{item.name}</Card.Title>
                                            <Card.Text>
                                                {item.description}
                                            </Card.Text>
                                            <span>Price: {item.price}</span>
                                            <div className='d-flex align-items-center'>
                                                <button className='border-info border border-4 rounded-circle px-2' onClick={() => dispatch({ type: "decrease", productId: item._id })}>-</button>
                                                <span className='p-3'>Qty: {item.qty}</span>
                                                <button className='border-success border border-4 rounded-circle px-1' onClick={() => dispatch({ type: "increase", productId: item._id })}>+</button>
                                            </div>
                                            <Button variant="primary" onClick={() => dispatch({ type: "remove", productId: item._id })}>Remove</Button>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                        <Row className='justify-content-center'>
                            <Col md={6}>
                                <h4 className='text-center mt-2 p-3 border border-3 border-info rounded'>Total Amout: {state.totalAmount.toFixed(2)}</h4>
                            </Col>
                        </Row>
                    </>
                    : <h3 className='text-center'>Cart is Empty</h3>}
            </Container>
        </div>
    )
}
