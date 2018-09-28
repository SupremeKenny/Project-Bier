import PropTypes from "prop-types";
import React, { Component } from "react";
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
  Table
} from "semantic-ui-react";

export class ProductPage extends React.Component {
  render() {
    return (
      <MainContainer>
        <Breadcrumb>
          <Breadcrumb.Section link>Home</Breadcrumb.Section>
          <Breadcrumb.Divider icon="right angle" />
          <Breadcrumb.Section link>Beers</Breadcrumb.Section>
          <Breadcrumb.Divider icon="right angle" />
          <Breadcrumb.Section active>Lorem Ipsum</Breadcrumb.Section>
        </Breadcrumb>
        <Divider />
        <MiddleContainer>
          <DescriptionContainer
            title="Thornbridge Am:Pm"
            descriptionText="Goukleurig bier met een oranje schijn, stevige witte schuimkraag. Dit bier zit vol tropisch fruit. De fruitige nasmaak van deze lichte doordrinker gaat gepaard met een stevig bitter karakter."
          >
            <Information />

            <PriceDisplay price="2.99" />
            <Divider hidden />
            <div>
              <Button color="green" size="large">
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
              "https://www.beerwulf.com/globalassets/thornbridge---am-pm-33cl.png?h=500&rev=427151746"
            }
          />
        </MiddleContainer>
      </MainContainer>
    );
  }
}
const headerSX = {fontFamily:"Raleway", fontSize: 38, color:'#2f3542'};
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
      <p>Producent</p>
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
        <b style={sx}>${props.price}</b>
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
            <Table.Cell>Thornbridge</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
      <Divider />
    </div>
  );
};
