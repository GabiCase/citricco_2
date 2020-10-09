import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import "./App.css";

import Navigation from "./layout/navbar/Navbar";
import Footer from "./layout/footer/Footer";

import Index from "./pages/index/Index";

import ProductsList from "./pages/productList/ProductList";
import ProductDetails from "./pages/productDetails/ProductDetails";
import NewProduct from "./pages/newProduct/NewProduct";
import Signup from "./pages/signup/Signup";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import Cart from "./layout/navbar/Cart";

import authService from "./../service/auth.service";

class App extends Component {
  constructor() {
    super();
    this.state = {
      loggedInUser: undefined,
      cart: [],
      total: 0,
      quantity: 0,
    };
    this.authService = new authService();
  }

  setTheUser = (user) =>
    this.setState({ loggedInUser: user }, () =>
      console.log("El usuario es", this.state.loggedInUser)
    );

  componentDidMount = () => {
    this.authService
      .loggedin()
      .then((res) => this.setState({ loggedInUser: res.data }))
      .catch((err) => this.setState({ loggedInUser: null }));
  };

  addToCart = (product) => {
    const cartCopy = [...this.state.cart];
    let itemInCart = cartCopy.find((elm) => elm.name === product.name);

    if (itemInCart) {
      itemInCart.quantity++;
    } else {
      itemInCart = {
        ...product,
        quantity: 1,
      };
      cartCopy.push(itemInCart);
    }
    this.setState({ cart: cartCopy });
  };

  removeFromCart = (productToRemove) => {
    const cartUpdated = this.state.cart.filter(
      (product) => product !== productToRemove
    );
    this.setState({ cart: cartUpdated });
    //console.log('hola')
    //console.log('soy el cartupdated', this.state.cart)
    this.calculateTotal(cartUpdated);
  };

  decrease = (product) => {
    const decreaseCart = [...this.state.cart];
    let itemDecrease = decreaseCart.find((elm) => elm._id === product._id);
    //console.log(product)
    if (itemDecrease.quantity > 0) {
      itemDecrease.quantity--;
    } else {
      itemDecrease.quantity = 0;
    }
    this.setState({ cart: decreaseCart });
    this.calculateTotal(decreaseCart);
  };

  increase = (product) => {
    const increaseCart = [...this.state.cart];
    let itemIncrease = increaseCart.find((elm) => elm._id === product._id);
    itemIncrease && itemIncrease.quantity >= 0
      ? itemIncrease.quantity++
      : (itemIncrease.quantity = 0);
    // if (itemIncrease.quantity >= 0) {
    //   itemIncrease.quantity++;
    //   console.log('SOY LA CANTIDAD DEL INCREASE', itemIncrease.quantity)
    // } else {
    //   itemIncrease.quantity = 0
    // }
    this.setState({ cart: increaseCart });
    this.calculateTotal(increaseCart);
  };

  calculateTotal = (cart) => {
    let totalSum = 0;
    cart.map((elm) => (totalSum += elm.price * elm.quantity));
    this.setState({ total: totalSum });
  };

  render() {
    return (
      <>
        <Navigation
          cart={this.state.cart}
          cartChanged={this.cartChanged}
          setTheUser={this.setTheUser}
          loggedInUser={this.state.loggedInUser}
        />
        <Switch>
          <Route path="/" exact render={() => <Index />} />
          <Route
            path="/products/all"
            render={() => (
              <ProductsList
                addToCart={this.addToCart}
                setTheUser={this.setTheUser}
                loggedInUser={this.state.loggedInUser}
              />
            )}
          />
          <Route
            path="/products/details/:product_id"
            render={(props) => (
              <ProductDetails
                setTheUser={this.setTheUser}
                {...props}
                quantity={this.state.quantity}
                decrease={this.decrease}
                increase={this.increase}
              />
            )}
          />
          <Route
            path="/products/newProduct"
            render={(props) => <NewProduct {...props} />}
          />
          <Route
            path="/account/signup"
            render={(props) => (
              <Signup setTheUser={this.setTheUser} {...props} />
            )}
          />
          <Route
            path="/account/login"
            render={(props) => (
              <Login setTheUser={this.setTheUser} {...props} />
            )}
          />
          <Route
            path="/account/profile"
            render={(props) =>
              this.state.loggedInUser ? (
                <Profile loggedInUser={this.state.loggedInUser} {...props} />
              ) : (
                <Redirect to="/account/login" />
              )
            }
          />
          <Route
            path="/cart"
            render={() => (
              <Cart
                cart={this.state.cart}
                total={this.state.total}
                addToCart={this.addToCart}
                removeFromCart={this.removeFromCart}
                calculateTotal={this.calculateTotal}
                decrease={this.decrease}
                increase={this.increase}
              />
            )}
          />
        </Switch>

        <Footer />
      </>
    );
  }
}

export default App;
