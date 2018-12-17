import React from 'react';
import { Link } from "react-router-dom";
import { Menu } from 'semantic-ui-react';



export const NavMenu = () => {
    return (

        <Menu vertical inverted fixed>
            <Menu.Item name = "Home">
                <Link to="/admin">Home</Link>
            </Menu.Item>

            <Menu.Item>
                Producten
                <Menu.Menu>
                    <Menu.Item name='searchProduct'>
                        <Link to="/admin-searchProduct">Zoeken</Link>
                    </Menu.Item>
                    <Menu.Item name='addProduct'>
                        <Link to="/admin-addProduct">Toevoegen</Link>
                    </Menu.Item>
                    <Menu.Item name='allProducts'>
                        <Link to="/admin-allProducts">Alle Producten</Link>
                    </Menu.Item>

                </Menu.Menu>
            </Menu.Item>

            <Menu.Item>
                Gebruikers
                <Menu.Menu>
                    <Menu.Item name='addUser'>
                        <Link to="/admin-addUser">Toevoegen</Link>
                    </Menu.Item>
                    <Menu.Item name='allUsers'>
                        <Link to="/admin-allUsers">Alle Gebruikers</Link>
                    </Menu.Item>

                </Menu.Menu>
            </Menu.Item>
            <Menu.Item>
                Kortingscodes
                <Menu.Menu>
                    <Menu.Item name='addUser'>
                        <Link to="/admin-addDiscount">Toevoegen</Link>
                    </Menu.Item>
                    <Menu.Item name='allUsers'>
                        <Link to="/admin-allDiscounts">Alle Kortingscodes</Link>
                    </Menu.Item>

                </Menu.Menu>
            </Menu.Item>

            <Menu.Item
            name = "accountSettings"
            >
            <Link to="/admin-accountSettings">Account Settings</Link>
            </Menu.Item>
      </Menu>
      )
}
