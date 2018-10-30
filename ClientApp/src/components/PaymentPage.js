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
      <Step active>
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

const ButtonCoC = () => (
    <Button.Group>
      <Button href="/input">Teruggaan</Button>
      <Button.Or text="of" />
      <Button positive href="/confirmation">Doorgaan</Button>
    </Button.Group>
  );

class Payment extends Component {
    render() {
        return(
            <Container>
                <Divider hidden/>
                <StepOrder/>
                <Divider/>
                <h3>Kies uw betalingswijze</h3>
                <br/>
                <Button style={{ height: "100px", width: "200px" }}><h2>Simulator</h2></Button>
                <Divider hidden/>
                <Divider/>
                <ButtonCoC/>
            </Container>
        );
    }
}

export default connect(

    )(Payment);
    