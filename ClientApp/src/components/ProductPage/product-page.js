import React, { Component } from "react";
import { CategoryDict } from "../Categories.js";
import { Link } from "react-router-dom";
import { ProductInfoTable } from "./productinfo-table.js"
import { connect } from "react-redux";
import { addCartItem } from '../../actions/actionCreator'
import { bindActionCreators } from 'redux'
import { HeartButton} from './heart-button.js';
import { addFavoritesItem } from '../../actions/actionCreator'

import {
  Header,
  Container,
  Breadcrumb,
  Grid,
  Image,
  Label,
  Button,
  Icon,
  Popup,
  Divider,
  Loader
} from "semantic-ui-react";

class ProductPage extends Component {
  constructor() {
    super();
    this.state = {
      product: {},
      loaded: false
    };
  }

  componentWillMount() {
    fetch(
      "https://localhost:5001/product/fetch?id=" + this.props.match.params.id
    ).then(results => {
      results.json().then(data => {
        this.setState({ product: data.product, loaded: true });
        this.setTitle();
      });
    });
  }

  setTitle() {
    document.title = "Beer Buddy: " + this.state.product.name;
  }


  render() {
    if (!this.state.loaded) {
      return (
        <Loader />
      );
    } else
      return (
        <MainContainer>

          <Breadcrumb>
            <Link to="/">
              <Breadcrumb.Section link>Hoofdpagina</Breadcrumb.Section>{" "}
            </Link>
            <Breadcrumb.Divider icon="right angle" />
            <Link to={"/category/" + this.state.product.categoryId}>
              <Breadcrumb.Section link>
                {CategoryDict[this.state.product.categoryId]}
              </Breadcrumb.Section>
            </Link>
            <Breadcrumb.Divider icon="right angle" />
            <Breadcrumb.Section active>
              {this.state.product.name}
            </Breadcrumb.Section>
          </Breadcrumb>

          <Divider />
          <MiddleContainer>
            <DescriptionContainer
              title={this.state.product.name}
              descriptionText={this.state.product.description}
              brand={this.state.product.brand}
            >
              <ProductInfoTable
                brand={this.state.product.brewerName}
                content={this.state.product.content}
                country={this.state.product.countryName}
                percentage={this.state.product.alcoholPercentage}
                category={CategoryDict[this.state.product.categoryId]}
                link={this.state.product.categoryId}
              />

              <PriceDisplay price={this.state.product.price} />

              <Divider hidden />

              <div>
                <Button
                  color="green"
                  size="large"
                  onClick={() => { this.props.addCartItem(this.state.product.id, this.state.product.name, this.state.product.price, this.state.product.url); }} style={{ marginTop: "25px" }}
                >
                  Toevoegen aan winkelmand <Icon name="plus" fitted="true" />
                </Button>

                <Popup
                  trigger={
                   <HeartButton/>
                  }
                  content="Voeg toe aan verlanglijstje"
                  position="bottom left"
                />
                
                <Button
                  color='red'
                  icon='heart'
                  onClick={() => { this.props.addFavoritesItem(this.state.product.id, this.state.product.name, this.state.product.price, this.state.product.url); }}
                >
                </Button>

              </div>

            </DescriptionContainer>

            <ImageContainer url={this.state.product.url + "?w=150"} />
          </MiddleContainer>
        </MainContainer>
      );
  }
}
const headerSX = { fontFamily: "Raleway", fontSize: 38, color: "#2f3542" };
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

  return (
    <Grid.Column width={10}>
      <Header as="h1" style={headerSX}>
        {props.title}
      </Header>
      <p>
        {props.brand}
      </p>
      <Label color="green" size="large">
        Op voorraad
      </Label>

      <p style={sxc}>
        {props.descriptionText}
      </p>
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
        <b style={sx}>€{String(props.price).replace('.', ',')} </b>
        per flesje
      </p>

    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    addCartItem,
    addFavoritesItem
  }, dispatch)
}

export default connect(null, mapDispatchToProps)(ProductPage)