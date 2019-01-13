import React, {Component} from 'react';
import {Switch, Route} from 'react-router-dom';
import Layout from './components/Layout.js';
import ProductPage from './components/ProductPage/ProductPage.js';
import {HomePage} from './components/Home/HomePage.js';
import ShoppingCart from './components/ShoppingCartPage.js';
import InputInfo from './components/Ordering/GuestOrderForm.js';
import Payment from './components/Ordering/PaymentPage.js';
import Confirmation from './components/Ordering/ConfirmationPage.js';
import Favorites from './components/FavoritesPage.js';
import {CategoryPage} from './components/CategoryPage.js';
import {SearchPage} from './components/SearchPage';
import {Provider} from 'react-redux';
import LoginPage from './components/Login/LoginPage';
import Registration from './components/Registration/Registration.js';
import Checkout from './components/Ordering/Checkout.js';
import Overview from './components/Ordering/Overview.js';
import AccountOverview from './components/User/AccountOverview.js';
import {GenericNotFound} from './components/GenericNotFound';

// Admin Components
import AdminPage from './components/AdminPage.js';
import {AllProducts} from './components/AdminPage/Products/AllProducts.js';
import {AddProducts} from './components/AdminPage/Products/AddProduct.js';
import {EditProducts} from './components/AdminPage/Products/EditProduct.js';
import {AllUsers} from './components/AdminPage/Users/AllUsers.js';
import {EditUser} from './components/AdminPage/Users/EditUser.js';
import {AllDiscounts} from './components/AdminPage/Discounts/AllDiscount';
import {EditDiscount} from './components/AdminPage/Discounts/EditDiscount';
import {AddDiscount} from './components/AdminPage/Discounts/AddDiscount';
import {Turnover} from './components/AdminPage/Visualization/Turnover';
import {Popularbeers} from './components/AdminPage/Visualization/Popularbeers';
import {Populardiscounts} from './components/AdminPage/Visualization/Populardiscounts';

// Components and methods
import {AppRoute} from './AppRoute.js';
import {loadState, saveState} from './localStorage.js';
import {createStore} from 'redux';
import reducer from './reducers';
import throttle from 'lodash/throttle';

const persistedState = loadState();
const store = createStore(reducer, persistedState);

// Make sure the store is persisted on the local storage
store.subscribe(
    throttle(() => {
      saveState(store.getState());
    }),
    1000,
);

export default class App extends Component {
  render() {
    return (
        <Provider store={store}>
          <div>
            <Switch>
              <AppRoute exact path='/' layout={Layout} component={HomePage}/>
              <AppRoute path='/product/:id' layout={Layout} component={ProductPage}/>
              <AppRoute path='/winkelwagen' component={ShoppingCart} layout={Layout}/>
              <AppRoute path='/checkout' component={Checkout} layout={Layout}/>
              <AppRoute path='/bestellengast' layout={Layout} component={InputInfo}/>
              <AppRoute path='/betalen/:id' component={Payment} layout={Layout}/>
              <AppRoute path='/confirmation' layout={Layout} component={Confirmation}/>
              <AppRoute path='/overzicht' component={Overview} layout={Layout}/>
              <AppRoute path='/category/:id' layout={Layout} component={CategoryPage} showScroll={true}/>
              <AppRoute path='/zoeken/:query' layout={Layout} component={SearchPage}/>
              <AppRoute path='/account/inloggen' layout={Layout} component={LoginPage}/>
              <AppRoute path='/account/registreren' layout={Layout} component={Registration}/>
              <AppRoute path='/favorieten' component={Favorites} layout={Layout}/>
              <AppRoute path='/account/overzicht' component={AccountOverview} layout={Layout}/>

              <AppRoute path='/admin' layout={AdminPage} component={Turnover}/>
              <AppRoute path='/admin-addProduct' layout={AdminPage} component={AddProducts}/>
              <AppRoute path='/admin-allProducts' layout={AdminPage} component={AllProducts}/>
              <AppRoute path='/admin-allUsers' layout={AdminPage} component={AllUsers}/>
              <AppRoute path='/admin-editProduct/:id' layout={AdminPage} component={EditProducts}/>
              <AppRoute path='/admin-editDiscount/:id' layout={AdminPage} component={EditDiscount}/>
              <AppRoute path='/admin-editUser/:id' layout={AdminPage} component={EditUser}/>
              <AppRoute path='/admin-allDiscounts' layout={AdminPage} component={AllDiscounts}/>
              <AppRoute path='/admin-addDiscount' layout={AdminPage} component={AddDiscount}/>
              <AppRoute path='/admin-turnover' layout={AdminPage} component={Turnover}/>
              <AppRoute path='/admin-popularbeers' layout={AdminPage} component={Popularbeers}/>
              <AppRoute path='/admin-populardiscounts' layout={AdminPage} component={Populardiscounts}/>

              <AppRoute component={GenericNotFound} layout={Layout}/>
            </Switch>
          </div>
        </Provider>
    );
  }
}