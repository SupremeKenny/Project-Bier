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
  Dropdown,
  List,
  Grid,
  Header,
  Divider
} from "semantic-ui-react";
import { connect } from "react-redux";
import { deleteTodo, toggleTodo } from "../actions/actionCreator";
import { bindActionCreators } from "redux";

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
                <Link to="/cart">
                  <Button icon color="yellow">
                    <i className="icons">
                      <i className="shop icon" />
                    
                    </i>
                  </Button>
                </Link>
              </Menu.Item>
            </Container>
          </Menu>

          <Menu
            // fixed={fixed ? null : null}
            
            size="large"
            color="black"
            style={menuStyle}
          >
            <Container>
              <Link to="/category/amber">
                <Menu.Item>Amber</Menu.Item>
              </Link>
              <Link to="/category/barley-wine">
                <Menu.Item>Barley Wine</Menu.Item>
              </Link>
              <Link to="/category/belgian-ale">
                <Menu.Item>Belgian Ale</Menu.Item>
              </Link>
              <Link to="/category/blond">
                <Menu.Item>Blond</Menu.Item>
              </Link>
              <Link to="/category/bock">
                <Menu.Item>Bock</Menu.Item>
              </Link>
              <Link to="/category/brown-ale">
                <Menu.Item>Brown Ale</Menu.Item>
              </Link>
              <Link to="/category/dubbel">
                <Menu.Item>Dubbel</Menu.Item>
              </Link>
              <Link to="/category/india-pale-ale">
                <Menu.Item>India Pale Ale</Menu.Item>
              </Link>
              <Link to="/category/lager">
                <Menu.Item>Lager</Menu.Item>
              </Link>
            </Container>
          </Menu>

          <Menu
            // fixed={fixed ? null : null}
            
            size="large"
            color="black"
            style={menuStyle}
          >
            <Container>
              <Link to="/category/pale-ale">
                <Menu.Item>Pale Ale</Menu.Item>
              </Link>
              <Link to="/category/pils">
                <Menu.Item>Pils</Menu.Item>
              </Link>
              <Link to="/category/porter">
                <Menu.Item>Porter</Menu.Item>
              </Link>
              <Link to="/category/quadrupel">
                <Menu.Item>Quadrupel</Menu.Item>
              </Link>
              <Link to="/category/saison">
                <Menu.Item>Saison</Menu.Item>
              </Link>
              <Link to="/category/sour-beer">
                <Menu.Item>Sour Beer</Menu.Item>
              </Link>
              <Link to="/category/stout">
                <Menu.Item>Stout</Menu.Item>
              </Link>
              <Link to="/category/tripel">
                <Menu.Item>Tripel</Menu.Item>
              </Link>
              <Link to="/category/weizen">
                <Menu.Item>Weizen</Menu.Item>
              </Link>
              <Link to="/category/wit">
                <Menu.Item>Wit</Menu.Item>
              </Link>
            </Container>
          </Menu>
        </Visibility>

        {children}

        <Segment style={{ padding: "2em 0em" }} vertical />

        <Segment inverted vertical style={{ padding: "5em 0em" }}>
          <Container>
            <Grid divided inverted stackable>
              <Grid.Row>
                <Grid.Column width={3}>
                  <Header inverted as="h4" content="About" />
                  <List link inverted>
                    <List.Item as="a">Sitemap</List.Item>
                    <List.Item as="a">Contact Us</List.Item>
                    <List.Item as="a">[Invullen]</List.Item>
                    <List.Item as="a">[Invullen]</List.Item>
                  </List>
                </Grid.Column>
                <Grid.Column width={3}>
                  <Header inverted as="h4" content="Services" />
                  <List link inverted>
                    <List.Item as="a">FAQ</List.Item>
                    <List.Item as="a">[Invullen]</List.Item>
                  </List>
                </Grid.Column>
                <Grid.Column width={7}>
                  <Header as="h4" inverted>
                    Footer Header
                  </Header>
                  <p>Informatie moet hier nog worden toegevoegd.</p>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Container>
        </Segment>
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

class Layout extends React.Component {
  render() {
    return <ResponsiveContainer>{this.props.children}</ResponsiveContainer>;
  }
}


const mapStateToProps = state => {
  return { todos: state.todos
 };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      deleteTodo,
      toggleTodo,
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Layout);