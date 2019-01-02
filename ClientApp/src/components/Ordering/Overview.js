import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StepOrder } from './StepOrder.js';
import { Redirect } from 'react-router-dom';
import {
	Container,
	Divider,
	Grid,
	Header,
	Button,
	Icon,
	Segment,
	Loader,
} from 'semantic-ui-react';

class Overview extends Component {
	constructor(props) {
		super(props);

		this.state = {
			userInfo: {
				city: '',
				province: '',
				houseNumber: '',
				street: '',
				name: '',
				email: '',
				zip: '',
			},
			loading: true,
			guestInfoAvailable: false,
		};
	}

	componentWillMount() {
		if (this.props.reduxState.login.loggedIn) {
			this.fetchAddressFromServer(this.props.reduxState.login.email);
		} else {
			if (Object.keys(this.props.reduxState.guest).length !== 0) {
				let guestInfo = this.props.reduxState.guest.info;
				let userInfo = {
					city: guestInfo.city,
					province: guestInfo.province,
					houseNumber: guestInfo.houseNumber,
					street: guestInfo.street,
					name: guestInfo.name + ' ' + guestInfo.surname,
					surname: guestInfo.surname,
					email: guestInfo.email,
					zip: guestInfo.zip,
					phone: guestInfo.phone,
					guestInfoAvailable: true,
				};
				this.setState({ loading: false, userInfo: userInfo });
			} else {
				this.setState({
					guestInfoAvailable: false,
				});
			}
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

	// TODO Error handling
	generateGuestOrder = () => {
		fetch('order/addorderguest/', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
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
				PhoneNumber: this.state.userInfo.phone,
			}),
		}).then(results => {
			results.json().then(data => (window.location.href = '/betalen/' + data));
		});
	};

	// TODO Error handling
	generateOrder = () => {
		fetch('order/addorder/', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + this.props.reduxState.login.token,
			},
			body: JSON.stringify({
				Products: this.props.reduxState.shoppingcart.products,
				Coupon: this.getDiscountCode(),
			}),
		}).then(results => {
			if (results.ok) {
				results
					.json()
					.then(data => (window.location.href = '/betalen/' + data))
					.catch(error => {});
			} else {
			}
		});
	};

	// TODO Error handling
	fetchAddressFromServer = () => {
		fetch('account/getaccountinformation', {
			method: 'GET',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + this.props.reduxState.login.token,
			},
		}).then(results => {
			if (results.ok) {
				results.json().then(data => {
					this.setState({
						...this.state,
						loading: false,
						userInfo: {
							city: data.address.cityName,
							province: data.address.province,
							houseNumber: data.address.streetNumber,
							street: data.address.streetName,
							name: data.name + ' ' + data.lastName,
							email: data.email,
							zip: data.address.postalCode,
						},
					});
				});
			}
		});
	};

	onSubmit = () => {
		if (this.props.reduxState.login.loggedIn) {
			this.generateOrder();
		} else this.generateGuestOrder();
	};

	render() {
		if (!this.props.reduxState.login.loggedIn && !this.state.asGuest) {
			return <Redirect push to="/checkout" />;
		}

		let backButton;
		if (!this.props.reduxState.login.loggedIn) {
			backButton = (
				<Button floated="left" animated href="/bestellengast">
					<Button.Content visible>Informatie aanpassen</Button.Content>
					<Button.Content hidden>
						<Icon name="arrow left" />
					</Button.Content>
				</Button>
			);
		}

		// TODO add product overview
		if (this.state.loading) {
			return <Loader active inline="centered" style={{ marginTop: '10em' }} />;
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
									<p>Hier komt een mooie kaart</p>
								</Grid.Column>
								<Grid.Column>
									<Header as="h2">Persoonsgegevens</Header>

									<Segment>
										{this.state.userInfo.name}
										<br />
										{this.state.userInfo.email}
									</Segment>

									<Segment>
										{this.state.userInfo.street +
											' ' +
											this.state.userInfo.houseNumber}
										<br />
										{this.state.userInfo.zip + ', ' + this.state.userInfo.city}
										<br />
										{this.state.userInfo.province + ', Nederland'}
									</Segment>

									<Divider hidden />
									<Header as="h2">Bestel gegevens</Header>
									<p> Hier komt een lijstje met je producten</p>
									{/* TODO @Wesley product list toevoegen*/}
								</Grid.Column>
							</Grid.Row>
						</Grid>
					</Container>
					{backButton}
					<Button floated="right" animated positive onClick={this.onSubmit}>
						<Button.Content visible>Verder naar betalen</Button.Content>
						<Button.Content hidden>
							<Icon name="arrow right" />
						</Button.Content>
					</Button>
				</div>
			);
	}
}

const mapStateToProps = state => {
	return {
		reduxState: state,
	};
};

export default connect(
	mapStateToProps,
	null,
)(Overview);
