import { Link, Redirect } from 'react-router-dom';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import HeartButton from './ProductPage/HeartButton.js';
import { NavigationBar } from './Navigation/NavigationBar.js';
import { Footer } from './Navigation/Footer.js';
import UserDropdown from './User/UserDropdown.js';
import { logoutUser } from '../actions/actionCreator';
import { bindActionCreators } from 'redux';
import Scroller from './Scroller.js';
import {
  Button,
  Container,
  Input,
  Image,
  Menu,
  Label
} from 'semantic-ui-react';

const LoginButton = () => {
  return (
    <Link to="/account/inloggen">
      <Button color="green">Inloggen</Button>
    </Link>
  );
};

class Layout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      shouldSearch: false
    };
  }

  componentDidMount() {
    this.checkTokenExpiry();
  }

  checkTokenExpiry = () => {
    var current_time = new Date().getTime() / 1000;
    if (current_time > this.props.reduxState.login.expiry) {
      this.props.logoutUser();
    }
  };

  handleEnter = e => {
    if (e.key === 'Enter') {
      this.onSearchClick();
    }
  };

  onSearchClick = e => {
    if (this.state.query !== '') {
      this.setState({ ...this.state, shouldSearch: true });
    }
  };

  render() {
    let loginComponent = <LoginButton />;
    if (this.props.reduxState.login.loggedIn) {
      loginComponent = <UserDropdown />;
    }

    let scroller;
    if (this.props.showScroll) {
      scroller = <Scroller />;
    }

    if (this.state.shouldSearch === true) {
      this.setState({ ...this.state, shouldSearch: false });
      return <Redirect push to={'/zoeken/' + this.state.query} />;
    } else {
      return (
        <div className="body">
          {scroller}
          <div>
            <Menu
              fixed="top"
              inverted
              size="large"
              color="black"
              style={{
                marginBottom: 0,
                marginTop: 0,
                borderRadius: 0,
                color: '#2f3542'
              }}
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
                    onKeyPress={this.handleEnter}
                    action={{
                      color: 'blue',
                      labelPosition: 'right',
                      icon: 'search',
                      content: 'Zoek',
                      onClick: this.onSearchClick
                    }}
                    onChange={e =>
                      this.setState({
                        ...this.state,
                        query: e.currentTarget.value
                      })
                    }
                    placeholder="Zoek naar producten..."
                  />
                </Menu.Item>
                <Menu.Item>
                  {loginComponent}
                  <Link to="/favorieten">
                    <HeartButton />
                  </Link>
                  <Link to="/winkelwagen">
                    <Button icon color="yellow">
                      <i className="icons">
                        <i className="shop icon" />
                      </i>
                    </Button>
                    <Label
                      color="red"
                      floating
                      circular
                      size="tiny"
                      style={{ position: 'relative', left: '0%' }}
                    >
                      {this.props.reduxState.shoppingcart.count}
                    </Label>
                  </Link>
                </Menu.Item>
              </Container>
            </Menu>

            <NavigationBar />
          </div>
          <Container className="content">{this.props.children}</Container>
          <Footer />
        </div>
      );
    }
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      logoutUser
    },
    dispatch
  );
};

const mapStateToProps = state => {
  return {
    reduxState: state
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Layout);
