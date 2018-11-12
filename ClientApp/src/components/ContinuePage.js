import React, { Component } from "react";
import { connect } from "react-redux";
import {
    Header,
    Container,
    Rating,
    Breadcrumb,
    Segment,
    Grid,
    Image,
    Label,
    Button,
    Icon,
    Popup,
    Divider,
    Table,
    Input,
    Card,
    Menu,
    CardGroup,
    List,
    Dropdown,
    Step
  } from "semantic-ui-react";

const StepOrder = () => (
    <Step.Group>
      <Step active>
        <Icon name='truck' />
        <Step.Content>
          <Step.Title>Bestellen</Step.Title>
          <Step.Description>Vul uw gegevens in</Step.Description>
        </Step.Content>
      </Step>
      <Step>
        <Icon name='credit card' />
        <Step.Content>
          <Step.Title>Betalen</Step.Title>
          <Step.Description>Kies uw betalingswijze</Step.Description>
        </Step.Content>
      </Step>
      <Step>
        <Icon name='info' />
        <Step.Content>
            <Step.Title>Bevestiging</Step.Title>
        </Step.Content>
      </Step>
    </Step.Group>
)

const Space = () => " ";

class Continue extends Component {
    render() {
        return(
            <Container>
              <Divider hidden/>
              <StepOrder/>
              <Divider/>
              <Segment placeholder padded='very'>
                 <Grid columns={2} stackable textAlign='center'>
                   <Divider vertical>of</Divider>

                   <Grid.Row verticalAlign='middle'>
                       <Grid.Column>
                           <h2>Inloggen</h2>
                           <p>Door in te loggen, worden uw gegevens automatisch ingevuld.</p>
                           <div>
                                <Input placeholder='E-mailadres' style={{ width: "300px" }}/>
                                <br/>
                                <Input placeholder='Wachtwoord'  style={{ width: "300px" }}/>
                                <br/>
                                <br/>
                                <Button positive>Inloggen</Button>
                                <Space/>
                                <a href="/">Wachtwoord vergeten?</a>
                            </div>
                       </Grid.Column>

                       <Grid.Column>
                           <h2>Verder gaan zonder account</h2>
                           <p>Klik op de knop hieronder</p>
                           <Button positive href="/input">Doorgaan</Button>
                       </Grid.Column>
                   </Grid.Row>
                </Grid>
              </Segment>
              <Divider/>
              <Button href='/winkelwagen'>Teruggaan</Button>
            </Container>
        );
    }
}

export default connect(

)(Continue);
