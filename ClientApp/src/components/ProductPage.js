import PropTypes from "prop-types";
import React, { Component } from "react";
import { updateInput } from "./LocalStorage.js"

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
  Loader,
  Dimmer
} from "semantic-ui-react";

export class ProductPage extends React.Component {
  constructor() {
    super();
    this.state = {
      product: {},
      loaded: false
    }
  }

  componentWillMount() {
    console.log(this.props.match.params.id);
    fetch("https://localhost:5001/product/fetch?id=" + this.props.match.params.id).then(results => {
      results.json().then(data => {
        console.log(data.product)
        this.setState({ product: data.product, loaded: true });
      })
    })
  }

  render() {
    console.log(this.state.product);
    if (!this.state.loaded) {
      return (<Segment>
        <Dimmer active>
          <Loader />
        </Dimmer>
      </Segment>)
    }
    else
      return (
        <MainContainer>
          <Breadcrumb>
            <Breadcrumb.Section link>Home</Breadcrumb.Section>
            <Breadcrumb.Divider icon="right angle" />
            <Breadcrumb.Section link>Beers</Breadcrumb.Section>
            <Breadcrumb.Divider icon="right angle" />
            <Breadcrumb.Section active>{this.state.product.name}</Breadcrumb.Section>
          </Breadcrumb>
          <Divider />
          <MiddleContainer>
            <DescriptionContainer
              title={this.state.product.name}
              descriptionText={this.state.product.description}
              brand={this.state.product.brand}
            >
              <Information brand={this.state.product.brand}/>

              <PriceDisplay price={this.state.product.price} />
              <Divider hidden />
              <div>
                <Button color="green" size="large" onClick={e => updateInput(this.state.product.id)}>
                  Toevoegen aan winkelmand <Icon name="plus" fitted="true" />
                </Button>

                <Popup
                  trigger={
                    <Button icon color="red">
                      <Icon name="heart" />
                    </Button>
                  }
                  content="Voeg toe aan verlanglijstje"
                  position="bottom left"
                />
              </div>
            </DescriptionContainer>

            <ImageContainer
              url={
                this.state.product.url
              }
            />
          </MiddleContainer>
        </MainContainer>
      );
  }
}
const headerSX = { fontFamily: "Raleway", fontSize: 38, color: '#2f3542' };
const MainContainer = ({ children }) => {
  const sx = {
    paddingTop: "2em"
  };

  return <Container style={sx}>{children}</Container>;
};

const ImageContainer = props => {
  const sx = { float: "right" };
  return (
    <Grid.Column width={6}>
      <Image src={props.url} style={sx} />
    </Grid.Column>
  );
};

const DescriptionContainer = props => {
  const sxc = {
    paddingTop: "1em",
    fontSize: 20
  };

  const priceStyle = {};
  return (
    <Grid.Column width={10}>
      <Header as="h1" style={headerSX}>{props.title}</Header>
      <p>{props.brand}</p>
      <Label color="green" ribbon>
        Op vooraad
      </Label>
      <Rating icon="star" defaultRating={3} maxRating={5} disabled />
      <p style={sxc}>{props.descriptionText}</p>
      {props.children}
    </Grid.Column>
  );
};

const MiddleContainer = ({ children }) => {
  const sx = {
    paddingTop: "2em"
  };

  return (
    <Grid columns={2} stackable style={sx}>
      {children}
    </Grid>
  );
};

const PriceDisplay = props => {
  const sx = {
    paddingTop: "2em",
    fontSize: 36,
    color: "#2f3542"
  };

  return (
    <div>
      <p>
        <b style={sx}>${props.price} </b>
        per flesje
      </p>
    </div>
  );
};

const Information = props => {
  return (
    <div>
      <Divider />
      <Table basic="very" celled collapsing>
        <Table.Body>
          <Table.Row>
            <Table.Cell>
              <Header as="h4" image>
                <Header.Content>Flesinhoud</Header.Content>
              </Header>
            </Table.Cell>
            <Table.Cell>33 centiliter</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              <Header as="h4" image>
                <Header.Content>Alcoholpercentage</Header.Content>
              </Header>
            </Table.Cell>
            <Table.Cell>4.3%</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              <Header as="h4" image>
                <Header.Content>Stijl</Header.Content>
              </Header>
            </Table.Cell>
            <Table.Cell>India Pale Ale</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              <Header as="h4" image>
                <Header.Content>Brouwer</Header.Content>
              </Header>
            </Table.Cell>
            <Table.Cell>{props.brand}</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
      <Divider />
    </div>
  );
};
