import React, { Component } from "react";
import { Route } from "react-router";
import { Layout } from "./components/Layout.js";
import { ProductPage } from "./components/ProductPage.js";
import { HomePage } from "./components/HomePage.js"




export default class App extends Component {
  displayName = App.name;

  render() {
    return (
      <Layout>
        <Route exact path="/" component={HomePage} />
      </Layout>
    );
  }
}
