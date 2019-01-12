import React from 'react';
import {Link} from 'react-router-dom';
import {
  Container,
  Image,
  Menu,
  Button,
  Icon,
} from 'semantic-ui-react';

export const AdminLayout = ({children}) => {
  return (
      <div>
        <Menu fixed='top' inverted>
          <Container>
            <Menu.Item header>
              <Link to="/admin">
                <Image src='/logo.png'/>
              </Link>
            </Menu.Item>
            <Menu.Item position="right">
              <Button animated color="red" href="/">
                <Button.Content visible>Terug</Button.Content>
                <Button.Content hidden>
                  <Icon name="arrow left"/>
                </Button.Content>
              </Button>
            </Menu.Item>
          </Container>
        </Menu>

        <Container style={{marginTop: '7em'}}>
          {children}
        </Container>
      </div>
  )
};