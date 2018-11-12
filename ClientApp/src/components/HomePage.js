import React, { Component } from "react";
import { ProductCard } from "./ProductCard.js";
import { BrandImage } from "./brand-image.js";
import {
  Container,
  CardGroup,
  Dimmer,
  Loader,
  Header,
  Divider
} from "semantic-ui-react";

const MainContainer = ({ children }) => {
  const sx = {
    paddingTop: "2em"
  };

  return <Container style={sx}>{children}</Container>;
};

const ProductsGroup = props => (
  <CardGroup itemsPerRow={4}>
    {props.products.map(beer => (
      <ProductCard
        id={beer.id}
        title={beer.name}
        url={beer.url}
        price={beer.price}
      />
    ))}
  </CardGroup>
);

const headerStyling = { fontFamily: "Raleway", fontSize: 30, color: "#ffa502" };
const BrandShowcase = () => (
  <div>
    <Header as="h1" style={headerStyling} textAlign="center">
      Bij BeerBuddy hebben we de beste merken in huis
      <Header.Subheader>
        Ontdek vandaag nog het lekkerste craftbier!
      </Header.Subheader>
    </Header>

    <Divider />

    <div
      style={{
        display: "flex",
        justifyContent: "space-evenly",
        paddingBottom: "2em"
      }}
    >
      <BrandImage url="brands/chouffe.png" />
      <BrandImage url="brands/ipa.png" />
      <BrandImage url="brands/heiniken.png" />
      <BrandImage url="brands/paulaner.png" />
    </div>
  </div>
);

export class HomePage extends React.Component {
  constructor() {
    super();
    this.state = {
      products: {},
      loaded: false
    };
  }

  componentWillMount() {
    this.setTitle();
    fetch("/product/FetchHome").then(results => {
      results.json().then(data => {
        this.setState({ products: data.products, loaded: true });
      });
      // TODO implement catch()
    });
  }

  setTitle() {
    document.title = "Beer Buddy";
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
        <MainContainer>
          <BrandShowcase />
          <Header as="h1" style={headerStyling} textAlign="center">
            Deze biertjes raden we aan!
            <Header.Subheader>Lekker, lekker, lekker...</Header.Subheader>
          </Header>
          <Divider />
          <ProductsGroup products={this.state.products} />
        </MainContainer>
      );
  }
}
