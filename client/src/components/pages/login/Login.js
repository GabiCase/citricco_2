import React, { Component } from "react";

import { Container, Row, Col, Form, Button } from "react-bootstrap";

import { Link } from 'react-router-dom'

import authService from "../../../service/auth.service";

class Login extends Component {
    constructor(props) {
        super();
        this.state = {
            username: '',
            password: ''
        };
        this.authService = new authService();


    }

    handleInputChange = e => {
        const { name, value } = e.target
        this.setState({ [name]: value })
    }

    handleFormSubmit = e => {
        e.preventDefault()
        this.authService
            .login(this.state)
            .then(response => {
                this.props.setTheUser(response.data)
                this.props.history.push("/account/profile")
            })
            .catch(err => console.log('ERROR', err))
    }

    render() {
        return (
            <>
                <div className="form-signup">
                    <Row className="justify-content-center">
                        <Col md={{ span: 4, offset: 3 }}>
                            <h3>Login</h3>
                            <Form onSubmit={this.handleFormSubmit}>
                                <Form.Group>
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control
                                        value={this.state.username}
                                        name="username"
                                        onChange={this.handleInputChange}
                                        type="text"
                                        placeholder="Give your product a name"
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>password</Form.Label>
                                    <Form.Control
                                        value={this.state.password}
                                        name="password"
                                        onChange={this.handleInputChange}
                                        type="password"
                                        placeholder="Give your product a price"
                                    />
                                </Form.Group>
                                <Button type="submit">Login</Button>
                            </Form>
                            <p>Don't have an account yet?<Link to="/account/signup">Signup</Link> </p>
                        </Col>
                    </Row>

                </div>
            </>
        );
    }
}

export default Login;
