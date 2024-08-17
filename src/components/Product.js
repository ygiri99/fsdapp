import React, { useEffect, useContext } from 'react';
import { productContext } from '../context/AppContextProvider';
import { getProducts } from './ProductAPIs';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Row, Col, Container } from 'react-bootstrap';

export default function Product() {

    const { product, dispatch, setProduct } = useContext(productContext);

    const loading = async () => {
        const data = await getProducts();
        setProduct(data);
    };

    //loading Products initially
    useEffect(() => {
        loading();
    }, [])

    return (
        <Container className='my-3'>
            <Row className='gap-2'>
                {product.length !== 0 ? (product.map((item, index) => (
                    <Col key={index}>
                        <Card style={{ width: '18rem' }}>
                            <Card.Img variant="top" src={item.productImage} />
                            <Card.Body>
                                <Card.Title>{item.name}</Card.Title>
                                <Card.Text>
                                    {item.description}
                                </Card.Text>
                                <p>Price: {item.price}</p>
                                <Button variant="primary" onClick={() => dispatch({ type: "add", productToAdd: item })}>Add To Cart</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))) : <p>Loading....</p>}
            </Row>
        </Container>
    )
}
