import React, { Component } from 'react'

import CartCard from './CartCard'

import { Container, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import productsService from './../../../service/products.service'

class Cart extends Component {
    constructor(props) {
        super()
        this.state = {
            cart: props.cart,
            total: props.total
        }
    }

    componentDidMount = () => this.props.calculateTotal(this.state.cart)

    render() {

        return (
            <Container>
                <div>
                    <h1>Cart</h1>
                    <Row>
                        <Col sm={12} md={5}>
                            {this.props.cart.length >= 1 ?

                                this.props.cart.map(elm => <CartCard key={elm._id} {...elm} removeFromCart={() => this.props.removeFromCart(elm)} decrease={() => this.props.decrease(elm)} increase={() => this.props.increase(elm)} />)
                                :
                                <>
                                    <h4>It appears that your cart is currently empty!</h4>
                                    <p>Start shopping</p><Link to="/products/all">here</Link>
                                </>
                            }
                            <p>Total: {this.props.total}€</p>
                            {/* this.props.calculateTotal(this.state.cart) */}

                        </Col>
                        <Col sm={12} md={5}>
                            <h3> Datos de envío</h3>
                        </Col>
                    </Row>

                </div>


            </Container>
        )
    }
}

export default Cart