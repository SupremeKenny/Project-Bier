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
    Dropdown
  } from "semantic-ui-react";

  const Breadcrumb1 = () => (
    <Breadcrumb size="large">
      <Breadcrumb.Section active>
        <a href="/">Home</a>
      </Breadcrumb.Section>
      <Breadcrumb.Divider icon="right chevron" />
      <Breadcrumb.Section active>
        <a href="/favorieten">Mijn Favorietenlijst</a>
      </Breadcrumb.Section>
    </Breadcrumb>
  );

  class Favorites extends Component {
    render() {
      return(
        <Container>
          <Divider hidden/>
          <Breadcrumb1/>
          <Divider/>
          <h1>Mijn Favorietenlijst</h1>
          <Divider hidden/>
          <Divider/>

          <div>
            <Grid divided='vertically' columns="equal">
              <Grid.Row>
                <Grid.Column width={2}>
                  <h2>img</h2>
                </Grid.Column>
                <Grid.Column width={4}><h2>name</h2></Grid.Column>
                <Grid.Column width={2}><h2>Prijs</h2></Grid.Column>
                <Grid.Column textAlign='right'>
                  <Popup 
                    trigger={<Button content="Toevoegen" icon="cart" color="green" />}
                    content="Klik om het product toe te voegen aan jouw winkelwagen."
                    hideOnScroll
                   />
                  <Button negative>Verwijder</Button>
                </Grid.Column>
              </Grid.Row>
            
            </Grid>
          

          </div>

        </Container>
      );

    }
  }

  export default connect(
  )(Favorites);