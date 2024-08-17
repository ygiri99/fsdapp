import React, { useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { productContext } from '../context/AppContextProvider';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Row, Col, Container } from 'react-bootstrap';
import { deleteProduct, getProducts } from '../components/ProductAPIs';

export default function ProductHandle() {

    let { product, setProduct, editDetails, setEditDetails } = useContext(productContext);
    const navigate = useNavigate();

    //loading products
    const loadProduct = async () => {
        const response = await getProducts();
        setProduct(response);
    }

    useEffect(() => {
        loadProduct();
    }, [])

    //setting details and calling Edit
    function editProductFun(item) {
        setEditDetails({ ...editDetails, edit: true, ...item });
        navigate('/addproduct');
    }

    //Confirming to Deleting Product 
    async function deleteProductFun(item) {
        let result = window.confirm(`Are you sure to delete product ${item.name}`);
        if (result) {
            await deleteProduct(item._id);
            loadProduct();
        }
        else return;
    }

    return (
        <Container className="my-3">
            <Link to={"/addproduct"} className='p-3 text-decoration-none'><h3>Add Product</h3></Link>
            <Row className='gap-3'>
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
                                <div className='d-flex justify-content-evenly'>
                                    <Button variant="warning" onClick={() => editProductFun(item)}>Edit</Button>
                                    <Button variant="danger" onClick={() => deleteProductFun(item)}>Delete</Button>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                ))) : <p>Loading....</p>}
            </Row>
        </Container>
    )
}