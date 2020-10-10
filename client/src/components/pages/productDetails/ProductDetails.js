import React, { Component } from "react";

import { Button, Modal, Col, Row, Container } from "react-bootstrap";

import productService from "./../../../service/products.service";

import Counter from "./../../shared/counter/Counter";

import EditProduct from "../editProduct/EditProduct";

class ProductDetails extends Component {
  constructor(props) {
    super();
    this.state = {
      product: undefined,
      showModalEdit: false,

      //aquí está llegando
    };
    this.productService = new productService();
  }

  handleModalEdit = (showModalEdit) => this.setState({ showModalEdit });

  componentDidMount = () => this.loadProducts();

  delete = () => {
    this.productService
      .deleteProduct(this.props.match.params.product_id)
      .then(() => this.props.history.push("/products/all"))
      .catch((err) => console.log(err));
  };

  loadProducts = () => {
    this.productService
      .getOneProduct(this.props.match.params.product_id)
      .then((res) => this.setState({ product: res.data }))

      .catch((err) => console.log(err));
  };

  render() {
    return (
      <div>
        {this.state.product && (
          <>
            <Container className="details">
              <main>
                <Row>
                  <Col sm={12} md={5}>
                    <img
                      src={this.state.product.image}
                      alt={this.state.product.name}
                    />
                  </Col>
                  <Col sm={12} md={4}>
                    <h4>{this.state.product.name}</h4>
                    {this.state.product.description}

                    <div>{this.state.product.price}€</div>
                    <div>{this.state.product.category}</div>
                    <div className="buttons">
                      <div className="counter">
                        <Counter
                          quantity={this.state.product.quantity}
                          increase={() => this.props.increase(this.state)}
                          decrease={() => this.props.decrease(this.state)}
                        />
                      </div>

                      <Button>Add to cart</Button>
                      <Button>Add to wishlist</Button>
                      {this.props.loggedInUser &&
                        this.props.loggedInUser.role === "admin" && (
                          <Button
                            onClick={() => this.handleModalEdit(true)}
                            size="sm"
                          >
                            Edit product
                          </Button>
                        )}
                      {this.props.loggedInUser &&
                        this.props.loggedInUser.role === "admin" && (
                          <Button onClick={this.delete} size="sm">
                            Delete product
                          </Button>
                        )}
                    </div>
                  </Col>
                </Row>
              </main>
            </Container>
            <Modal
              show={this.state.showModalEdit}
              onHide={() => this.handleModalEdit(false)}
            >
              <Modal.Header closeButton>
                <Modal.Title>Edit product</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <EditProduct
                  product={this.state.product}
                  closeModal={() => this.handleModalEdit(false)}
                  refreshList={this.loadProducts}
                />
              </Modal.Body>
            </Modal>
          </>
        )}
      </div>
    );
  }
}

export default ProductDetails;
