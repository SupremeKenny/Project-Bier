import React, { Component } from "react";
import { connect } from "react-redux";
import { StepOrder } from "./StepOrder.js";
import { Container, Divider, Grid, Header, Card, Button, Icon, Segment } from "semantic-ui-react";

class Overview extends Component {
	constructor(props) {
		super(props);
		this.generateGuestOrder = this.generateGuestOrder.bind(this);
		this.generateOrder = this.generateOrder.bind(this);
		this.fetchAddressFromServer = this.fetchAddressFromServer.bind(this);
		//this.onSubmit = this.onSubmit.bind(this);

		this.state = {
			userInfo: {
				city: "",
				province: "",
				houseNumber: "",
				street: "",
				name: "",
				email: "",
				zip: "",
				name: "",
			},
			loading: true,
			redirectToLogin: false,
			userLoggedIn: false,
		};
	}

	componentDidMount() {
		// TODO fix expiry date issue
		// It is not used at the moment
		let currentTime = new Date().getTime() / 1000;
		let loginExpiryDate = new Date(this.props.reduxState.expiry);

		let expired = currentTime > loginExpiryDate;

		if (this.props.reduxState.login.loggedIn) {
			this.fetchAddressFromServer(this.props.reduxState.login.email);
		} else if (expired) {
			this.setState({ ...this.state, loading: false, redirectToLogin: true });
		} else {
			var userInfo = {
				city: this.props.reduxState.guest.info.city,
				province: this.props.reduxState.guest.info.province,
				houseNumber: this.props.reduxState.guest.info.houseNumber,
				street: this.props.reduxState.guest.info.street,
				name: this.props.reduxState.guest.info.name,
				email: this.props.reduxState.guest.info.email,
				zip: this.props.reduxState.guest.info.zip,
			};
			this.setState({ loading: false, userInfo: userInfo });
		}
	}

	fetchAddressFromServer(email) {
		fetch("account/getaccountinformation", {
			method: "GET",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
				Authorization: "Bearer " + this.props.reduxState.login.token,
			},
		}).then(results => {
			if (results.ok) {
				results.json().then(data => {
					console.log(data);
					this.setState({
						...this.state,
						userLoggedIn: true,
						loading: false,
						userInfo: {
							city: data.address.cityName,
							province: data.address.province,
							houseNumber: data.address.streetNumber,
							street: data.address.streetName,
							name: data.name + " " + data.lastName,
							email: data.email,
							zip: data.address.postalCode,
						},
					});
				});
			}
		});
	}

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
											{this.state.userInfo.street + " " + this.state.userInfo.houseNumber}
											<br />
											{this.state.userInfo.zip + ", " + this.state.userInfo.city}
											<br />
											{this.state.userInfo.province + ", Nederland"}
										</Segment>
									
									<Divider hidden />
									<Header as="h2">Bestel gegevens</Header>
									<p> Hier komt een lijstje met je producten</p>
									{/* TODO @Wesley product list toevoegen*/}
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
		fetch("order/addorderguest/", {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				Coupon: "",
				PostalCode: this.state.userInfo.zip,
				StreetNumber: this.state.userInfo.houseNumber,
				StreetName: this.state.userInfo.street,
				CityName: this.state.userInfo.city,
				Country: "Nederland",
				FirstName: this.state.userInfo.name,
				LastName: this.state.userInfo.surname,
				Email: this.state.userInfo.email,
				Products: this.props.reduxState.shoppingcart.products,
			}),
		}).then(results => {
			results.json().then(data => (window.location.href = "/betalen/" + data));
		});
	}

	// TODO Check if result is okay
	// TODO Catch errors
	generateOrder() {
		fetch("order/addorder/", {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				Coupon: "",
				Products: this.props.reduxState.shoppingcart.products,
				Email: this.state.userInfo.email,
			}),
		}).then(results => {
			results.json().then(data => (window.location.href = "/betalen/" + data));
		});
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
