import React, { Component } from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import "./ProductList.css";

import productsService from "../../../service/products.service";
import ProductCard from "./ProductCard";
import NewProduct from "../newProduct/NewProduct";
//import Wishlist from "../Wishlist";

import Spinner from "./../../shared/spinner/Spinner";

class ProductsList extends Component {
  constructor(props) {
    super();
    this.state = {
      products: [],
      showModalNew: false,
    };
    this.productsService = new productsService();
  }

  // receiveIdRemove = (receivedId) => {
  //   this.setState({ favProdId: receivedId }, () => this.removeFromFav());
  // };
  // receiveIdAdd = (receivedId) => {
  //   this.setState({ favProdId: receivedId }, () => this.addToFav());
  // };

  componentDidMount = () => {
    this.loadProducts();
  };
  loadProducts = () => {
    console.log("estoy refrescando");
    this.productsService
      .getAllProducts()
      .then((response) => this.setState({ products: response.data }))
      .catch((err) => console.log("ERROR", err));
  };

  handleModalNew = (showModalNew) => {
    this.setState({ showModalNew });
  };

  render() {
    return (
      <>
        <Container>
          {this.props.loggedInUser && this.props.loggedInUser.role === "admin" && (
            <Button onClick={() => this.handleModalNew(true)} size="sm">
              Create product{" "}
            </Button>
          )}

          <main>
            <h1> All products</h1>
            <Row>
              {this.state.products.length ? (
                this.state.products.map((elm) => (
                  <ProductCard
                    loggedInUser={this.props.loggedInUser}
                    {...elm}
                    addToCart={() => this.props.addToCart(elm)}
                    key={elm._id}
                    quantity={elm.quantity}
                    increase={() => this.props.increase(elm)}
                    decrease={() => this.props.decrease(elm)}
                    refreshList={this.loadProducts}
                  />
                ))
              ) : (
                <Spinner />
              )}
            </Row>
          </main>
        </Container>

        <Modal
          show={this.state.showModalNew}
          onHide={() => this.handleModalNew(false)}
        >
          <Modal.Header closeButton>
            <Modal.Title>New product</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <NewProduct
              closeModal={() => this.handleModalNew(false)}
              refreshList={this.loadProducts}
            />
          </Modal.Body>
        </Modal>
      </>
    );
  }
}

export default ProductsList;
