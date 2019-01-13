import React from "react";
import { Link } from "react-router-dom";
import { Menu, Sidebar } from "semantic-ui-react";

export const NavMenu = () => {
	return (
		<Menu inverted vertical>
			<Menu.Item>
				Producten
				<Menu.Menu>
					<Menu.Item name="addProduct">
						<Link to="/admin-addProduct">Toevoegen</Link>
					</Menu.Item>
					<Menu.Item name="allProducts">
						<Link to="/admin-allProducts">Alle producten</Link>
					</Menu.Item>
				</Menu.Menu>
			</Menu.Item>

			<Menu.Item>
				Gebruikers
				<Menu.Menu>
					<Menu.Item name="allUsers">
						<Link to="/admin-allUsers">Alle gebruikers</Link>
					</Menu.Item>
				</Menu.Menu>
			</Menu.Item>
			<Menu.Item>
                Kortingscodes
                <Menu.Menu>
                    <Menu.Item name='addDiscount'>
                        <Link to="/admin-addDiscount">Toevoegen</Link>
                    </Menu.Item>
                    <Menu.Item name='AllDiscount'>
                        <Link to="/admin-allDiscounts">Alle kortingscodes</Link>
                    </Menu.Item>

                </Menu.Menu>
            </Menu.Item>

            <Menu.Item>
                Statistieken
                <Menu.Menu>
                    <Menu.Item name='turnover'>
                        <Link to="/admin-turnover">Omzet</Link>
                    </Menu.Item>
                    <Menu.Item name='popularbeers'>
                        <Link to="/admin-popularbeers">Populaire biertjes</Link>
                    </Menu.Item>
                    <Menu.Item name='populardiscounts'>
                        <Link to="/admin-populardiscounts">Populaire kortingscodes</Link>
                    </Menu.Item>
                </Menu.Menu>
            </Menu.Item>
		</Menu>
	);
};
