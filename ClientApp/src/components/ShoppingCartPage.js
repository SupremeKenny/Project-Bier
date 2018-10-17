import React, { Component } from "react";
//import { getOptions } from "../common"  -----> for options dropdown lists

import { connect } from "react-redux";
import {
  addCartItem,
  deleteCartItem,
  decrementCartItem
} from "../actions/actionCreator";
import { bindActionCreators } from "redux";

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
      <a href="/cart">Mijn Winkelwagen</a>
    </Breadcrumb.Section>
  </Breadcrumb>
);

//export default Breadcrumb1

const ButtonCoC = () => (
  <Button.Group>
    <Button>Annuleren</Button>
    <Button.Or text="of" />
    <Button positive>Doorgaan</Button>
  </Button.Group>
);

const Space = () => " ";

const ButtonCheck = () => <Button>Check</Button>;

const Input1 = () => <Input placeholder="Vul je kortingscode in..." />;

class ShoppingCart extends Component {
  constructor() {
    super();
    this.state = {
      totalPrice: 0,
    };
  }
  totalPrice = 0;
  render() {
    return (
      <Container>
        <Divider hidden />
        <Breadcrumb1 />
        <Divider />
        <h1>Mijn Winkelwagen</h1>
        <Divider hidden />
        <Divider />

        <div>
          {this.props.shoppingcart.products.length != 0 ? (
            
            <Grid divided="vertically" columns="equal">
              {this.props.shoppingcart.products.map(product => (
                <Grid.Row>
                  <Grid.Column width={2}>
                    <Image src={product.url} size="mini" />
                  </Grid.Column>
                  <Grid.Column width={4}>{product.name}</Grid.Column>
                  <Grid.Column width={2}>Prijs: €{product.price}</Grid.Column>
                  <Grid.Column width={3}>
                    <Space />
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
                          }}
                        >
                          {" "}
                          <i class="up chevron icon" />
                        </button>
                        <button
                          className="ui icon button"
                          command="Down"
                          onClick={() => {
                            this.props.decrementCartItem(product.id);
                          }}
                        >
                          {" "}
                          <i class="down chevron icon" />
                        </button>
                      </div>
                    </div>
                  </Grid.Column>
                  <Grid.Column width={2}>
                    <Button
                      negative
                      onClick={() => {
                        this.props.deleteCartItem(product.id, product.count);
                      }}
                    >
                      {" "}
                      Verwijder{" "}
                    </Button>
                  </Grid.Column>
                  <Grid.Column width={2}>
                    Totaal: €
                    {Math.round(product.count * product.price * 100) / 100}
                  </Grid.Column>
                </Grid.Row>
              ))}
            </Grid>
          ) : (
            <div>Je winkelwagen is leeg</div>
          )}{" "}
        </div>
        <Divider />
        <Container textAlign="left">
          <h4>
            Kortingscode: <Input1 />
            <ButtonCheck />
          </h4>
        </Container>
        <Container textAlign="right">
          <h3>Totaal: {this.state.totalPrice}</h3>
          <ButtonCoC />
        </Container>
      </Container>
    );
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
