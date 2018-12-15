import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
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
import LoginPage from "./components/Login/LoginPage";
import Registration from "./components/Registration/Registration.js";
import Checkout from "./components/Ordering/Checkout.js";

import { loadState, saveState } from "./localStorage.js";
import { createStore } from "redux";
import reducer from "./reducers";
import throttle from "lodash/throttle";
import Overview from "./components/Ordering/Overview.js";

import { AdminPage } from "./components/AdminPage.js";
import { Home } from "./components/AdminPage/Home.js";

import { AllProducts } from "./components/AdminPage/Products/AllProducts.js";
import { AddProducts } from "./components/AdminPage/Products/AddProduct.js";
import { EditProducts } from "./components/AdminPage/Products/EditProduct.js";
import { SearchProduct } from "./components/AdminPage/Products/SearchProduct.js";

import { AllUsers } from "./components/AdminPage/Users/AllUsers.js";
import { AddUser } from "./components/AdminPage/Users/AddUser.js";

import AccountOverview from "./components/User/AccountOverview.js";

const persistedState = loadState();
const store = createStore(reducer, persistedState);

store.subscribe(
  throttle(() => {
    saveState(store.getState());
  }),
  1000
);

//TODO if layout is set to null throw error
const AppRoute = ({ component: Component, layout: Layout, ...rest }) => (
  <Route
    {...rest}
    render={props => (
      <Layout>
        <Component {...props} />
      </Layout>
    )}
  />
);

export default class App extends Component {
  displayName = App.name;

  render() {
    return (
      <Provider store={store}>
        <div>
          <Switch>
            <AppRoute exact path="/" layout={Layout} component={HomePage} />
            <AppRoute
              path="/product/:id"
              layout={Layout}
              component={ProductPage}
            />
            <AppRoute
              path="/winkelwagen"
              component={ShoppingCart}
              layout={Layout}
            />
            <AppRoute path="/checkout" component={Checkout} layout={Layout} />
            <AppRoute
              path="/bestellengast"
              layout={Layout}
              component={InputInfo}
            />
            <AppRoute path="/betalen/:id" component={Payment} layout={Layout} />
            <AppRoute
              path="/confirmation"
              layout={Layout}
              component={Confirmation}
            />
            <AppRoute path="/overzicht" component={Overview} layout={Layout} />
            <AppRoute
              path="/category/:id"
              layout={Layout}
              component={CategoryPage}
            />
            <AppRoute
              path="/zoeken/:query"
              layout={Layout}
              component={SearchPage}
            />
            <AppRoute
              path="/account/inloggen"
              layout={Layout}
              component={LoginPage}
            />
            <AppRoute
              path="/account/registreren"
              layout={Layout}
              component={Registration}
            />
            <AppRoute
              path="/favorieten"
              component={Favorites}
              layout={Layout}
            />

            <AppRoute
              path="/account/overzicht"
              component={AccountOverview}
              layout={Layout}
            />

            {/* Admin Routes */}
            <AppRoute path="/admin" layout={AdminPage} component={Home} />
            <AppRoute
              path="/admin-searchProduct"
              layout={AdminPage}
              component={SearchProduct}
            />
            <AppRoute
              path="/admin-addProduct"
              layout={AdminPage}
              component={AddProducts}
            />
            <AppRoute
              path="/admin-allProducts"
              layout={AdminPage}
              component={AllProducts}
            />
            <AppRoute
              path="/admin-addUser"
              layout={AdminPage}
              component={AddUser}
            />
            <AppRoute
              path="/admin-allUsers"
              layout={AdminPage}
              component={AllUsers}
            />
            <AppRoute
              path="/admin-accountSettings"
              layout={AdminPage}
              component={Home}
            />
            <AppRoute
              path="/admin-editProduct/:id"
              layout={AdminPage}
              component={EditProducts}
            />
          </Switch>
        </div>
      </Provider>
    );
  }
}
