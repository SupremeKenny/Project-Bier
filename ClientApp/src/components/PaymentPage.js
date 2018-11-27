import React, { Component } from "react";
import { connect } from "react-redux";
import { clearCart } from '../actions/actionCreator'
import { bindActionCreators } from 'redux'
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
      <Step link href="/input">
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

const sizes = ['mini', 'tiny', 'small', 'large', 'big', 'huge', 'massive']

const Space = () => " ";

const ButtonCoC = () => (
    <Button.Group size = {'big'}>
      <Button href="/input">Teruggaan</Button>
      <Button.Or text="of" />
      <Button positive href="/confirmation">Doorgaan</Button>
    </Button.Group>
  );


class Payment extends Component {

  componentWillMount(){
    this.props.clearCart();
  }

    state = {}
    handleClick = () => this.setState({ active: !this.state.active })
    handleClick1 = () => this.state.active ? window.location.href = "/confirmation" : alert('Selecteer een betalingswijze alstublieft.')
    render() {
        const { active } = this.state
        return(
            <Container>
                <Divider hidden/>
                <StepOrder/>
                <Divider/>
                <h2>Kies uw betalingswijze</h2>
                <br/>
                <Button toggle active={active} onClick={this.handleClick} style={{ height: "100px", width: "200px" }}><h2>Simulator</h2></Button>
                <Divider hidden/>
                <Divider/>
                <Button.Group size = {'big'}>
                <Button href="/input">Teruggaan</Button>
                  <Button.Or text="of" />
                  <Button positive onClick={this.handleClick1}>Doorgaan</Button>
                </Button.Group>
            </Container>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    clearCart
  }, dispatch)
}


export default connect(null, mapDispatchToProps)(Payment);
    