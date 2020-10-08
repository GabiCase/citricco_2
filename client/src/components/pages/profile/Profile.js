import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { Container } from 'react-bootstrap'

import authService from './../../../service/auth.service'

export default class extends Component {

    constructor(props) {
        super()
        this.state = {}

    }


    render() {

        return (
            <>

                < Container >
                    <h2>Welcome, {this.props.loggedInUser.username}!</h2>
                </Container >
            </>


        )
    }


}