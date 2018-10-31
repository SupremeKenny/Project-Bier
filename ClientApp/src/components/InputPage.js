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
    Step,
    Form
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
                  <Form>
                    <Form.Group widths='equal'>
                      <Form.Input required fluid label='Voornaam' placeholder='ABC' />
                      <Form.Input fluid label='Tussenvoegsel' placeholder='van' />
                      <Form.Input required fluid label='Achternaam' placeholder='DEF' />
                    </Form.Group>
                  </Form>
                </div>
                <div>
                  <Form>
                    <Form.Group widths='equal'>
                      <Form.Input required fluid label='Straatnaam' placeholder='ABCstraat' />
                      <Form.Input required fluid label='Huisnummer' placeholder='123' />
                      <Form.Input fluid label='Toevoeging' placeholder='a' />
                    </Form.Group>
                  </Form>
                </div>
                <div>
                  <Form>
                    <Form.Group>
                      <Form.Input required label='Postcode' placeholder='1234 AB' />
                      <Form.Input required label='Stad' placeholder='Rotterdam' />
                    </Form.Group>
                  </Form>
                </div>
                <Form>
                   <Form.Group>
                    <Form.Input label='Land' placeholder='Nederland' readOnly width={6} />
                   </Form.Group>
                </Form>
                <Form>
                    <Form.Group>
                      <Form.Input required label='Telefoonnummer' placeholder='0612345678' width={6}/>
                    </Form.Group>
                </Form>
                <Form>
                    <Form.Group>
                     <Form.Input required label='E-mailadres' placeholder='123@hotmail.com' width={6} />
                    </Form.Group>
                </Form>
                <h3>Kies uw bezorgdatum</h3>
                <Segment>
                  Placeholder
                </Segment>
                <Divider hidden/>
                <Divider/>
                <ButtonCoC/>
            </Container>
        );
    }
}

export default connect(

    )(InputInfo);
    