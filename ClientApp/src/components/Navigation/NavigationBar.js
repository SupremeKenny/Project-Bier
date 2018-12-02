import React from "react";
import { Link } from "react-router-dom";
import {
    Container,
    Menu,
    Dropdown,
    Grid,
} from "semantic-ui-react";

const menuStyleUnder = { paddingTop: 65, marginBottom: 0, marginTop: 0, borderRadius: 0 };
const menuFontColor = { color: "White" };

const MenuItemList = props => (
    <Menu.Item link style={{ color: 'Black' }} name={props.brand} />
);

export const NavigationBar = props => {
    return (
        <Menu borderless style={menuStyleUnder} inverted className="sub-menu">
            <Container>
                <Link to="/">
                    <Menu.Item link style={menuFontColor}>
                        Hoofdpagina
                </Menu.Item>
                </Link>

                <Dropdown item text='Categorieën' style={menuFontColor} >
                    <Dropdown.Menu style={{ width: 350, backgroundColor: '#dcdde1' }}>
                        <Dropdown.Header icon='beer' content='Kies uw categorie' />
                        <Grid columns={2} divided children >
                            <Grid.Row>
                                <Grid.Column>
                                    <Link to="/category/amber" >
                                        <MenuItemList brand="Amber" />
                                    </Link>
                                    <Link to="/category/barley-wine">
                                        <MenuItemList brand="Barley Wine" />
                                    </Link>
                                    <Link to="/category/belgian-ale">
                                        <MenuItemList brand="Belgian Ale" />
                                    </Link>
                                    <Link to="/category/blond">
                                        <MenuItemList brand="Blond" />
                                    </Link>
                                    <Link to="/category/bock">
                                        <MenuItemList brand="Bock" />
                                    </Link>
                                    <Link to="/category/brown-ale">
                                        <MenuItemList brand="Brown Ale" />
                                    </Link>
                                    <Link to="/category/dubbel">
                                        <MenuItemList brand="Dubbel" />
                                    </Link>
                                    <Link to="/category/india-pale-ale">
                                        <MenuItemList brand="India Pale Ale" />
                                    </Link>
                                    <Link to="/category/lager">
                                        <MenuItemList brand="Lager" />
                                    </Link>
                                    <Link to="/category/pale-ale">
                                        <MenuItemList brand="Pale Ale" />
                                    </Link>
                                </Grid.Column>

                                <Grid.Column>
                                    <Link to="/category/pils">
                                        <MenuItemList brand="Pils" />
                                    </Link>
                                    <Link to="/category/porter">
                                        <MenuItemList brand="Porter" />
                                    </Link>
                                    <Link to="/category/quadrupel">
                                        <MenuItemList brand="Quadrupel" />
                                    </Link>
                                    <Link to="/category/saison">
                                        <MenuItemList brand="Saison" />
                                    </Link>
                                    <Link to="/category/sour-beer">
                                        <MenuItemList brand="Sour Beer" />
                                    </Link>
                                    <Link to="/category/stout">
                                        <MenuItemList brand="Stout" />
                                    </Link>
                                    <Link to="/category/tripel">
                                        <MenuItemList brand="Tripel" />
                                    </Link>
                                    <Link to="/category/weizen">
                                        <MenuItemList brand="Weizen" />
                                    </Link>
                                    <Link to="/category/wit">
                                        <MenuItemList brand="Wit" />
                                    </Link>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Dropdown.Menu>
                </Dropdown>
            </Container>
        </Menu>
    );
}