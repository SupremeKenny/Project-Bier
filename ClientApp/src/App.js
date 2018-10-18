import React, { Component } from "react";
import { Route, Router } from "react-router-dom";
import Layout from "./components/Layout.js";
import ProductPage from "./components/ProductPage/product-page.js";
import { HomePage } from "./components/HomePage.js";
import  ShoppingCart  from "./components/ShoppingCartPage.js";
import { CategoryPage } from "./components/CategoryPage.js";
import { Provider } from "react-redux";
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
          <Route path="/category/:id" component={CategoryPage} />
        </div>
      </Layout>
      </Provider>
    );
  }
}
