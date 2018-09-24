import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu, Input } from 'antd';
import './NavMenu.css';
import 'antd/dist/antd.css';
import { Row, Col, Button } from 'antd';

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
      <Header>
        <Row style={{display:'flex'}} > 
          <Col md={24} lg={20} xl={16} style={{ margin: 'auto'}}>
        
          <Menu
            theme="dark"
            mode="horizontal"
            selectable={false}
            className="menu header"
          >
           <Menu.Item className='logo'> <img src="logo.png" /></Menu.Item>
            <Menu.Item key="search" className="search">
              <Search
                placeholder="Zoek naar producten... "
                onSearch={value => console.log(value)}/>
            </Menu.Item>
            
            <Menu.Item>
              <Button type="primary">Inloggen</Button>
            </Menu.Item>

            <Menu.Item key="fav">
              <FontAwesomeIcon icon="star" style={{ fontSize: 24, color: '#ffa502' }} />
            </Menu.Item>

            <Menu.Item key="cart" >
              <FontAwesomeIcon icon="shopping-cart" style={{ fontSize: 24, color: 'white' }} />
            </Menu.Item>
          </Menu>
          </Col>
        </Row>
    </Header>
    );
  }
}
