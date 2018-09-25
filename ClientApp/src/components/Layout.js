import React, { Component } from 'react';
import { Col, Grid, Row } from 'react-bootstrap';
import { NavMenu } from './NavMenu';
import { Layout, Menu, Breadcrumb } from 'antd';
import 'antd/dist/antd.css';

const { Header, Content, Footer } = Layout;

export class LayoutMain extends Component {
  displayName = LayoutMain.name

  render() {
    return (
      <Layout className="layout">
        <NavMenu />
        <Content >
          {this.props.children}
        </Content>
        <Footer style={{ textAlign: 'center' }}>

        </Footer>
      </Layout>
    );
  }
}
