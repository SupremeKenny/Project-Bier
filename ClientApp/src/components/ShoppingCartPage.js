import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { ProductCard, ProductCardPlaceholder } from "./ProductCards.js";
import {
  addCartItem,
  deleteCartItem,
  decrementCartItem
} from "../actions/actionCreator";
import { bindActionCreators } from "redux";

import {
  Container,
  Breadcrumb,
  Grid,
  Image,
  Button,
  Divider,
  Input,
  CardGroup,
  Header,
  Icon
} from "semantic-ui-react";

const BreadcrumbTop = () => (
  <div>
    <Divider hidden />
    <Breadcrumb>
      <Link to="/">
        <Breadcrumb.Section link>Hoofdpagina</Breadcrumb.Section>{" "}
      </Link>
      <Breadcrumb.Divider icon="right angle" />
      <Breadcrumb.Section active>
        Winkelwagentje
            </Breadcrumb.Section>
    </Breadcrumb>
  </div>
);

// TODO
// Move this to a seperate file, as it is duplicate from HomePage.js
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

// TODO
// Move this to a seperate file, as it is duplicate from HomePage.js
const ProductsGroupPlaceholder = props => (
  <CardGroup itemsPerRow={4}>
    {props.number.map(number => (
      <ProductCardPlaceholder key={number}
      />
    ))}
  </CardGroup>
);

const headerStyling = { fontFamily: "Raleway", fontSize: 25, color: "#ffa502" };

const CartTop = () => (<div><BreadcrumbTop />
  <Divider />
  <h1>Winkelwagentje</h1>
  <Divider /></div>);

class EmptyShoppingCart extends Component {
  constructor() {
    super()
    this.state = { products: [], loaded: false }
  }

  componentWillMount() {
    fetch("/product/FetchProducts/?id=4").then(results => {
      results.json().then(data => {
        this.setState({ products: data.products, loaded: true });
      });
      // TODO implement catch()
    });
  }

  render() {
    let productGroup;
    if (this.state.loaded) {
      productGroup = <ProductsGroup products={this.state.products} />;
    } else {
      productGroup = <ProductsGroupPlaceholder number={[1, 2, 3, 4]} />;
    }
    return (
      <div>
        <CartTop />
        <p> Je hebt geen producten in je winkelwagentje!</p>
        <Button positive href="/">Verder met winkelen</Button>
        <Divider />

        <Header as="h3" style={headerStyling} textAlign="center">
          Deze biertjes zijn bijvoorbeeld heel lekker!
            <Header.Subheader>Erg lekker, lekker, lekker...</Header.Subheader>
        </Header>
        {productGroup}

      </div>)
  }

}

class ShoppingCart extends Component {
  constructor() {
    super();
    this.state = {
      totalPrice: 0,
      productsInCart: false
    };
  }

  componentWillMount() {
    this.setTitle();
    this.checkEmpty();
  }

  checkEmpty() {
    if (this.props.shoppingcart.products.length != 0) {
      this.setState({ ...this.state, productsInCart: true })
    } else this.setState({ ...this.state, productsInCart: false });
  }

  setTitle() {
    document.title = "Beer Buddy: Winkelwagentje";
  }

  render() {
    if (this.state.productsInCart == true) {
      return (<Container>
        <CartTop />
        <Grid divided="vertically" columns="equal">
          {this.props.shoppingcart.products.map(product => (
            <Grid.Row>
              <Grid.Column width={2}>
                <Image src={product.url} size="mini" />
              </Grid.Column>
              <Grid.Column width={4}>{product.name}</Grid.Column>
              <Grid.Column width={2}>Prijs: €{product.price}</Grid.Column>
              <Grid.Column width={3}>

                <div className="ui right labeled input small">
                  <input type="text" id="txtNum" value={product.count} />
                  <div className="ui mini vertical buttons">
                    <button
                      className="ui icon button"
                      command="Up"
                      onClick={() => {
                        this.props.addCartItem(
                          product.id,
                          product.name,
                          product.price,
                          product.url
                        );
                      }}>
                      <i className="up chevron icon" />
                    </button>
                    <button
                      className="ui icon button"
                      command="Down"
                      onClick={() => {
                        this.props.decrementCartItem(product.id, product.price);
                        this.checkEmpty();
                      }}
                    >
                      <i class="down chevron icon" />
                    </button>
                  </div>
                </div>
              </Grid.Column>
              <Grid.Column width={2}>
                <Button
                  negative
                  onClick={() => {
                    this.props.deleteCartItem(product.id, product.count, product.price);
                    this.checkEmpty();
                  }}
                >

                  Verwijder
                </Button>
              </Grid.Column>
              <Grid.Column width={2}>
                Totaal: €
                  {Math.round(product.count * product.price * 100) / 100}
              </Grid.Column>
            </Grid.Row>
          ))}
        </Grid>
        )

      <Divider />
        <Container textAlign="left">
          <h4>
            Kortingscode:<Input placeholder="Vul je kortingscode in..." />
            <Button>Check</Button>
          </h4>
        </Container>
        <Container textAlign="right">
          <h3>Totaal: € {Math.round(this.props.shoppingcart.totalPrice * 100) / 100}</h3>

          <Button floated='right' animated href="/checkout" positive>
            <Button.Content visible>Verder met bestellen</Button.Content>
            <Button.Content hidden>
              <Icon name='arrow right' />
            </Button.Content>
          </Button>
        </Container>
      </Container>);
    }
    else { return (<EmptyShoppingCart />) }
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      addCartItem,
      deleteCartItem,
      decrementCartItem
    },
    dispatch
  );
};

const mapStateToProps = state => {
  return {
    shoppingcart: state.shoppingcart
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShoppingCart);
