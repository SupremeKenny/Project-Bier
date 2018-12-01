import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import Layout from "./components/Layout.js";
import ProductPage from "./components/ProductPage/product-page.js";
import { HomePage } from "./components/HomePage.js";
import  ShoppingCart  from "./components/ShoppingCartPage.js";
import  Continue from "./components/ContinuePage.js";
import  InputInfo from "./components/InputPage.js";
import  Payment from "./components/PaymentPage.js";
import  Confirmation from "./components/ConfirmationPage.js";
import { CategoryPage } from "./components/CategoryPage.js";
import { SearchPage } from './components/search-page.js'
import { Provider } from "react-redux";
import { LoginPage } from "./components/Login/LoginPage";
import store from "./store";

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
          <Route path="/doorgaan" component={Continue} />
          <Route path="/input" component={InputInfo} />
          <Route path="/payment" component={Payment} />
          <Route path="/confirmation" component={Confirmation} />
          <Route path="/category/:id" component={CategoryPage} />
          <Route path="/zoeken/:query" component={SearchPage} />
          <Route path="/account/inloggen" component={LoginPage} />
        </div>
      </Layout>
      </Provider>
    );
  }
}
