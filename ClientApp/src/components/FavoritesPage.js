import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  deleteFavoritesItem,
  addCartItem
} from '../actions/actionCreator';
import {bindActionCreators} from 'redux';
import {Link} from 'react-router-dom';

import {
  Container,
  Breadcrumb,
  Grid,
  Image,
  Button,
  Popup,
  Divider
} from 'semantic-ui-react';

const BreadcrumbTop = () => (
    <Breadcrumb size="large">
      <Breadcrumb.Section active>
        <a href="/">Home</a>
      </Breadcrumb.Section>
      <Breadcrumb.Divider icon="right chevron"/>
      <Breadcrumb.Section active>
        <a href="/favorieten">Mijn Favorietenlijst</a>
      </Breadcrumb.Section>
    </Breadcrumb>
);

class Favorites extends Component {
  render() {
    return (
        <Container>
          <Divider hidden/>
          <BreadcrumbTop/>
          <Divider/>
          <h1>Mijn Favorietenlijst</h1>
          <Divider hidden/>
          <Divider/>

          <div>
            {this.props.favorites.products.length !== 0 ? (

                <Grid divided='vertically' columns="equal" padded='vertically' verticalAlign='middle'>
                  {this.props.favorites.products.map(product => (
                      <Grid.Row>
                        <Grid.Column width={2}>
                          <Image src={product.url} size='mini'/>
                        </Grid.Column>
                        <Grid.Column width={4}> <Link to={'/product/' + product.id}>{product.name}</Link></Grid.Column>
                        <Grid.Column width={2}>Prijs: €{product.price}</Grid.Column>
                        <Grid.Column textAlign='right'>

                          <Popup
                              trigger={<Button content="Toevoegen" icon="cart" color="green"
                                               onClick={() => {
                                                 this.props.addCartItem(product.id, product.name, product.price, product.url);
                                               }}/>}
                              content="Klik om het product toe te voegen aan jouw winkelwagen."
                          />

                          <Button
                              negative
                              onClick={() => {
                                this.props.deleteFavoritesItem(product.id);
                              }}
                          >
                            Verwijder
                          </Button>
                        </Grid.Column>
                      </Grid.Row>
                  ))}
                </Grid>
            ) : (
                <div>Je favorietenlijst is leeg</div>
            )}
          </div>
        </Container>
    );

  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
      {
        addCartItem,
        deleteFavoritesItem,
      },
      dispatch
  )
};

const mapStateToProps = state => {
  return {
    favorites: state.favorites
  };
};


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Favorites);