import React from 'react';
import {
  Header,
  Segment,
  Form,
  TextArea,
  Select,
  Container,
  Button,
  Icon,
  Dimmer,
  Loader
} from 'semantic-ui-react';

export class AddProducts extends React.Component {
  constructor() {
    super();
    this.state = {
      id: '',
      name: '',
      categoryId: '',
      price: '',
      brewerName: '',
      countryName: '',
      alcoholPercentage: '',
      content: '',
      url: '',
      description: '',
      check: false,
      loaded: true
    }
  }

  handleChange = (e, {name, value}) => this.setState({[name]: value})
  toggle = () => this.setState({check: !this.state.check})
  validate = () => {
    if (this.state.check) {
      this.setState({loaded: false})
      setTimeout(() => {
        this.handleSubmit()
      }, 200)

    }
    else alert('Mislukt! U heeft de checkbox nog niet aangevinkt.')
  }

  handleReset = () => {
    this.setState({
      id: '',
      name: '',
      categoryId: '',
      price: '',
      brewerName: '',
      countryName: '',
      alcoholPercentage: '',
      content: '',
      url: '',
      description: '',
      check: false,
      loaded: true
    })
  }

  handleSubmit = () => {
    let bodyData = JSON.stringify({
      'Id': this.state.id,
      'Name': this.state.name,
      'CategoryId': this.state.categoryId,
      'Price': this.state.price,
      'BrewerName': this.state.brewerName,
      'CountryName': this.state.countryName,
      'AlcoholPercentage': this.state.alcoholPercentage,
      'Content': this.state.content,
      'Url': this.state.url,
      'Description': this.state.description,
      'Available': true
    })

    if (this.state.id !== '' && this.state.name !== '' && this.state.categoryId !== '' && this.state.price !== '') {
      console.log('Uitgevoerd'),
          fetch('admin/Create/', {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            method: 'POST',
            body: bodyData
          }).then(response => {
            if (response.ok) {
              alert('Product is succesvol toegevoegd.');
              this.handleReset()
            }
            else {
              this.setState({loaded: true})
              alert('Error! Product is niet toegevoegd.')
            }
          })
    }
    else console.log('Verplichte velden leeg');
  }

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
            <Header as='h1'>Product toevoegen</Header>
            <Segment>
              <Form onSubmit={this.validate} id="myForm">
                <Form.Group unstackable widths={2}>
                  <Form.Input
                      label="Product ID (url)"
                      placeholder='Id'
                      name='id'
                      value={this.state.id}
                      onChange={this.handleChange}
                      required
                  />
                  <Form.Input
                      label='Naam'
                      placeholder='Name'
                      name='name'
                      value={this.state.name}
                      onChange={this.handleChange}
                      required
                  />
                </Form.Group>

                <Form.Group widths={2}>
                  <Form.Field
                      control={Select}
                      label='Categorie'
                      placeholder='CategoryId'
                      options={CategoryId}
                      name='categoryId'
                      value={this.state.categoryId}
                      onChange={this.handleChange}
                      required
                  />
                  <Form.Input
                      label='Prijs'
                      placeholder='Price'
                      name='price'
                      value={this.state.price}
                      onChange={this.handleChange}
                      type='number'
                      step="0.01"
                      min="0.00"
                      required
                  />
                </Form.Group>

                <Form.Group widths={2}>
                  <Form.Input
                      label='Brouwer'
                      placeholder='BrewerName'
                      name='brewerName'
                      value={this.state.brewerName}
                      onChange={this.handleChange}
                      required
                  />
                  <Form.Input
                      label='Land van herkomst'
                      placeholder='CountryName'
                      name='countryName'
                      value={this.state.countryName}
                      onChange={this.handleChange}
                      required
                  />
                </Form.Group>

                <Form.Group widths={2}>
                  <Form.Input
                      label='Alcoholpercentage'
                      placeholder='AlcoholPercentage'
                      name='alcoholPercentage'
                      value={this.state.alcoholPercentage}
                      onChange={this.handleChange}
                      type='number'
                      step="0.01"
                      min="0.00"
                      required
                  />
                  <Form.Input
                      label='Inhoud'
                      placeholder='Content'
                      name='content'
                      value={this.state.content}
                      onChange={this.handleChange}
                      required
                  />
                </Form.Group>

                <Form.Input
                    label='Afbeelding Link'
                    placeholder='Url'
                    name='url'
                    value={this.state.url}
                    onChange={this.handleChange}
                    required
                />

                <Form.Field
                    control={TextArea}
                    label='Omschrijving'
                    placeholder='Description'
                    name='description'
                    value={this.state.description}
                    onChange={this.handleChange}
                    required
                />

                <Form.Checkbox
                    label='Alle gegevens zijn gecontroleerd'
                    value={this.state.check}
                    onChange={this.toggle}
                    required
                    toggle
                />
                <Form.Button animated color="green">
                  <Button.Content hidden content='Akkoord'/>
                  <Button.Content visible>
                    <Icon name='add'/> Toevoegen
                  </Button.Content>

                </Form.Button>
              </Form>
            </Segment>
          </Container>
      );
  }

}

const CategoryId = [
  {key: '1', text: 'Amber', value: 'Amber'},
  {key: '2', text: 'Barley Wine', value: 'Barley Wine'},
  {key: '3', text: 'Belian Ale', value: 'Belgian Ale'},
  {key: '4', text: 'Blond', value: 'Blond'},
  {key: '5', text: 'Bock', value: 'Bock'},
  {key: '6', text: 'Brown Ale', value: 'Brown Ale'},
  {key: '7', text: 'Dubbel', value: 'Dubbel'},
  {key: '8', text: 'India Pale Ale', value: 'India Pale Ale'},
  {key: '9', text: 'Lager', value: 'Lager'},
  {key: '10', text: 'Pale Ale', value: 'Pale Ale'},
  {key: '11', text: 'Pils', value: 'Pils'},
  {key: '12', text: 'Porter', value: 'Porter'},
  {key: '13', text: 'Quadrupel', value: 'Quadrupel'},
  {key: '14', text: 'Saison', value: 'Saison'},
  {key: '15', text: 'Sour Beer', value: 'Sour Beer'},
  {key: '16', text: 'Stout', value: 'Stout'},
  {key: '17', text: 'Tripel', value: 'Tripel'},
  {key: '18', text: 'Weizen', value: 'Weizen'},
  {key: '19', text: 'Wit', value: 'Wit'},
]