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
      <Step>
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
      <Step active>
        <Icon name='info' />
        <Step.Content>
            <Step.Title>Bevestiging</Step.Title>
        </Step.Content>
      </Step>
    </Step.Group>
)

const Space = () => " ";

class Confirmation extends Component {
    render() {
        return(
            <Container>
                <Divider hidden/>
                <StepOrder/>
                <Divider/>
                <h3>Bedankt voor uw bestelling! Uw order is geregistreerd.</h3>
            </Container>
        );
    }
}

export default connect(

    )(Confirmation);
    