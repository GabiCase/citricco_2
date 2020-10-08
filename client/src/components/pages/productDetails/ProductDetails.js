import React, { Component } from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

import productService from "./../../../service/products.service";

import Counter from './../../shared/counter/Counter'

class ProductDetails extends Component {
  constructor(props) {
    super();
    this.state = {
      product: undefined

      //aquí está llegando
    };
    this.productService = new productService();
  }

  componentDidMount() {

    this.productService
      .getOneProduct(this.props.match.params.product_id)
      .then((res) => this.setState({ product: res.data }))
      .catch((err) => console.log(err));

  }

  render() {

    return (
      <div>{this.state.product &&
        <>
          <Container className="details">

            <main>
              <Row>
                <Col sm={12} md={5}>
                  <img src={this.state.product.image} alt={this.state.product.name} />
                </Col>
                <Col sm={12} md={4}>
                  <h4>{this.state.product.name}</h4>
                  {this.state.product.description}

                  <div>{this.state.product.price}€</div>
                  <div>{this.state.product.category}</div>
                  <div className="buttons">
                    <div className="counter">
                      <Counter quantity={this.state.product.quantity} increase={() => this.props.increase(this.state)} decrease={() => this.props.decrease(this.state)} />
                    </div>

                    <Button>Add to cart</Button>
                    <Button>Add to wishlist</Button>
                  </div>
                </Col>
              </Row>
            </main>
          </Container>
        </>
      }
      </div>
    );
  }
}

export default ProductDetails;
