import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import Layout from "./components/Layout.js";
import ProductPage from "./components/ProductPage/ProductPage.js";
import { HomePage } from "./components/Home/HomePage.js";
import  ShoppingCart  from "./components/ShoppingCartPage.js";
import  Continue from "./components/Ordering/ContinuePage.js";
import  InputInfo from "./components/Ordering/InputPage.js";
import  Payment from "./components/Ordering/PaymentPage.js";
import  Confirmation from "./components/Ordering/ConfirmationPage.js";
import  Favorites from "./components/FavoritesPage.js"
import { CategoryPage } from "./components/CategoryPage.js";
import { SearchPage } from './components/SearchPage'
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
          <Route path="/favorieten" component={Favorites} />
        </div>
      </Layout>
      </Provider>
    );
  }
}
