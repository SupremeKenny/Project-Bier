import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import React, { Component } from "react";
import { count } from "./LocalStorage.js";
import {
  Button,
  Container,
  Input,
  Icon,
  Image,
  Menu,
  Responsive,
  Segment,
  Sidebar,
  Visibility,
  Dropdown
} from "semantic-ui-react";

const menuStyle = { marginBottom: 0, marginTop: 0, borderRadius: 0 };

class DesktopContainer extends Component {
  state = {};


  ShoppingCartCount = count();


  hideFixedMenu = () => this.setState({ fixed: false });
  showFixedMenu = () => this.setState({ fixed: true });

  render() {
    const { children } = this.props;
    const { fixed } = this.state;

    return (
      <Responsive minWidth={Responsive.onlyTablet.minWidth}>
        <Visibility
          once={false}
          onBottomPassed={this.showFixedMenu}
          onBottomPassedReverse={this.hideFixedMenu}
        >
          <Menu
            fixed={fixed ? "top" : null}
            inverted
            size="large"
            color="black"
            style={menuStyle}
          >
            <Container>
              <Menu.Item>
                <Link to="/">
                  <Image src="logo.png" />
                </Link>
              </Menu.Item>

              <Menu.Item style={{ flexGrow: 1 }}>
                <Input
                  action={{
                    color: "blue",
                    labelPosition: "right",
                    icon: "search",
                    content: "Zoek"
                  }}
                  actionPosition="right"
                  placeholder="Zoeken naar producten..."
                />
              </Menu.Item>

              <Menu.Item>
                <Link to="/">
                  <Button color="green">Inloggen</Button>
                </Link>
                <Link to="/">
                  <Button icon color="red">
                    <Icon name="heart" />
                  </Button>
                </Link>
                <Link to="/">
                  <Button icon color="yellow">
                    <i class="icons">
                      <i class="shop icon"></i>
                      <i class="corner">{this.ShoppingCartCount}</i>
                    </i>
                  </Button>
                </Link>
                </Menu.Item>
            </Container>
          </Menu>

          <Menu
            fixed={fixed ? "top" : null}
            inverted
            size="large"
            color="black"
            style={menuStyle}
          >
            <Container>
              <Dropdown item text="Categorieën">
                <Dropdown.Menu>
                  <Dropdown.Item>Alcholvrij</Dropdown.Item>
                  <Dropdown.Item>Amber</Dropdown.Item>
                  <Dropdown.Item>Pils</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <Menu.Item>
                Aanbiedingen
              </Menu.Item>
              <Menu.Item>
                Best Sellers
              </Menu.Item>
            </Container>
          </Menu>
        </Visibility>

        {children}
      </Responsive>
    );
  }
}

DesktopContainer.propTypes = {
  children: PropTypes.node
};

class MobileContainer extends Component {
  state = {};

  handlePusherClick = () => {
    const { sidebarOpened } = this.state;

    if (sidebarOpened) this.setState({ sidebarOpened: false });
  };

  handleToggle = () =>
    this.setState({ sidebarOpened: !this.state.sidebarOpened });

  render() {
    const { children } = this.props;
    const { sidebarOpened } = this.state;

    return (
      <Responsive maxWidth={Responsive.onlyMobile.maxWidth}>
        <Sidebar.Pushable>
          <Sidebar
            as={Menu}
            animation="uncover"
            inverted
            vertical
            visible={sidebarOpened}
          >
            <Menu.Item as="a" active>
              Home
            </Menu.Item>
            <Menu.Item as="a">Work</Menu.Item>
            <Menu.Item as="a">Company</Menu.Item>
            <Menu.Item as="a">Careers</Menu.Item>
            <Menu.Item as="a">Log in</Menu.Item>
            <Menu.Item as="a">Sign Up</Menu.Item>
          </Sidebar>

          <Sidebar.Pusher
            dimmed={sidebarOpened}
            onClick={this.handlePusherClick}
            style={{ minHeight: "100vh" }}
          >
            <Segment
              inverted
              textAlign="center"
              style={{ minHeight: 350, padding: "1em 0em" }}
              vertical
            >
              <Container>
                <Menu inverted pointing secondary size="large">
                  <Menu.Item onClick={this.handleToggle}>
                    <Icon name="sidebar" />
                  </Menu.Item>
                  <Menu.Item position="right">
                    <Button as="a" inverted>
                      Log in
                    </Button>
                    <Button as="a" inverted style={{ marginLeft: "0.5em" }}>
                      Sign Up
                    </Button>
                  </Menu.Item>
                </Menu>
              </Container>
            </Segment>

            {children}
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </Responsive>
    );
  }
}

MobileContainer.propTypes = {
  children: PropTypes.node
};

const ResponsiveContainer = ({ children }) => (
  <div>
    <DesktopContainer>{children}</DesktopContainer>
    <MobileContainer>{children}</MobileContainer>
  </div>
);

ResponsiveContainer.propTypes = {
  children: PropTypes.node
};

export class Layout extends React.Component {
  render() {
    return <ResponsiveContainer>{this.props.children}</ResponsiveContainer>;
  }
}
