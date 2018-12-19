import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import  ProductCard,{ ProductCardPlaceholder } from "./ProductCards.js";
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
  Header,
  CardGroup,
  Icon
} from "semantic-ui-react";

const headerStyling = { fontFamily: "Raleway", fontSize: 25, color: "#ffa502" };

const BreadcrumbTop = () => (
  <div>
    <Divider hidden />
    <Breadcrumb>
      <Link to="/">
        <Breadcrumb.Section link>Hoofdpagina</Breadcrumb.Section>{" "}
      </Link>
      <Breadcrumb.Divider icon="right angle" />
      <Breadcrumb.Section active>Winkelwagentje</Breadcrumb.Section>
    </Breadcrumb>
  </div>
);

const CartTop = () => (
  <div>
    <BreadcrumbTop />
    <Divider />
    <h1>Winkelwagentje</h1>
    <Divider />
  </div>
);

class ShoppingCart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      discount: { procent: false, amount: 0 }
    };
  }

  handleDiscount = evt => {
    fetch("/order/SearchDiscount?input=" + evt.target.value).then(results => {
      if (!results.ok) {
        this.setState({ discount: { procent: true, amount: 0 } });
        localStorage.setItem("Discount", null);
      } else {
      results.json().then(data => {
        this.setState(
          {
            discount: {
              procent: data.discount.procent,
              amount: data.discount.amount
            }
          },
        );
        localStorage.setItem("Discount", data.discount.code);
      });
    }
    });
  };

  handleTotal = total => {
    if (total > 0) {
      return total;
    } else {
      return 0;
    }
  };

  render() {
    if (this.props.shoppingcart.products.length !== 0) {
      return (
        <Container>
          <Divider hidden />
          <BreadcrumbTop />
          <Divider />
          <h1>Winkelwagentje</h1>
          <Divider hidden />
          <Divider />

          <div>
            {this.props.shoppingcart.products.length !== 0 ? (
              <Grid
                divided="vertically"
                columns="equal"
                padded="vertically"
                verticalAlign="middle"
              >
                {this.props.shoppingcart.products.map(product => (
                  <Grid.Row key={product.id}>
                    <Grid.Column width={2}>
                      <Image src={product.url} size="mini" />
                    </Grid.Column>
                    <Grid.Column width={4}>{product.name}</Grid.Column>
                    <Grid.Column width={2}>Prijs: €{product.price}</Grid.Column>
                    <Grid.Column width={2}>Aantal: {product.count}</Grid.Column>
                    <Grid.Column width={2}>
                      
                        
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
                            }}
                          >
                            <i className="up chevron icon" />
                          </button>
                          <button
                            className="ui icon button"
                            command="Down"
                            onClick={() => {
                              this.props.decrementCartItem(
                                product.id,
                                product.price
                              );
                            }}
                          >
                            <i className="down chevron icon" />
                          </button>
                        </div>
                    </Grid.Column>
                    <Grid.Column width={2}>
                      <Button
                        negative
                        onClick={() => {
                          this.props.deleteCartItem(
                            product.id,
                            product.count,
                            product.price
                          );
                        }}
                      >
                        Verwijder
                      </Button>
                    </Grid.Column>
                    <Grid.Column width={2}>
                      Totaal: €
                      {parseFloat(Math.round(product.count * product.price * 100) / 100).toFixed(2)}
                    </Grid.Column>
                  </Grid.Row>
                ))}
              </Grid>
            ) : (
              <div>Je winkelwagentje is leeg</div>
            )}
          </div>
          <Divider />
          <Container textAlign="left">
            <h4>
              Kortingscode:{" "}
              <Input
                placeholder="Vul je kortingscode in..."
                onChange={this.handleDiscount}
              />
            </h4>
          </Container>
          <Container textAlign="right">
            {this.state.discount.amount !== 0 ? (
              <h3>
                <h3>
                  SubTotaal: €{" "}
                  {parseFloat(Math.round(this.props.shoppingcart.totalPrice * 100) / 100).toFixed(2)}
                </h3>
                {this.state.discount.procent === true ? (
                  <div>
                    <h3>Korting: {this.state.discount.amount} % </h3>
                    <h3>
                      Totaal: €{" "}
                      {parseFloat(Math.round(
                        (this.props.shoppingcart.totalPrice -
                          (this.props.shoppingcart.totalPrice / 100) *
                            this.state.discount.amount) *
                          100
                      ) / 100).toFixed(2)}
                    </h3>
                  </div>
                ) : (
                  <div>
                    <h3>Korting: - € {this.state.discount.amount}</h3>
                    {}

                    <h3>
                      Totaal: €{" "}
                      {parseFloat(this.handleTotal(
                        Math.round(
                          (this.props.shoppingcart.totalPrice -
                            this.state.discount.amount) *
                            100
                        ) / 100
                      )).toFixed(2)}
                    </h3>
                  </div>
                )}
              </h3>
            ) : (
              <h3>
                Totaal: €{" "}
                {parseFloat(Math.round(this.props.shoppingcart.totalPrice * 100) / 100).toFixed(2)}
              </h3>
            )}
          </Container>
          <Divider />
          <Button floated="right" animated href="/checkout" color="green">
            <Button.Content visible>Verder met bestellen</Button.Content>
            <Button.Content hidden>
              <Icon name="arrow right" />
            </Button.Content>
          </Button>
          <Button floated="left" animated href="/">
            <Button.Content visible>Terug naar winkel</Button.Content>
            <Button.Content hidden>
              <Icon name="arrow left" />
            </Button.Content>
          </Button>
        </Container>
      );
    } else {
      return <EmptyShoppingCart />;
    }
  }
}

class EmptyShoppingCart extends Component {
  constructor() {
    super();
    this.state = { products: [], loaded: false };
  }

  componentWillMount() {
    this.getExampleProducts();
  }

  getExampleProducts() {
    fetch("/product/FetchProducts/4")
      .then(results => {
        if (results.ok) {
          results.json().then(data => {
            this.setState({ products: data.products, loaded: true });
          });
        }
      })
      .catch(error => {
        this.setState({ loaded: true });
        console.error(error);
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
        <Button positive href="/">
          Verder met winkelen
        </Button>
        <Divider />

        <Header as="h3" style={headerStyling} textAlign="center">
          Deze biertjes zijn bijvoorbeeld heel lekker!
          <Header.Subheader>Erg lekker, lekker, lekker...</Header.Subheader>
        </Header>
        {productGroup}
      </div>
    );
  }
}

// TODO Move this to a seperate file, as it is duplicate from HomePage.js
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

// TODO Move this to a seperate file, as it is duplicate from HomePage.js
const ProductsGroupPlaceholder = props => (
  <CardGroup itemsPerRow={4}>
    {props.number.map(number => (
      <ProductCardPlaceholder key={number} />
    ))}
  </CardGroup>
);

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
