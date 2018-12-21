import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { LoginComponent } from "./LoginComponent.js";
import { connect } from "react-redux";
import { loginUser } from "../../actions/actionCreator";
import {
  Container,
  Segment,
  Grid,
  Button,
  Header,
  Form,
  Message
} from "semantic-ui-react";
import { bindActionCreators } from "redux";

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);

    this.state = {
      content:
        "Om de gegevens in je account goed te kunnen beschermen, vragen wij je om een wachtwoord.",
      shouldRedirect: false
    };
  }

  componentDidMount() {
    let currentTime = new Date().getTime() / 1000;
    let loginExpiryDate = new Date(this.props.reduxState.expiry);

    let expired = currentTime > loginExpiryDate;
    if (this.props.reduxState.loggedIn && !expired) {
      this.setState({ ...this.state, shouldRedirect: true });
    } else if (this.props.reduxState.loggedIn !== false && expired) {
      this.setState({
        ...this.state,
        content:
          "Login is verlopen, voer alsjeblieft je wachtwoord in om verder te gaan."
      });
    }
  }
  handleLogin(token) {
    this.props.loginUser(token);
    this.setState({ ...this.state, shouldRedirect: true });
  }

  render() {
    if (this.state.shouldRedirect) {
      return <Redirect push to={"/"} />;
    } else
      return (
        <div>
          <Message
            style={{ marginTop: "1em" }}
            header="Je wachtwoord alsjeblieft."
            content="Om de gegevens in je account goed te kunnen beschermen, vragen wij je om een wachtwoord."
          />
          <Header as="h1"> Inloggen</Header>
          <Container>
            <Segment padded="very" size={"big"} key={"large"}>
              <Grid columns={2} stackable>
                <Grid.Row>
                  <Grid.Column>
                    <Header as="h3"> Bestaande klanten</Header>
                    <LoginComponent submissionMethod={this.handleLogin} />
                  </Grid.Column>
                  <Grid.Column>
                    <Header as="h3"> Nieuw bij BeerBuddy?</Header>
                    <p>
                      Vul uw gegevens in en maak binnen enkele minuten een nieuw
                      account aan!
                    </p>
                    <Button positive href="/account/registreren">
                      Maak een account aan
                    </Button>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Segment>
          </Container>
        </div>
      );
  }
}

const mapStateToProps = state => {
  return {
    reduxState: state.login
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      loginUser
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginPage);
