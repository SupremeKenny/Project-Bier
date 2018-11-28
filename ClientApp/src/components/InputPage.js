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
    postcode: postcode.length === 0 || postcode.length < 6,
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

        focused: {
          voornaam: false,
          achternaam: false,
          straatnaam: false,
          huisnummer: false,
          postcode: false,
          stad: false,
          telefoonnummer: false,
          email: false,
        }
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
      }
      const { voornaam, achternaam, straatnaam, huisnummer, postcode, stad, telefoonnummer, email } = this.state;
      //alert(`Bestelling klaargezet`);
    }

    handleBlur = (field) => (evt) => {
      this.setState({
        focused: {...this.state.focused, [field]: true},
      });
    }

    canBeSubmitted() {
      const errors = validate(this.state.voornaam, this.state.achternaam, this.state.straatnaam, this.state.huisnummer, this.state.postcode, this.state.stad, this.state.telefoonnummer, this.state.email);
      const NotFilledIn = Object.keys(errors).some(x=>errors[x]);
      return NotFilledIn ? alert('Veld niet correct ingevuld.') : this.addOrder()
      //return !NotFilledIn;
    }

    componentWillMount(){
      this.setState({products: localStorage.Cart ? JSON.parse(localStorage.Cart) : []})
      this.setState({discount: localStorage.Discount ? localStorage.Discount : null})
    }

    addOrder() {
     
      console.log(this.state);
      fetch('order/addorder/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      
      body: JSON.stringify({
        
             "Coupon": this.state.discount,
             //TODO:Coupon meegeven
             "PostalCode": this.state.postcode,
             "StreetNumber": this.state.huisnummer,
             "StreetName": this.state.straatnaam,
             "CityName": this.state.stad,
             "Country": "Nederland",
             "FirstName": this.state.voornaam,
             "LastName": this.state.achternaam,
             "Email": this.state.email,   
             "Products": this.state.products,
      })
      }).then(results => {
        results.json().then(data => window.location.href = "/payment/" + data);
      });
      
       

    }
  
    render() {
      const errors = validate(this.state.voornaam, this.state.achternaam, this.state.straatnaam, this.state.huisnummer, this.state.postcode, this.state.stad, this.state.telefoonnummer, this.state.email);
      const NotFilledIn = Object.keys(errors).some(x=>errors[x]);
      const shouldMarkError = (field) => {
        const hasError = errors[field];
        const shouldShow = this.state.focused[field];
        return hasError ? shouldShow : false;
      };
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
                      <Form.Input required fluid className = {shouldMarkError('voornaam') ? "error" : ""} label='Voornaam' placeholder='ABC' value={this.state.voornaam} onChange={this.handleVoornaamChange} onBlur={this.handleBlur('voornaam')} />
                      <Form.Input fluid label='Tussenvoegsel' placeholder='van' />
                      <Form.Input required fluid className = {shouldMarkError('achternaam') ? "error" : "" } label='Achternaam' placeholder='DEF' value={this.state.achternaam} onChange={this.handleAchternaamChange} onBlur={this.handleBlur('achternaam')} />
                    </Form.Group>
                
                    <Form.Group widths='equal'>
                      <Form.Input required fluid className = {shouldMarkError('straatnaam') ? "error" : ""} label='Straatnaam' placeholder='ABCstraat' value={this.state.straatnaam} onChange={this.handleStraatnaamChange} onBlur={this.handleBlur('straatnaam')} />
                      <Form.Input required fluid className = {shouldMarkError('huisnummer') ? "error" : ""} label='Huisnummer' placeholder='123' value={this.state.huisnummer} onChange={this.handleHuisnummerChange} onBlur={this.handleBlur('huisnummer')} maxLength={5} />
                      <Form.Input fluid label='Toevoeging' placeholder='a' maxLength={3} />
                    </Form.Group>
                  
                    <Form.Group>
                      <Form.Input required className = {shouldMarkError('postcode') ? "error" : ""} label='Postcode' placeholder='1234AB' value={this.state.postcode} onChange={this.handlePostcodeChange} onBlur={this.handleBlur('postcode')} maxLength={6} />
                      <Form.Input required className = {shouldMarkError('stad') ? "error" : ""} label='Stad' placeholder='Rotterdam' value={this.state.stad} onChange={this.handleStadChange} onBlur={this.handleBlur('stad')} />
                    </Form.Group>
                 
                   <Form.Group>
                    <Form.Input label='Land' placeholder='Nederland' readOnly width={6} />
                   </Form.Group>
      
                    <Form.Group>
                      <Form.Input required className = {shouldMarkError('telefoonnummer') ? "error" : ""} label='Telefoonnummer' placeholder='0612345678' width={6} value={this.state.telefoonnummer} onChange={this.handleTelefoonnummerChange} onBlur={this.handleBlur('telefoonnummer')}/>
                    </Form.Group>
              
                    <Form.Group>
                     <Form.Input required className = {shouldMarkError('email') ? "error" : ""} label='E-mailadres' placeholder='123@hotmail.com' width={6} value={this.state.email} onChange={this.handleEmailChange} onBlur={this.handleBlur('email')}/>
                    </Form.Group>
                    
                    <Divider hidden/>
                    <Divider/>
                    <Button.Group size = {'big'}>
                      <Button href="/doorgaan">Teruggaan</Button>
                      <Button.Or text="of" />
                      <Button positive  disabled={NotFilledIn}>Doorgaan</Button>
                    </Button.Group>
                </Form>
            </Container>
      );
    }
}

export default connect(

    )(InputInfo);
    