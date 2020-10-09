import React, { Component } from "react";
import { Link } from "react-router-dom";

import fav from "./images/heart-pressed.png";
import unfav from "./images/heart-empty.png";

import { Card, Button, Col } from "react-bootstrap";
class ProductCard extends Component {
  constructor(props) {
    super();
    this.state = {
      fav: false,
    };
  }
  toggleFav = () => {
    this.setState({ fav: !this.state.fav }, this.props.receiveId);
  };

  render() {
    return (
      <Col sm={12} md={4} lg={3}>
        <Card className="card-list">
          <Card.Img
            className="300product"
            variant="top"
            src={this.props.image}
          />
          <Card.Body>
            <div className="card-component">
              <Card.Title>{this.props.name}</Card.Title>
              {this.state.fav ? (
                <img onClick={() => this.toggleFav()} src={fav} />
              ) : (
                <img onClick={() => this.toggleFav()} src={unfav} />
              )}
            </div>

            <Card.Title>{this.props.price}€</Card.Title>

            <Button onClick={this.props.addToCart} variant="sm">
              Add to cart
            </Button>

            <Link
              to={`/products/details/${this.props._id}`}
              increase={() => this.props.increase(this.props.product)}
              decrease={this.props.decrease}
            >
              <Button variant="sm">Details</Button>
            </Link>
            
          </Card.Body>
        </Card>
      </Col>
    );
  }
}

export default ProductCard;
