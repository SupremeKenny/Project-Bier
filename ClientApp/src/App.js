import React, { Component } from 'react';
import { Route } from 'react-router';
import { LayoutMain } from './components/Layout';
import { Home } from './components/Home';
import { Login } from './components/Login';
import { Category } from './components/Category';
import { Main } from './components/Main';

export default class App extends Component {
  displayName = App.name

  render() {
    return (
      <LayoutMain>
        <Route exact path='/' component={Main} />
        <Route path='/category' component={Category} />
        <Route path='/login' component={Login} />
      </LayoutMain>
    );
  }
}
