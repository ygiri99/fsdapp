import React, { useContext } from 'react';
import { Navbar, Container, Col } from 'react-bootstrap';
import { BsCart } from "react-icons/bs";
import { FaRegCircleUser } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import { productContext } from '../context/AppContextProvider';

export default function Header() {

    //To handle cartQuantity
    const { state } = useContext(productContext);

    return (
        <Navbar className="bg-warning opacity-75">
            <Container>
                <img
                    src="/logo.png"
                    width="30"
                    height="30"
                    className="d-inline-block align-top rounded-circle"
                    alt="Shopping logo"
                />
                <Link to={"/"} className='text'
                >
                    Products
                </Link>
                <Link to={"/productadmin"} className='text'>
                    HandleProd
                </Link>
                <div className='d-flex align-items-center'>
                    <FaRegCircleUser />
                    <span className='gap'></span>
                    <Link to={"/cart"}><BsCart /></Link>{state.cartQuantity}
                </div>
            </Container>
        </Navbar>
    )
}
