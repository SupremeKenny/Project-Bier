import React, { Component } from "react";
import { Route } from "react-router-dom";
import Layout from "./components/Layout.js";
import ProductPage from "./components/ProductPage/ProductPage.js";
import { HomePage } from "./components/Home/HomePage.js";
import ShoppingCart from "./components/ShoppingCartPage.js";
import InputInfo from "./components/Ordering/GuestOrderForm.js";
import Payment from "./components/Ordering/PaymentPage.js";
import Confirmation from "./components/Ordering/ConfirmationPage.js";
import Favorites from "./components/FavoritesPage.js";
import { CategoryPage } from "./components/CategoryPage.js";
import { SearchPage } from "./components/SearchPage";
import { Provider } from "react-redux";
import { LoginPage } from "./components/Login/LoginPage";
import Registration from "./components/Registration/Registration.js";
import store from "./store";
import Checkout from "./components/Ordering/Checkout.js";

export default class App extends Component {
  displayName = App.name;

  render() {
    return (
      <Provider store={store}>
        <Layout>
          <div>
            <Route exact path="/" component={HomePage} />
            <Route path="/product/:id" component={ProductPage} />
            <Route path="/winkelwagen" component={ShoppingCart} />
            <Route path="/checkout" component={Checkout} />
            <Route path="/bestellengast" component={InputInfo} />
            <Route path="/betalen/:id" component={Payment} />
            <Route path="/confirmation" component={Confirmation} />
            <Route path="/category/:id" component={CategoryPage} />
            <Route path="/zoeken/:query" component={SearchPage} />
            <Route path="/account/inloggen" component={LoginPage} />
            <Route path="/account/registreren" component={Registration} />
            <Route path="/favorieten" component={Favorites} />
          </div>
        </Layout>
      </Provider>
    );
  }
}
