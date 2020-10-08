import React from "react";
import { Link } from "react-router-dom";

import { Card, Button, Col } from "react-bootstrap";

export default ({ props, _id, name, image, price, addToCart, quantity, increase, decrease }) => {

  return (
    <Col sm={12} md={4} lg={3}>
      <Card className="card-list">
        <Card.Img className="300product" variant="top" src={image} />
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <Card.Title>{price}€</Card.Title>

          <Button onClick={addToCart} variant="sm">Add to cart</Button>

          <Link to={`/products/details/${_id}`} increase={() => increase(props.product)} decrease={decrease}>
            <Button variant="sm">Details</Button>
          </Link>
        </Card.Body>
      </Card>
    </Col>
  );
};
