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
      showModalEdit: false,
      favProdId: [],
    };
    this.productsService = new productsService();
  }

  receiveId = (receivedId) => {
    this.setState({ favProdId: receivedId }, () => this.addtoFav());
    console.log(receivedId);
  };

  addtoFav = () => {
    console.log("addToFav", this.state.favProdId);

    this.productsService
      .wishlist(this.props.loggedInUser._id, { favId: this.state.favProdId })
      .then((res) => res.json(res))
      .catch((err) => console.log(err));
  };

  componentDidMount = () => {
    this.loadProducts();
  };
  loadProducts = () => {
    this.productsService
      .getAllProducts()
      .then((response) => this.setState({ products: response.data }))
      .catch((err) => console.log("ERROR", err));
  };

  handleModalNew = (showModalNew) => {
    console.log({ showModalNew });

    this.setState({ showModalNew });
  };
  handleModalEdit = (showModalEdit) => this.setState({ showModalEdit });

  render() {
    return (
      <>
        <Container>
          {this.props.loggedInUser && this.props.loggedInUser.role === "admin" && (
            <Button onClick={() => this.handleModalNew(true)} size="sm">
              Create product{" "}
            </Button>
          )}
          {this.props.loggedInUser && this.props.loggedInUser.role === "admin" && (
            <Button onClick={() => this.handleModalEdit(true)} size="sm">
              Edit product{" "}
            </Button>
          )}
          <main>
            <h1> All products</h1>
            <Row>
              {this.state.products.length ? (
                this.state.products.map((elm) => (
                  <ProductCard
                    {...elm}
                    addToCart={() => this.props.addToCart(elm)}
                    key={elm._id}
                    quantity={elm.quantity}
                    increase={() => this.props.increase(elm)}
                    decrease={() => this.props.decrease(elm)}
                    receiveId={() => this.receiveId(elm._id)}
                    addtoFav={this.addtoFav}
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
