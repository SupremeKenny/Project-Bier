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
  Header
} from "semantic-ui-react";

export default class Continue extends Component {
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
                <Button color="yellow" href="/input">Doorgaan</Button>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
        <Button floated='right' href='/winkelwagen'>Terug naar winkelwagen</Button>
      </Container>
    );
  }
}