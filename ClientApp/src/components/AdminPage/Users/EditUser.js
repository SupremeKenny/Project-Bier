import React from 'react';
import {
  Header,
  Segment,
  Form,
  Container,
  Loader,
  Dimmer,
  Divider,
  Button,
  Icon
} from 'semantic-ui-react';

export class EditUser extends React.Component {
  constructor() {
    super();
    this.state = {
      id: '',
      email: '',
      firstName: '',
      lastName: '',
      phoneNumber: '',
      address: [],
      postalCode: '',
      streetNumber: '',
      streetName: '',
      cityName: '',
      country: '',
      province: '',

      user: {},
      loaded: false,
      check: false
    };
  }

  componentWillMount() {
    fetch('/account/GetUserInformation/' + this.props.match.params.id)
    .then(results => {
      results.json().then(data => {
        this.setState({
          user: data.user,
          loaded: true,

          id: data.user.id,
          email: data.user.email,
          firstName: data.user.firstName,
          lastName: data.user.lastName,
          phoneNumber: data.user.phoneNumber,
          address: data.user.shippingAddresses,
          postalCode: data.user.shippingAddresses[0].postalCode,
          streetNumber: data.user.shippingAddresses[0].streetNumber,
          streetName: data.user.shippingAddresses[0].streetName,
          cityName: data.user.shippingAddresses[0].cityName,
          country: data.user.shippingAddresses[0].country,
          province: data.user.shippingAddresses[0].province,
        });
      });
    });
  }

  handleChange = (e, {name, value}) => this.setState({[name]: value});
  toggle = () => this.setState({check: !this.state.check});
  validate = () => {
    if (this.state.check) {
      this.setState({loaded: false});
      this.handleSubmit()
    }
    else alert('Mislukt! U heeft de checkbox nog niet aangevinkt.')
  };

  handleSubmit = () => {
    let bodyData = JSON.stringify({
      PostalCode: this.state.postalCode,
      StreetNumber: this.state.streetNumber,
      StreetName: this.state.streetName,
      CityName: this.state.cityName,
      Country: this.state.country,
      FirstName: this.state.firstName,
      LastName: this.state.lastName,
      Province: this.state.province,
      PhoneNumber: this.state.phoneNumber,
      Email: this.state.email
    });

    if (this.state.id !== '') {
      fetch('account/Update/' + this.props.match.params.id, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        method: 'Put',
        body: bodyData,
      }).then(response => {
        if (response.ok) {
          alert('Gebruikersinformatie is succesvol aangepast.');
        }
        else alert('Error! Product is niet aangepast.')
        this.setState({check: false, loaded: true});

      });
    }
  };

  render() {
    if (!this.state.loaded) {
      return (
          <Dimmer active inverted>
            <Loader size="large">Loading</Loader>
          </Dimmer>
      );
    } else
      return (
          <Container>
            <div>
              <Button animated floated="right" href="/admin-allUsers" color="blue">
                <Button.Content visible>Terug naar overzicht</Button.Content>
                <Button.Content hidden>
                  <Icon name="arrow left"/>
                </Button.Content>
              </Button>
              <Header as="h1">Gebruiker aanpassen</Header>

            </div>
            <Divider/>

            <Segment>
              <Form onSubmit={this.validate}>
                <Divider horizontal>
                  <Header as='h4'>
                    <Icon name='user circle'/>
                    {this.state.id}
                  </Header>
                </Divider>

                <Form.Group widths={2}>
                  <Form.Input
                      label="Voornaam"
                      placeholder="Voornaam"
                      name="firstName"
                      value={this.state.firstName}
                      onChange={this.handleChange}
                      required
                  />
                  <Form.Input
                      label="Achternaam"
                      placeholder="Achternaam"
                      name="lastName"
                      value={this.state.lastName}
                      onChange={this.handleChange}
                      required
                  />
                </Form.Group>

                <Form.Group widths={2}>
                  <Form.Input
                      label="Email"
                      placeholder="Email"
                      name="email"
                      value={this.state.email}
                      onChange={this.handleChange}
                      required
                  />
                  <Form.Input
                      label="Telefoonnummer"
                      placeholder="06xxxxxxxx"
                      name="phoneNumber"
                      value={this.state.phoneNumber}
                      onChange={this.handleChange}
                      required
                  />
                </Form.Group>

                <Form.Group widths={2}>
                  <Form.Input
                      label="Adres"
                      placeholder="Wijnhaven"
                      name="streetName"
                      value={this.state.streetName}
                      onChange={this.handleChange}
                      required
                  />
                  <Form.Input
                      label="Huisnummer"
                      placeholder="107"
                      name="streetNumber"
                      value={this.state.streetNumber}
                      onChange={this.handleChange}
                      required
                  />
                </Form.Group>

                <Form.Group widths={2}>
                  <Form.Input
                      label="Postcode"
                      placeholder="3011WN"
                      name="postalCode"
                      value={this.state.postalCode}
                      onChange={this.handleChange}
                      required
                  />
                  <Form.Input
                      label="Plaats"
                      placeholder="Rotterdam"
                      name="cityName"
                      value={this.state.cityName}
                      onChange={this.handleChange}
                      required
                  />
                </Form.Group>

                <Form.Checkbox
                    label='Alle gegevens zijn gecontroleerd'
                    value={this.check}
                    onChange={this.toggle}
                    required
                    toggle
                />

                <Form.Button content="Aanpassen" color="blue"/>

              </Form>
            </Segment>
          </Container>
      );
  }
}
