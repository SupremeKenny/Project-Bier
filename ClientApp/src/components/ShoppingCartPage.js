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
  Container,
  Breadcrumb,
  Grid,
  Image,
  Button,
  Divider,
  Input,
} from "semantic-ui-react";

const Breadcrumb1 = () => (
  <Breadcrumb size="large">
    <Breadcrumb.Section active>
      <a href="/">Home</a>
    </Breadcrumb.Section>
    <Breadcrumb.Divider icon="right chevron" />
    <Breadcrumb.Section active>
      <a href="/winkelwagen">Mijn Winkelwagen</a>
    </Breadcrumb.Section>
  </Breadcrumb>
);

//export default Breadcrumb1

const ButtonCoC = () => (
  <Button.Group>
    <Button href="/">Annuleren</Button>
    <Button.Or text="of" />
    <Button positive href="/doorgaan">Doorgaan</Button>
  </Button.Group>
);

const Space = () => " ";

const ButtonCheck = () => <Button>Check</Button>;

const Input1 = () => <Input placeholder="Vul je kortingscode in..." />;

class ShoppingCart extends Component {
  constructor() {
    super();
  }
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
                <Grid.Row key={product.id}>
                  <Grid.Column width={2}>
                    <Image src={product.url} size="mini" />
                  </Grid.Column>
                  <Grid.Column width={4}>{product.name}</Grid.Column>
                  <Grid.Column width={2}>Prijs: €{product.price}</Grid.Column>
                  <Grid.Column width={3}>
                    <Space />
                    <div className="ui right labeled input small">
                      <input type="text" id="txtNum" value={product.count} readOnly/>
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
                          <i className="up chevron icon" />
                        </button>
                        <button
                          className="ui icon button"
                          command="Down"
                          onClick={() => {
                            this.props.decrementCartItem(product.id, product.price);
                          }}
                        >
                          {" "}
                          <i className="down chevron icon" />
                        </button>
                      </div>
                    </div>
                  </Grid.Column>
                  <Grid.Column width={2}>
                    <Button
                      negative
                      onClick={() => {
                        this.props.deleteCartItem(product.id, product.count, product.price);
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
          <h3>Totaal: € {Math.round(this.props.shoppingcart.totalPrice*100)/100}</h3>
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
