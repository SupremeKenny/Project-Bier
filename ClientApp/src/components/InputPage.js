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

function validate(voornaam, achternaam, straatnaam, huisnummer, postcode, stad, telefoonnummer, email) {
  return {
    voornaam: voornaam.length === 0,
    achternaam: achternaam.length === 0,
    straatnaam: straatnaam.length === 0,
    huisnummer: huisnummer.length === 0,
    postcode: postcode.length === 0,
    stad: stad.length === 0,
    telefoonnummer: telefoonnummer.length === 0,
    email: email.length === 0,
  };
}
class InputInfo extends Component {
    constructor() {
      super();
      this.state = {
        voornaam: '',
        achternaam: '',
        straatnaam: '',
        huisnummer: '',
        postcode: '',
        stad: '',
        telefoonnummer: '',
        email: '',
      };
    }
    
    handleVoornaamChange = (evt) => {
      this.setState({ voornaam: evt.target.value });
    }
    
    handleAchternaamChange = (evt) => {
      this.setState({ achternaam: evt.target.value });
    }

    handleStraatnaamChange = (evt) => {
      this.setState({ straatnaam: evt.target.value });
    }

    handleHuisnummerChange = (evt) => {
      this.setState({ huisnummer: evt.target.value});
    }
    
    handlePostcodeChange = (evt) => {
      this.setState({ postcode: evt.target.value});
    }

    handleStadChange = (evt) => {
      this.setState({ stad: evt.target.value});
    }

    handleTelefoonnummerChange = (evt) => {
      this.setState({ telefoonnummer: evt.target.value});
    }

    handleEmailChange = (evt) => {
      this.setState({ email: evt.target.value});
    }

    handleSubmit = (evt) => {
      if (!this.canBeSubmitted()) {
        evt.preventDefault();
        return;
      }
      const { voornaam, achternaam, straatnaam, huisnummer, postcode, stad, telefoonnummer, email } = this.state;
      alert(`Bestelling klaargezet`);
    }

    canBeSubmitted() {
      const errors = validate(this.state.voornaam, this.state.achternaam, this.state.straatnaam, this.state.huisnummer, this.state.postcode, this.state.stad, this.state.telefoonnummer, this.state.email);
      const NotFilledIn = Object.keys(errors).some(x=>errors[x]);
      return !NotFilledIn;
    }
  
    render() {
      const errors = validate(this.state.voornaam, this.state.achternaam, this.state.straatnaam, this.state.huisnummer, this.state.postcode, this.state.stad, this.state.telefoonnummer, this.state.email);
      const NotFilledIn = Object.keys(errors).some(x=>errors[x]);
      const { voornaam, achternaam, straatnaam, huisnummer, postcode, stad, telefoonnummer, email } = this.state;
      const FilledIn =
            voornaam.length > 0 &&
            achternaam.length > 0 &&
            straatnaam.length > 0 &&
            huisnummer.length > 0 &&
            postcode.length > 0 && 
            stad.length > 0 &&
            telefoonnummer.length > 0 &&
            email.length > 0;
      return(
            <Container>
                <Divider hidden/>
                <StepOrder/>
                <Divider />
                <h2>Vul uw gegevens in</h2>
                <Divider hidden/>
                <Form onSubmit = {this.handleSubmit} size = {'big'} key = {'large'}>
                    <Form.Group widths='equal'>
                      <Form.Input required fluid className = {errors.voornaam ? "error" : ""} label='Voornaam' placeholder='ABC' value={this.state.voornaam} onChange={this.handleVoornaamChange} />
                      <Form.Input fluid label='Tussenvoegsel' placeholder='van' />
                      <Form.Input required fluid className = {errors.achternaam ? "error" : "" } label='Achternaam' placeholder='DEF' value={this.state.achternaam} onChange={this.handleAchternaamChange} />
                    </Form.Group>
                
                    <Form.Group widths='equal'>
                      <Form.Input required fluid className = {errors.achternaam ? "error" : ""} label='Straatnaam' placeholder='ABCstraat' value={this.state.straatnaam} onChange={this.handleStraatnaamChange} />
                      <Form.Input required fluid className = {errors.huisnummer ? "error" : ""} label='Huisnummer' placeholder='123' value={this.state.huisnummer} onChange={this.handleHuisnummerChange} />
                      <Form.Input fluid label='Toevoeging' placeholder='a' />
                    </Form.Group>
                  
                    <Form.Group>
                      <Form.Input required className = {errors.postcode ? "error" : ""} label='Postcode' placeholder='1234 AB' value={this.state.postcode} onChange={this.handlePostcodeChange} />
                      <Form.Input required className = {errors.stad ? "error" : ""} label='Stad' placeholder='Rotterdam' value={this.state.stad} onChange={this.handleStadChange} />
                    </Form.Group>
                 
                   <Form.Group>
                    <Form.Input label='Land' placeholder='Nederland' readOnly width={6} />
                   </Form.Group>
      
                    <Form.Group>
                      <Form.Input required className = {errors.telefoonnummer ? "error" : ""} label='Telefoonnummer' placeholder='0612345678' width={6} value={this.state.telefoonnummer} onChange={this.handleTelefoonnummerChange} />
                    </Form.Group>
              
                    <Form.Group>
                     <Form.Input required className = {errors.email ? "error" : ""} label='E-mailadres' placeholder='123@hotmail.com' width={6} value={this.state.email} onChange={this.handleEmailChange} />
                    </Form.Group>
                    
                    <Divider hidden/>
                    <Divider/>
                    <Button.Group size = {'big'}>
                      <Button href="/doorgaan">Teruggaan</Button>
                      <Button.Or text="of" />
                      <Button positive href="/payment" disabled={NotFilledIn}>Doorgaan</Button>
                    </Button.Group>
                </Form>
            </Container>
      );
    }
}

export default connect(

    )(InputInfo);
    