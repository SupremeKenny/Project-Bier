import React from 'react';
// import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
    Container,
    Image,
    Menu,
    Button,
    Icon,
    // Divider,
    // Dropdown,
    // Grid,
    // Header,
    // List,
    // Segment,
  } from 'semantic-ui-react';

  export const AdminLayout = ({ children }) => {

      return (
        <div>
          <Menu fixed='top' inverted>
            <Container>
              <Menu.Item header>
                <Link to = "/admin">
                  <Image src='/logo.png'/>
                </Link>
              </Menu.Item>

              <Menu.Item position = "right">
                <Link to = "/">
                  <Button animated='vertical' style = {{width: "5em"}}>
                    <Button.Content hidden>Afmelden</Button.Content>
                    <Button.Content visible>
                      <Icon name='log out' />
                    </Button.Content>
                  </Button>
                </Link>
              </Menu.Item>
            </Container>
          </Menu>
      
          <Container style={{ marginTop: '7em' }}>
            {children}
          </Container>
        </div>
      )
  }


