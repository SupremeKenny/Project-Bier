import React, { Component } from "react";
import { Route, Router } from "react-router-dom";
import { Layout } from "./components/Layout.js";
import { ProductPage } from "./components/ProductPage.js";
import { HomePage } from "./components/HomePage.js"





export default class App extends Component {
  displayName = App.name;

  render() {
    return (
      <Layout>
       <div>
          <Route exact path="/" component={HomePage} />
          <Route path="/product/:id" component={ProductPage} />
         </div>
      </Layout>
    );
  }
}
