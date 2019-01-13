import React from 'react';
import {
  Header,
  Segment,
  Form,
  Select,
  Container,
  Button,
  Icon,
  Dimmer,
  Loader
} from 'semantic-ui-react';

export class AddDiscount extends React.Component {
  state = {
    code: '',
    procent: '',
    amount: '',
    check: false,
    loaded: true
  }


  handleChange = (e, {name, value}) => this.setState({[name]: value})
  toggle = () => this.setState({check: !this.state.check})
  validate = () => {

    if (this.state.code == '' && this.state.procent == '' && this.state.amount == '') {
      alert('Niet alle velden zijn ingevuld');
    } else {

      if (this.state.procent === 'Procent' && this.state.amount > 100) {
        alert('Een procentuele korting mag niet hoger zijn dan 100 procent');

      } else {

        if (this.state.check) {
          this.setState({loaded: false})
          setTimeout(() => {
            this.handleSubmit()
          }, 200)

        }
        else alert('Mislukt! U heeft de checkbox nog niet aangevinkt.')
      }
    }
  }
  handleReset = () => {
    this.setState({
      code: '',
      procent: '',
      amount: '',
      check: false,
      loaded: true
    })
  }

  handleSubmit = () => {
    let bodyData = null;
    if (this.state.procent === 'Procent') {
      bodyData = JSON.stringify({
        'Code': this.state.code,
        'Procent': true,
        'Amount': this.state.amount
      })
    } else {
      bodyData = JSON.stringify({
        'Code': this.state.code,
        'Procent': false,
        'Amount': this.state.amount
      })
    }


    console.log('Uitgevoerd'),
        fetch('admin/creatediscount/', {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          method: 'POST',
          body: bodyData
        }).then(response => {
          if (response.ok) {
            alert('Kortingscode is succesvol toegevoegd.');
            this.handleReset()
          }
          else {
            this.setState({loaded: true})
            alert('Error! Kortingscode is niet toegevoegd.')
          }
        })


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
            <Header as='h1'>Kortingscode toevoegen</Header>
            <Segment>
              <Form onSubmit={this.validate} id="myForm">
                <Form.Group unstackable widths={2}>
                  <Form.Input
                      label='Code *'
                      placeholder='Kortingscode'
                      name='code'
                      value={this.code}
                      onChange={this.handleChange}
                  />
                  <Form.Field
                      control={Select}
                      label='Procent of euro korting *'
                      placeholder='Procent of euro korting'
                      options={Procent}
                      name='procent'
                      value={this.procent}
                      onChange={this.handleChange}
                  />
                </Form.Group>

                <Form.Group widths={2}>

                  <Form.Input
                      label='Hoeveelheid *'
                      placeholder='Euro korting/Procent korting'
                      name='amount'
                      value={this.amount}
                      onChange={this.handleChange}
                      type='number'
                      step="0.01"
                      min="0.00"
                  />
                </Form.Group>

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

const Procent = [
  {key: '1', text: 'Procent', value: 'Procent'},
  {key: '2', text: 'Euro', value: 'Euro'}
]