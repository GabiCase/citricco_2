import React, { Component } from "react";
import { Button, Form } from "react-bootstrap";

import "./NewProduct.css";

import productService from "./../../../service/products.service";

class NewProduct extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      description: "",
      price: "",
      category: "",
      image: "",

    };
    this.productService = new productService();
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleFormSubmit = (e) => {
    e.preventDefault();
    this.productService
      .newProduct(this.state)
      .then(() => {
        this.props.closeModal();
        this.props.refreshList();
      })

      .catch((err) => console.log("Error", { err }));
  };

  render() {
    return (
      <>
        <div className="form-newProduct">
          <h3>Create new product</h3>
          <Form onSubmit={this.handleFormSubmit}>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control
                value={this.state.name}
                name="name"
                onChange={this.handleInputChange}
                type="text"
                placeholder="Give your product a name"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Price</Form.Label>
              <Form.Control
                value={this.state.price}
                name="price"
                onChange={this.handleInputChange}
                type="text"
                placeholder="Give your product a price"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Image URL</Form.Label>
              <Form.Control
                value={this.state.image}
                name="image"
                onChange={this.handleInputChange}
                type="text"
                placeholder="Give your product an image"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control
                value={this.state.description}
                name="description"
                onChange={this.handleInputChange}
                as="textarea"
                rows="3"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Category</Form.Label>
              <Form.Control
                value={this.state.category}
                name="category"
                onChange={this.handleInputChange}
                as="select"
              >
                <option>Select</option>
                <option value="aros">Aros</option>
                <option value="colgantes">Colgantes</option>
              </Form.Control>
            </Form.Group>
            <Button type="submit">Create product</Button>
          </Form>
        </div>
      </>
    );
  }
}

export default NewProduct;
