import React, { Component } from 'react';
//import { getOptions } from "../common"  -----> for options dropdown lists

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
  } from "semantic-ui-react";

  const Breadcrumb1 = () => (
    <Breadcrumb size='large'>
      <Breadcrumb.Section active>
        <a href='/'>Home</a>
      </Breadcrumb.Section>
      <Breadcrumb.Divider icon='right chevron' />
      <Breadcrumb.Section active>
        <a href='/cart'>Mijn Winkelwagen</a>
      </Breadcrumb.Section>
    </Breadcrumb>
  )
  
  export default Breadcrumb1

  const options = [
    { key: 1, text: '1', value: 1 },
    { key: 2, text: '2', value: 2 },
    { key: 3, text: '3', value: 3 },
    { key: 4, text: '4', value: 4 },
    { key: 5, text: '5', value: 5 },
    { key: 6, text: '6', value: 6 }
  ]

  const DropdownQuantity = () => (
    <Dropdown compact selection options={options} />
  )

  const DeleteButton = () => (
    <div>
      <Button negative>Verwijder</Button>
    </div>
  )

  const ButtonCoC = () => (
    <Button.Group>
      <Button>Annuleren</Button>
      <Button.Or text='of' />
      <Button positive>Doorgaan</Button>
    </Button.Group>
  )

  const Space = () => (
    " "
  )

  const ButtonCheck = () => <Button>Check</Button>

  const Input1 = () => <Input placeholder='Vul je kortingscode in...' />

  const ListProducts = () => (
    <Grid divided='vertically' columns='equal'>
      <Grid.Row>
        <Grid.Column width={3}>
          <Image src='https://react.semantic-ui.com/images/wireframe/image.png' size="small"  />
        </Grid.Column>
        <Grid.Column width={4}>
            Vandestreek Bock jij of bock ik?
        </Grid.Column>
        <Grid.Column width={2}>
            Prijs: €2,19
        </Grid.Column>
        <Grid.Column width={3}>
            Hoeveelheid: 
            <Space />
            <DropdownQuantity/>
        </Grid.Column>
        <Grid.Column width={2}>
            <DeleteButton />
        </Grid.Column>
        <Grid.Column width={2}>
            Totaal: €2,19
        </Grid.Column>
      </Grid.Row>
      
      <Grid.Row>
        <Grid.Column width={3}>
          <Image src='https://react.semantic-ui.com/images/wireframe/image.png' size="small"  />
        </Grid.Column>
        <Grid.Column width={4}>
            Vandestreek Bock jij of bock ik?
        </Grid.Column>
        <Grid.Column width={2}>
            Prijs: €2,19
        </Grid.Column>
        <Grid.Column width={3}>
            Hoeveelheid: 
            <Space />
            <DropdownQuantity/>
        </Grid.Column>
        <Grid.Column width={2}>
            <DeleteButton />
        </Grid.Column>
        <Grid.Column width={2}>
            Totaal: €2,19
        </Grid.Column>
      </Grid.Row>
      
      <Grid.Row>
        <Grid.Column width={3}>
          <Image src='https://react.semantic-ui.com/images/wireframe/image.png' size="small"  />
        </Grid.Column>
        <Grid.Column width={4}>
            Vandestreek Bock jij of bock ik?
        </Grid.Column>
        <Grid.Column width={2}>
            Prijs: €2,19
        </Grid.Column>
        <Grid.Column width={3}>
            Hoeveelheid: 
            <Space />
            <DropdownQuantity/>
        </Grid.Column>
        <Grid.Column width={2}>
            <DeleteButton />
        </Grid.Column>
        <Grid.Column width={2}>
            Totaal: €2,19
        </Grid.Column>
      </Grid.Row>
    </Grid>
  )
  
export class ShoppingCart extends Component {
    render() {
          return (
              <Container>
                  <Divider hidden />
                  <Breadcrumb1 />
                  <Divider />
                  <h1>Mijn Winkelwagen</h1>
                  <Divider hidden />
                  <Divider />
                  <ListProducts />
                  <Divider />
                  <Container textAlign='left'>
                    <h4>Kortingscode: <Input1 /><ButtonCheck /></h4>
                  </Container>
                  <Container textAlign='right'>
                  <h3>Totaal: </h3>
                  <ButtonCoC />
                  </Container>
              </Container>
          )
      }

};
