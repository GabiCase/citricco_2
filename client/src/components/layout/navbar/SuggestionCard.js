import React from 'react'

import { Col } from 'react-bootstrap'

import { Link } from 'react-router-dom'

const SuggestionCard = ({ name, image, price, _id }) => {

    return (
        <>

            <Col sm={12} md={4} lg={2} className="col-suggestion">
                <Link to={`/products/details/${_id}`}>
                    <div className="card-suggestion">
                        <img variant="top" src={image} alt={name} />
                        <p>{name} </p>
                        <p>{price}€</p>
                    </div>
                </Link>

            </Col>

        </>

    )
}

export default SuggestionCard