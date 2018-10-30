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

const ButtonCoC = () => (
    <Button.Group>
      <Button href="/doorgaan">Teruggaan</Button>
      <Button.Or text="of" />
      <Button positive href="/payment">Doorgaan</Button>
    </Button.Group>
  );

class InputInfo extends Component {
    render() {
        return(
            <Container>
                <Divider hidden/>
                <StepOrder/>
                <Divider />
                <h3>Vul uw gegevens in</h3>
                <div>
                    <Input placeholder='Voornaam'/><Input placeholder='Tussenvoegsel' style={{ width: "125px" }}/><Input placeholder='Achternaam' style={{ width: "195px" }}/>
                    <br/>
                    <Input placeholder='Straatnaam' style={{ width: "300px" }}/><Input placeholder='Huisnummer'style={{ width: "110px" }}/><Input placeholder='Toevoeging'style={{ width: "110px" }}/>
                    <br/>
                    <Input placeholder='Postcode' style={{ width: "110px" }}/><Input placeholder='Stad' style={{ width: "190px" }}/>
                    <br/>
                    <Input placeholder='Telefoonnummer' style={{ width: "300px" }}/>
                    <br/>
                    <Input placeholder='E-mailadres' style={{ width: "300px" }}/>
                </div>
                <Divider hidden/>
                <Divider/>
                <ButtonCoC/>
            </Container>
        );
    }
}

export default connect(

    )(InputInfo);
    