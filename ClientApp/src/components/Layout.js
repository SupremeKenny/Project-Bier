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
        <Content style={{ padding: '0 50px' }}>
        {this.props.children}
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Ant Design ©2018 Created by Ant UED
      </Footer>
      </Layout>
    );
  }
}
