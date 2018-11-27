import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Layout from "./components/Layout.js";
import ProductPage from "./components/ProductPage/product-page.js";
import { HomePage } from "./components/HomePage.js";
import ShoppingCart from "./components/ShoppingCartPage.js";
import Continue from "./components/ContinuePage.js";
import InputInfo from "./components/InputPage.js";
import Payment from "./components/PaymentPage.js";
import Confirmation from "./components/ConfirmationPage.js";
import { CategoryPage } from "./components/CategoryPage.js";
import { Provider } from "react-redux";
import store from "./store";
import { AdminPage } from "./components/AdminPage.js";
import { Counter } from "./components/AdminPage/Counter.js";
import { Home } from "./components/AdminPage/Home.js";
import {AllProducts} from "./components/AdminPage/AllProducts.js"
import {AllUsers} from "./components/AdminPage/AllUsers.js";
import {AddProducts} from "./components/AdminPage/AddProduct.js";


const AppRoute = ({ component: Component, layout: Layout, ...rest }) => (
  <Route {...rest} render={props => (
    <Layout>
      <Component {...props} />
    </Layout>
  )} />
)

export default class App extends Component {
  displayName = App.name;

  render() {
    return (
      <Provider store={store}>
        <div>
          <Switch>
            <AppRoute exact path="/" layout={Layout} component={HomePage} />
            <AppRoute path="/product/:id" layout={Layout} component={ProductPage} />
            <AppRoute path="/winkelwagen" layout={Layout} component={ShoppingCart} />
            <AppRoute path="/doorgaan" layout={Layout} component={Continue} />
            <AppRoute path="/input" layout={Layout} component={InputInfo} />
            <AppRoute path="/payment" layout={Layout} component={Payment} />
            <AppRoute path="/confirmation" layout={Layout} component={Confirmation} />
            <AppRoute path="/category/:id" layout={Layout} component={CategoryPage} />

            {/* Admin Routes */}
            <AppRoute path="/admin" layout={AdminPage} component={Home} />
            <AppRoute path="/admin-searchProduct" layout={AdminPage} component={Counter} />
            <AppRoute path="/admin-addProduct" layout={AdminPage} component={AddProducts} />
            <AppRoute path="/admin-allProducts" layout={AdminPage} component={AllProducts} />
            <AppRoute path="/admin-addUser" layout={AdminPage} component={Home} />
            <AppRoute path="/admin-allUsers" layout={AdminPage} component={AllUsers} />
            <AppRoute path="/admin-accountSettings" layout={AdminPage} component={Home} />
          </Switch>
        </div>
      </Provider>
    );
  }
}