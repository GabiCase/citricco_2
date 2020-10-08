import React from 'react'

import { Container, Row, Col, Button } from 'react-bootstrap'

import './Navbar.css'

import Counter from './../../shared/counter/Counter'

const CartCard = ({ image, name, quantity, price, removeFromCart, decrease, increase }) => {

    return (
        <>
            <Container className="bottom-20">
                <Row>
                    <Col >
                        <img className="payment-image" src={image} alt={name} />
                    </Col>
                    <Col>
                        <Counter quantity={quantity} decrease={decrease} increase={increase} />
                        <h3>{name}</h3>
                        <p>{price}€</p>
                        <Button onClick={removeFromCart}>Remove</Button>
                    </Col>
                </Row>






            </Container>
        </>
    )
}

export default CartCard