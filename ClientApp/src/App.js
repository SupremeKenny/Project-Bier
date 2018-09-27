import React, { Component } from "react";
import { Route } from "react-router";
import { Layout } from "./components/Layout.js";
import { Category } from "./components/Category.js";

export default class App extends Component {
  displayName = App.name;

  render() {
    return (
      <Layout>
        <Route exact path="/" component={Category} />
      </Layout>
    );
  }
}
