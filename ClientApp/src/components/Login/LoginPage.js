import React, { Component } from "react";
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

    // TODO 
    // Redirect from this page if this user is logged in 

  }
  handleLogin(token) {
    this.props.loginUser(token);
    // Redirect from this page if the user has been logged in
  }

  render() {
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
                  <p>Maak binnen enkele minuten een nieuw account aan!</p>
                  <Form onSubmit={this.handleSubmit}>
                    <Form.Input
                      placeholder="Emailadres"
                      name="email"
                      width={12}
                    />
                    <Button positive href="/account/registreren">
                      Maak een account aan
                    </Button>
                  </Form>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Segment>
        </Container>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      loginUser
    },
    dispatch
  );
};

export default connect(
  null,
  mapDispatchToProps
)(LoginPage);
