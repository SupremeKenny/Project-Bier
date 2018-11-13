import React from 'react';
import { Link } from "react-router-dom";
import { Icon, Menu , Input, Dropdown} from 'semantic-ui-react';



export const NavMenu = () => {
    return (

        <Menu vertical inverted fixed>
            <Menu.Item
            name = "Home"
            >
            <Link to="/home">Home</Link>
            </Menu.Item>

            <Menu.Item>
                Producten
                <Menu.Menu>
                    <Menu.Item name='searchProduct'>
                        Zoeken
                    </Menu.Item>
                    <Menu.Item name='addProduct'>
                        Toevoegen
                    </Menu.Item>
                    <Menu.Item name='allProducts'>
                        Alle Producten
                    </Menu.Item>

                </Menu.Menu>
            </Menu.Item>

            <Menu.Item>
                Gebruikers
                <Menu.Menu>
                    <Menu.Item name='searchUser'>
                        Zoeken
                    </Menu.Item>
                    <Menu.Item name='addUser'>
                        Toevoegen
                    </Menu.Item>
                    <Menu.Item name='allUsers'>
                        Alle Gebruikers
                    </Menu.Item>

                </Menu.Menu>
            </Menu.Item>

            <Menu.Item
            name = "accountSettings"
            >
            Account Settings
            </Menu.Item>
      </Menu>
      )
}
