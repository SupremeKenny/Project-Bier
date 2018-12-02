import React, { Component } from "react";
import { LoginComponent } from "./LoginComponent.js"

import {
  Container,
  Segment,
  Grid,
  Button,
  Header,
  Form,
  Message
} from "semantic-ui-react";

export class LoginPage extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <Message
          style={{ marginTop: '1em' }}
          header='Je wachtwoord alsjeblieft.'
          content='Om de gegevens in je account goed te kunnen beschermen, vragen wij je om een wachtwoord.' />
        <Header as="h1"> Inloggen</Header>
        <Container>
          <Segment padded='very' size={'big'} key={'large'}>
            <Grid columns={2} stackable >
              <Grid.Row >
                <Grid.Column>
                  <Header as="h3"> Bestaande klanten</Header>
                  <LoginComponent />
                </Grid.Column>
                <Grid.Column>
                  <Header as="h3"> Nieuw bij BeerBuddy?</Header>
                  <p>Maak binnen enkele minuten een nieuw account aan!</p>
                  <Form onSubmit={this.handleSubmit} >
                    <Form.Input
                      placeholder="Emailadres"
                      name="email"
                      width={12}
                    />
                    <Button positive href="/input">Maak een account aan</Button>
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