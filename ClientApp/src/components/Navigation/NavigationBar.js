import React from 'react';
import {Link} from 'react-router-dom';
import {
  Container,
  Menu,
  Dropdown,
  Grid,
} from 'semantic-ui-react';

const menuStyleUnder = {paddingTop: 65, marginBottom: 0, marginTop: 0, borderRadius: 0};
const menuFontColor = {color: 'White'};

const MenuItemList = props => (
    <Menu.Item link style={{color: 'Black'}} name={props.brand}/>
);

export const NavigationBar = () => {
  return (
      <Menu borderless style={menuStyleUnder} inverted className="sub-menu">
        <Container>
          <Link to="/">
            <Menu.Item link style={menuFontColor}>
              Hoofdpagina
            </Menu.Item>
          </Link>

          <Dropdown item text='Categorieën' style={menuFontColor}>
            <Dropdown.Menu style={{width: 350, backgroundColor: '#dcdde1'}}>
              <Dropdown.Header icon='beer' content='Kies uw categorie'/>
              <Grid columns={2} divided children>
                <Grid.Row>
                  <Grid.Column>
                    <Link to="/category/Amber">
                      <MenuItemList brand="Amber"/>
                    </Link>
                    <Link to="/category/Barley Wine">
                      <MenuItemList brand="Barley Wine"/>
                    </Link>
                    <Link to="/category/Belgian Ale">
                      <MenuItemList brand="Belgian Ale"/>
                    </Link>
                    <Link to="/category/Blond">
                      <MenuItemList brand="Blond"/>
                    </Link>
                    <Link to="/category/Bock">
                      <MenuItemList brand="Bock"/>
                    </Link>
                    <Link to="/category/Brown Ale">
                      <MenuItemList brand="Brown Ale"/>
                    </Link>
                    <Link to="/category/Dubbel">
                      <MenuItemList brand="Dubbel"/>
                    </Link>
                    <Link to="/category/India Pale Ale">
                      <MenuItemList brand="India Pale Ale"/>
                    </Link>
                    <Link to="/category/Lager">
                      <MenuItemList brand="Lager"/>
                    </Link>
                    <Link to="/category/Pale Ale">
                      <MenuItemList brand="Pale Ale"/>
                    </Link>
                  </Grid.Column>

                  <Grid.Column>
                    <Link to="/category/Pils">
                      <MenuItemList brand="Pils"/>
                    </Link>
                    <Link to="/category/Porter">
                      <MenuItemList brand="Porter"/>
                    </Link>
                    <Link to="/category/Quadrupel">
                      <MenuItemList brand="Quadrupel"/>
                    </Link>
                    <Link to="/category/Saison">
                      <MenuItemList brand="Saison"/>
                    </Link>
                    <Link to="/category/Sour Beer">
                      <MenuItemList brand="Sour Beer"/>
                    </Link>
                    <Link to="/category/Stout">
                      <MenuItemList brand="Stout"/>
                    </Link>
                    <Link to="/category/Tripel">
                      <MenuItemList brand="Tripel"/>
                    </Link>
                    <Link to="/category/Weizen">
                      <MenuItemList brand="Weizen"/>
                    </Link>
                    <Link to="/category/Wit">
                      <MenuItemList brand="Wit"/>
                    </Link>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Dropdown.Menu>
          </Dropdown>
        </Container>
      </Menu>
  );
};