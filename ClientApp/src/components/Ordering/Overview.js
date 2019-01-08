import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StepOrder } from './StepOrder.js';
import { Link } from 'react-router-dom';
import { Container, Divider, Grid, Header, Card, Button, Icon, Segment, Image } from 'semantic-ui-react';

class Overview extends Component {
  constructor(props) {
    super(props);
    this.generateGuestOrder = this.generateGuestOrder.bind(this);
    this.generateOrder = this.generateOrder.bind(this);
    this.fetchAddressFromServer = this.fetchAddressFromServer.bind(this);

    this.state = {
      userInfo: {
        city: '',
        province: '',
        houseNumber: '',
        street: '',
        name: '',
        email: '',
        zip: ''
      },
      products: {},
      loading: true,
      redirectToLogin: false,
      userLoggedIn: false
    };
  }
  
  componentDidMount() {
    if (this.props.reduxState.login.loggedIn) {
      this.fetchAddressFromServer(this.props.reduxState.login.email);
    } else {
      var userInfo = {
        city: this.props.reduxState.guest.info.city,
        province: this.props.reduxState.guest.info.province,
        houseNumber: this.props.reduxState.guest.info.houseNumber,
        street: this.props.reduxState.guest.info.street,
        name: this.props.reduxState.guest.info.name + ' ' + this.props.reduxState.guest.info.surname,
        surname: this.props.reduxState.guest.info.surname,
        email: this.props.reduxState.guest.info.email,
        zip: this.props.reduxState.guest.info.zip,
        phone: this.props.reduxState.guest.info.phone
      };
      this.setState({ loading: false, userInfo: userInfo });
    }
  }

  getDiscountCode = () => {
    if (
      this.props.reduxState.shoppingcart.discount !== undefined &&
      this.props.reduxState.shoppingcart.discount.validated
    ) {
      return this.props.reduxState.shoppingcart.discount.code;
    } else return '';
  };

  fetchAddressFromServer = () => {
    fetch('account/getaccountinformation', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.props.reduxState.login.token
      }
    }).then(results => {
      if (results.ok) {
        results.json().then(data => {
          this.setState({
            ...this.state,
            userLoggedIn: true,
            loading: false,
            userInfo: {
              city: data.address.cityName,
              province: data.address.province,
              houseNumber: data.address.streetNumber,
              street: data.address.streetName,
              name: data.name + ' ' + data.lastName,
              email: data.email,
              zip: data.address.postalCode
            }
          });
        });
      }
    });
  };

  onSubmit = e => {
    if (this.state.userLoggedIn) {
      this.generateOrder();
    } else this.generateGuestOrder();
  };

  render() {
    // TODO add loader
    // TODO add product overview
    if (this.state.loading) {
      return <p>Loading...</p>;
    } else
      return (
        <div>
          <Container>
            <Divider hidden />
            <StepOrder active={[false, true, false, false]} />
            <Divider />
            <Grid columns="equal">
              <Grid.Row columns="equal">
                <Grid.Column>
                  <Header as="h2">Bestel gegevens</Header>

                  <OrderView data={this.props.shoppingcart} />
                </Grid.Column>
                <Grid.Column>
                  <Header as="h2">Persoonsgegevens</Header>

                  <Segment>
                    {this.state.userInfo.name}
                    <br />
                    {this.state.userInfo.email}
                  </Segment>

                  <Segment>
                    {this.state.userInfo.street + ' ' + this.state.userInfo.houseNumber}
                    <br />
                    {this.state.userInfo.zip + ', ' + this.state.userInfo.city}
                    <br />
                    {this.state.userInfo.province + ', Nederland'}
                  </Segment>

                  <Divider hidden />
                 
			           
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Container>
          <Button floated="right" animated positive onClick={this.onSubmit}>
            <Button.Content visible>Verder naar betalen</Button.Content>
            <Button.Content hidden>
              <Icon name="arrow right" />
            </Button.Content>
          </Button>
        </div>
      );
  }

  

  // TODO: Add Coupon
  // TODO: Add Phone Number
  // FIXME: last name is undefined
  generateGuestOrder() {
    fetch('order/addorderguest/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        Coupon: this.getDiscountCode(),
        PostalCode: this.state.userInfo.zip,
        StreetNumber: this.state.userInfo.houseNumber,
        StreetName: this.state.userInfo.street,
        CityName: this.state.userInfo.city,
        Country: 'Nederland',
        FirstName: this.state.userInfo.name,
        LastName: this.state.userInfo.surname,
        Email: this.state.userInfo.email,
        Products: this.props.reduxState.shoppingcart.products,
        PhoneNumber: this.state.userInfo.phone
      })
    }).then(results => {
      results.json().then(data => (window.location.href = '/betalen/' + data));
    });
  }

  // TODO Check if result is okay
  // TODO Catch errors
  generateOrder() {
    fetch('order/addorder/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.props.reduxState.login.token
      },
      body: JSON.stringify({
        Products: this.props.reduxState.shoppingcart.products,
        Coupon: this.getDiscountCode()
      })
    }).then(results => {
      if (results.ok) {
        results
          .json()
          .then(data => (window.location.href = '/betalen/' + data))
          .catch(error => {
            // TODO add error handling
          });
      } else {
        // TODO add error handling
      }
    });
  }
}

const MiniProductCard = props => (
	<Card className='product-card'>
		<Link to={'/product/' + props.data.id}>
			<Image src={props.data.url} mini centered={true} style={{ maxHeight: 100, padding: 20 }} />
		</Link>

		<Card.Content fluid='true' style={{ minHeight: 90 }}>
			<Card.Description>
				<Link to={'/product/' + props.data.id}>{props.data.name} </Link>
			</Card.Description>
			<Card.Meta>{props.data.count} X</Card.Meta>
		</Card.Content>
	</Card>
);

const OrderView = props => (
	<Container style={{ marginTop: '2em', marginBottom: 0, paddingBottom: 0 }}>
		<Grid stackable columns={props.data.products.length}>
			<Grid.Row>
				{props.data.products.map(p => (
					<Grid.Column width={5} style={{ paddingBottom: '1em' }}>
						<MiniProductCard data={p} />
					</Grid.Column>
				))}
			</Grid.Row>
		</Grid>
	</Container>
);


const mapStateToProps = state => {
  return {
    reduxState: state,
    shoppingcart: state.shoppingcart,
  };
};

export default connect(
  mapStateToProps,
  null
)(Overview);
