import React, { Component } from 'react'

import productsService from './../../../service/products.service'

import { Container, Row } from 'react-bootstrap'

import SuggestionCard from './SuggestionCard'

class Suggestions extends Component {

    constructor(props) {
        super()
        this.state = {
            products: '',
            showSuggestion: false
        }
        this.productsService = new productsService()
    }


    componentDidMount = () => {
        this.loadProducts()
    }

    loadProducts = () => {
        this.productsService
            .getAllProducts()
            .then((response) => this.setState({ products: response.data }))
            .catch((err) => console.log("ERROR", err));
    }


    render() {

        const suggCopy = [...this.state.products]
        const suggFiltered = suggCopy.filter(elm => elm.name.includes(this.props.search))

        return (
            <>
                <Container >
                    <Row>
                        {suggFiltered.map(elm => <SuggestionCard onClick={() => this.props.hiddeSuggestion()} key={elm._id} {...elm} />)}
                    </Row>
                </Container>

            </>

        )

    }
}


export default Suggestions