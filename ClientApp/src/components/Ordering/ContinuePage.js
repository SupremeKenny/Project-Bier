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

const sizes = ['mini', 'tiny', 'small', 'large', 'big', 'huge', 'massive']

const Space = () => " ";

function validate(email, wachtwoord) {
  return {
    email: email.length === 0,
    wachtwoord: wachtwoord.length === 0,
  };
}

export default class Continue extends Component {
    constructor() {
      super();
      this.state = {
        email: '',
        wachtwoord: '',

        focused: {
          email: false,
          wachtwoord: false,
        }
      };
    }

    handleEmailChange = (evt) => {
      this.setState({ email: evt.target.value });
    }

    handleWachtwoordChange = (evt) => {
      this.setState({ wachtwoord: evt.target.value });
    }

    handleSubmit = (evt) => {
      if (!this.canBeSubmitted()) {
        evt.preventDefault();
      }
      const { email, wachtwoord } = this.state;
      //alert(`Succesvol ingelogd.`);
    }

    handleBlur = (field) => (evt) => {
      this.setState({
        focused: {...this.state.focused, [field]: true},
      });
    }

    canBeSubmitted() {
      const errors = validate(this.state.email, this.state.wachtwoord);
      const NotFilledIn = Object.keys(errors).some(x=>errors[x]);
      return NotFilledIn ? alert('Inloggegevens incorrect.') : window.location.href = "/input" 
      //return !NotFilledIn;
    }

    render() {
        const errors = validate(this.state.email, this.state.wachtwoord);
        const NotFilledIn = Object.keys(errors).some(x=>errors[x]);
        const shouldMarkError = (field) => {
          const hasError = errors[field];
          const shouldShow = this.state.focused[field];
          return hasError ? shouldShow : false;
        };
        
        const { email, wachtwoord } = this.state;

        return(
            <Container>
              <Divider hidden/>
              <StepOrder/>
              <Divider/>
              <Segment placeholder padded='very' size={'big'} key={'large'}>
                 <Grid columns={2} stackable textAlign='center'>
                   <Divider vertical>of</Divider>

                   <Grid.Row verticalAlign='middle'>
                       <Grid.Column>
                           <h2>Inloggen</h2>
                           <p>Door in te loggen, worden uw gegevens automatisch ingevuld.</p>
                           <Form onSubmit={this.handleSubmit} size={'big'}>
                                <Form.Input className={shouldMarkError('email') ? "error" : ""} placeholder='E-mailadres' style={{ width: "300px" }} value={this.state.email} onChange={this.handleEmailChange} onBlur={this.handleBlur('email')} />
                                <Form.Input className={shouldMarkError('wachtwoord') ? "error": ""} placeholder='Wachtwoord'  style={{ width: "300px"}} value={this.state.wachtwoord} onChange={this.handleWachtwoordChange} onBlur={this.handleBlur('wachtwoord')} />
                                <br/>
                                <Button positive size={'big'}>Inloggen</Button>
                                <Space/>
                                <a href="/">Wachtwoord vergeten?</a>
                            </Form>
                       </Grid.Column>

                       <Grid.Column>
                           <h2>Verder gaan zonder account</h2>
                           <p>Klik op de knop hieronder</p>
                           <Button positive size={'big'} href="/input">Doorgaan</Button>
                       </Grid.Column>
                   </Grid.Row>
                </Grid>
              </Segment>
              <Divider/>
              <Button size={'big'} href='/winkelwagen'>Teruggaan</Button>
            </Container>
        );
    }
}

