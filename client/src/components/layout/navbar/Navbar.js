import React, { Component } from "react";
import { Link } from "react-router-dom";

import "./Navbar.css";

import cart from "./images/cart.png";
import search from "./images/search.png";
import user from "./images/user.png";
import {
  Navbar,
  Nav,
  Form,
  FormControl,
  NavDropdown,
  Button,
} from "react-bootstrap";

import authService from "./../../../service/auth.service";
import Suggestions from "./Suggestions";
import ProfileDrop from "./ProfileDrop";

export default class extends Component {
  constructor(props) {
    super();
    this.state = {
      cartQuantity: 0,
      search: "",
      showSuggestion: false,
      showProfileDrop: false,

      // user: '',
      // showModal: false
    };
    this.authService = new authService();
  }
  handleChange = (e) => {
    const quantity = [...this.state.cartQuantity];
    this.props.cartChanged(e.target.quantity);
  };

  logoutUser = () => {
    this.authService
      .logout()
      .then(() => this.props.setTheUser(null))
      .catch((err) => console.log("ERROR", err));
  };

  getCartTotal = () => {
    return this.props.cart.reduce((sum, { quantity }) => sum + quantity, 0);
  };

  handleInputChange = (e) => {
    let { name } = e.target;
    let value = name === "checked" ? e.target.checked : e.target.value;
    this.setState({ [name]: value, showSuggestion: true });
  };

  hiddeSuggestion = () => {
    this.setState({ showSuggestion: false });
  };

  render() {
    return (
      <>
        <Navbar bg="light" expand="lg" onClick={() => this.hiddeSuggestion()}>
          <Link to="/">
            <Navbar.Brand>Citricco-logo</Navbar.Brand>
          </Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <NavDropdown
                title="Pendientes"
                id="basic-nav-dropdown"
                className="earrings"
              >
                <NavDropdown.Item>
                  <Link to="/products/hoops" className="dropdown-item">
                    Aros
                  </Link>
                </NavDropdown.Item>

                <NavDropdown.Item>
                  <Link to="/products/pendants" className="dropdown-item">
                    Colgantes
                  </Link>
                </NavDropdown.Item>

                <NavDropdown.Divider />

                <NavDropdown.Item>
                  <Link className="dropdown-item" to="/products/all">
                    Ver todo
                  </Link>
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>

            <Form inline>
              <FormControl
                type="text"
                placeholder="Search"
                className="mr-sm-2"
                name="search"
                value={this.state.search}
                onChange={this.handleInputChange}
              />
            </Form>
            <Button className="nav-link btn-image">
              <img className="cart-img" src={search} />
            </Button>

            {this.props.loggedInUser ? (
              this.props.loggedInUser && (
                <Link className="nav-link" to="/account/profile">
                  <NavDropdown
                    className="user-logo transparent"
                    title=""
                    id="basic-nav-dropdown"
                  >
                    <NavDropdown.Item>
                      <Link className="dropdown-item" to="/account/profile">
                        My profile
                      </Link>
                    </NavDropdown.Item>

                    <NavDropdown.Item>
                      <Link className="dropdown-item" to="account/orderhistory">
                        Order history
                      </Link>
                    </NavDropdown.Item>

                    <NavDropdown.Item>
                      <Link className="dropdown-item" to="account/whislist">
                        My whislist
                      </Link>
                    </NavDropdown.Item>

                    <NavDropdown.Item>
                      <Link
                        className="dropdown-item"
                        to="account/logout"
                        onClick={() => this.logoutUser()}
                      >
                        Logout
                      </Link>
                    </NavDropdown.Item>
                  </NavDropdown>
                </Link>
              )
            ) : (
              <Link className="nav-link" to="/account/login">
                <img className="cart-img" src={user} />
              </Link>
            )}

            <Link className="nav-link" to="/cart">
              <img className="cart-img" src={cart} />
              {this.getCartTotal()}
            </Link>
          </Navbar.Collapse>
        </Navbar>

        <div>
          {this.state.showSuggestion && (
            <Suggestions
              hiddeSuggestion={this.hiddeSuggestion}
              search={this.state.search}
            />
          )}
        </div>
      </>
    );
  }
}
