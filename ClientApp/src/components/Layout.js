
import { Link, Redirect } from "react-router-dom";
import React, { Component } from "react";
import { connect } from "react-redux";
import { HeartButton } from './ProductPage/HeartButton.js';
import { NavigationBar } from './Navigation/NavigationBar.js';
import { Footer } from './Navigation/Footer.js';

import {
  Button,
  Container,
  Input,
  Image,
  Menu,
  Label
} from "semantic-ui-react";

const menuStyle = { marginBottom: 0, marginTop: 0, borderRadius: 0, color: "#2f3542" };
const menuStyleUnder = { paddingTop: 65, marginBottom: 0, marginTop: 0, borderRadius: 0 };
const body = { minHeight: window.innerHeight / 3 };
const menuFontColor = { color: "White" };

const MenuItemList = props => (
  <Menu.Item link style={{ color: 'Black' }} name={props.brand} />
);

class DesktopContainer extends Component {
  constructor() {
    super();
    this.state = {
      query: "",
      shouldSearch: false
    };
  }

  onSearchClick = e => { this.setState({ ...this.state, shouldSearch: true }) }

  render() {
    const { children } = this.props;
    console.log(this.props);

    if (this.state.shouldSearch == true) {
      this.setState({ ...this.state, shouldSearch: false });
      return <Redirect push to={"/zoeken/" + this.state.query} />
    }
    else {
      return (
        <div className="body">
          <div >
            <Menu
              fixed="top"
              inverted
              size="large"
              color="black"
              style={menuStyle}
              className="top-menu"
              borderless
            >
              <Container>
                <Menu.Item>
                  <Link to="/">
                    <Image src="logo.png" style={{ height: 30 }} />
                  </Link>
                </Menu.Item>

                <Menu.Item style={{ flexGrow: 1 }}>
                  <Input
                    action={{
                      color: "blue",
                      labelPosition: "right",
                      icon: "search",
                      content: "Zoek",
                      onClick: this.onSearchClick
                    }}
                    onChange={e => this.setState({ ...this.state, query: e.currentTarget.value })}
                    placeholder="Zoek naar producten..."
                  />
                </Menu.Item>
                <Menu.Item>
                  <Link to="/account/inloggen">
                    <Button color="green">Inloggen</Button>
                  </Link>
                  <Link to="/">
                    <HeartButton />
                  </Link>
                  <Link to="/winkelwagen">
                    <Button icon color="yellow">
                      <i className="icons">
                        <i className="shop icon" />

                      </i>
                    </Button>
                    <Label color='red' floating circular size="tiny" style={{ position: "relative", left: "0%" }}>
                      {this.props.shoppingcart.count}
                    </Label>
                  </Link>
                </Menu.Item>
              </Container>
            </Menu>

            <NavigationBar />


          </div>
          <Container className="content">
            {children}
          </Container>
          <Footer />
        </div>
      );
    }
  }
}

export class Layout extends React.Component {
  render() {
    return <DesktopContainer>{this.props.children}</DesktopContainer>;
  }
}

const mapStateToProps = state => {
  return {
    shoppingcart: state.shoppingcart
  };
};

export default connect(
  mapStateToProps,
  null
)(DesktopContainer);
