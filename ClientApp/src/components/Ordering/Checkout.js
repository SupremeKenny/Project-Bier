import React, { Component } from "react";
import { StepOrder } from "./StepOrder.js";
import { LoginComponent } from "../Login/LoginComponent.js";
import { Link } from "react-router-dom";
import {
  Container,
  Segment,
  Grid,
  Button,
  Divider,
  Message,
  Icon
} from "semantic-ui-react";

export default class Checkout extends Component {
  render() {
    return (
      <Container>
        <Divider hidden />
        <StepOrder active={[true, false, false]} />
        <Divider />
        <Message
          style={{ marginTop: '1em' }}
          header='Kies uw bestelmethode'
          content='U kan inloggen of als gast bestellen.' />

        <Segment padded='very' >
          <Grid columns={2} stackable >
            <Divider vertical>of</Divider>

            <Grid.Row verticalAlign='middle'>
              <Grid.Column>
                <h2>Inloggen</h2>
                <p>Door in te loggen, worden uw gegevens automatisch ingevuld.</p>
                <LoginComponent />
                <Divider hidden />
                <Link to="/">
                  Klik hier om u te registreren.
                </Link>
              </Grid.Column>

              <Grid.Column textAlign='center'>
                <h2>Verder gaan zonder account</h2>
                <p>Klik op de knop hieronder om als gast te bestellen.</p>

                <Button animated color="yellow" href="/bestellengast"> <Button.Content visible>Doorgaan</Button.Content>
                  <Button.Content hidden>
                    <Icon name='arrow right' />
                  </Button.Content>
                </Button>

              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
        <Button floated='right' animated href='/winkelwagen'>
          <Button.Content visible>Terug naar winkelwagen</Button.Content>
          <Button.Content hidden>
            <Icon name='arrow left' />
          </Button.Content>
        </Button>

      </Container>
    );
  }
}