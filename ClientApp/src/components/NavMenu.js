import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu, Input } from 'antd';
import './NavMenu.css';
import 'antd/dist/antd.css';
import { Row, Col } from 'antd';

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faShoppingCart } from '@fortawesome/free-solid-svg-icons'

library.add(faStar, faShoppingCart)

const Search = Input.Search;
const { Header } = Layout;

export class NavMenu extends Component {
  displayName = NavMenu.name

  render() {
    return (
      <Header style={{ background: 'black' }}>
        
        <Row style={{display:'flex'}}>
          
          <Col span={14} style={{ margin: 'auto'}}><div className="logo" > <img src="logo.png" /></div><Menu
            theme="dark"
            mode="horizontal"
            selectable={false}
            style={{ background: 'black', lineHeight: '64px', display: 'flex' }}
          >

            <Menu.Item key="cart" style={{ margin: 'auto' }}><Search
              placeholder="Search for products... "
              onSearch={value => console.log(value)}
              style={{ width: 600, float: 'middle' }} /></Menu.Item>
            <Menu.Item key="fav" ><FontAwesomeIcon icon="star" style={{ fontSize: 28, color: '#ffa502' }} /></Menu.Item>
            <Menu.Item key="cart" ><FontAwesomeIcon icon="shopping-cart" style={{ fontSize: 28, color: 'white' }} /></Menu.Item>
          </Menu></Col>
        </Row>

      </Header>


    );
  }
}
