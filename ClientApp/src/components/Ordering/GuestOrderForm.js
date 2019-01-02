import React, { Component } from 'react';
import { StepOrder } from './StepOrder.js';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addGuestToStorage } from '../../actions/actionCreator';
import {
	validateEmail,
	validateZipCode,
	validateName,
	validatePhoneNumber,
	validateNum,
} from '../../fieldValidators.js';
import { fetchPostcodeApi } from '../../postcodeapi.js';
import {
	Container,
	Button,
	Divider,
	Form,
	Header,
	Message,
	Icon,
} from 'semantic-ui-react';

class GuestOrder extends Component {
	constructor() {
		super();
		this.state = {
			name: '',
			surname: '',
			street: '',
			houseNumber: '',
			zip: '',
			city: '',
			phone: '',
			email: '',
			province: '',

			focused: {
				name: false,
				surname: false,
				street: false,
				houseNumber: false,
				zip: false,
				city: false,
				phone: false,
				email: false,
			},

			validationState: {},
			displayErrorForm: false,
			displayAdditional: false,
			isFetching: false,
			addressCorrect: false,
		};
	}

	componentWillMount() {
		if (Object.keys(this.props.guest).length !== 0) {
			let info = this.props.guest.info;
			this.setState({
				products: this.props.shoppingCart.products,
				name: info.name,
				surname: info.surname,
				street: info.street,
				houseNumber: info.houseNumber,
				zip: info.zip,
				city: info.city,
				phone: info.phone,
				email: info.email,
				province: info.province,
				addressCorrect: true,
				displayAdditional: true,
			});
		} else {
			this.setState({ products: this.props.shoppingCart.products });
		}
	}

	/**
	 * Change the state if a field changes. Called in OnChange in form
	 */
	handleFieldChange = (e, { name, value }) => {
		// If the zip or housenumber change we can no longer assume the fetched address is correct
		// Therefore we need to fetch it again
		this.setState({ ...this.state, [name]: value });
		if (name === 'zip' || name === 'houseNumber') {
			this.setState(
				{
					...this.state,
					[name]: value,
					isFetching: false,
					addressCorrect: false,
				},
				this.resetAddress,
			);
		} else {
			this.setState({ ...this.state, [name]: value });
		}
	};

	/**
	 * Change focused state if a field is blurred
	 */
	handleFieldBlur = field => e => {
		this.validateForm();
		this.setState({ focused: { ...this.state.focused, [field]: true } }, () => {
			if (field === 'zip' || field === 'houseNumber') {
				this.autocompleteAddress();
			}
		});
	};

	shouldMarkError = name => {
		if (this.state.focused[name]) {
			return this.state.validationState[name] ? '' : 'error';
		} else return '';
	};

	/**
	 * Address should be reset when user changes zip or house number and when a fetch fails
	 */
	resetAddress = () => {
		this.setState({
			...this.state,
			street: '',
			province: '',
			city: '',
			addressCorrect: false,
			displayAdditional: false,
		});
	};

	onSubmit = e => {
		this.validateForm(this.handleSubmit);
	};

	handleSubmit = evt => {
		let validated = true;
		for (var key in this.state.validationState) {
			validated = validated && this.state.validationState[key];
		}

		validated = validated && this.state.addressCorrect;

		if (validated) {
			var guestInfo = {
				name: this.state.name,
				surname: this.state.surname,
				street: this.state.street,
				houseNumber: this.state.houseNumber,
				zip: this.state.zip,
				city: this.state.city,
				phone: this.state.phone,
				email: this.state.email,
				province: this.state.province,
				focused: {
					zip: true,
					city: true,
				},
			};

			// Save the information to the redux state and redirect to overview
			this.props.addGuestToStorage(guestInfo);
			window.location.href = '/overzicht';
		} else {
			// Everything should be set to focused so everything will be validated
			let focusedNew = {};
			for (var key in this.state.focused) {
				focusedNew[key] = true;
			}
			if (!this.state.addressCorrect) {
				this.setState({
					...this.state,
					displayErrorForm: true,
					focused: focusedNew,
					validationState: {
						...this.state.validationState,
						zip: false,
						houseNumber: false,
					},
				});
			} else {
				this.setState({
					...this.state,
					displayErrorForm: true,
					focused: focusedNew,
				});
			}
		}
	};

	/**
	 * Fetches additional fields if certain state is true
	 */
	autocompleteAddress() {
		// Both fields should have been focused
		if (this.state.focused['zip'] && this.state.focused['houseNumber']) {
			// Both fields should be correct
			if (
				this.state.validationState['zip'] &&
				this.state.validationState['houseNumber']
			) {
				// The address must not have changed and not be correct and fetched already
				if (
					this.state.addressCorrect === false &&
					this.state.isFetching === false
				) {
					this.setState({ ...this.state, isFetching: true }, () => {
						this.fetchAddressData();
					});
				}
			}
		}
	}

	validateForm(callback) {
		let fields = {
			name: this.state.name.length > 0 && validateName(this.state.name),
			surname:
				this.state.surname.length > 0 && validateName(this.state.surname),
			houseNumber:
				this.state.houseNumber.length > 0 &&
				validateNum(this.state.houseNumber),
			zip: validateZipCode(this.state.zip),
			phone:
				this.state.phone.length > 0 && validatePhoneNumber(this.state.phone),
			email: validateEmail(this.state.email),
		};
		this.setState({ ...this.state, validationState: fields }, callback);
	}

	fetchAddressData = () => {
		fetchPostcodeApi(this.state.zip, this.state.houseNumber).then(data => {
			if (typeof data !== 'undefined') {
				this.setState({
					...this.state,
					street: data.response.street,
					city: data.response.city,
					province: data.response.province,
					displayAdditional: true,
					addressCorrect: true,
					isFetching: false,
				});
			} else {
				this.setState(
					{
						...this.state,
						displayAdditional: false,
						addressCorrect: false,
						isFetching: false,
						validationState: {
							...this.state.validationState,
							zip: false,
							houseNumber: false,
						},
					},
					this.resetAddress,
				);
			}
		});
	};

	render() {
		const {
			name,
			surname,
			street,
			houseNumber,
			zip,
			city,
			phone,
			email,
			province,
		} = this.state;

		let errorForm;
		if (this.state.displayErrorForm) {
			errorForm = (
				<Message
					error
					style={{ marginTop: '1em' }}
					header="Vul het formulier volledig in,"
					content="Alle gegevens moeten correct worden ingevuld om een account aan te maken."
				/>
			);
		} else errorForm = '';

		let additionalFields;
		if (this.state.displayAdditional) {
			additionalFields = (
				<Form.Group>
					<Form.Input readOnly width={5} label="Straatnaam" value={street} />
					<Form.Input readOnly width={5} label="Stad" value={city} />
					<Form.Input readOnly width={5} label="Provincie" value={province} />
				</Form.Group>
			);
		}

		return (
			<div>
				<Container>
					<Divider hidden />
					<StepOrder active={[true, false, false]} />
					{errorForm}
					<Divider />
					<h2>Vul uw gegevens in</h2>

					<Header as="h4">Persoonlijke gegevens</Header>

					<Form onSubmit={this.handleSubmit}>
						<Form.Group>
							<Form.Input
								required
								fluid
								width={6}
								name="name"
								value={name}
								className={this.shouldMarkError('name')}
								label="Voornaam"
								placeholder="Klaas"
								onChange={this.handleFieldChange}
								onBlur={this.handleFieldBlur('name')}
							/>

							<Form.Input
								required
								fluid
								width={6}
								name="surname"
								value={surname}
								className={this.shouldMarkError('surname')}
								label="Achternaam"
								placeholder="Schouten"
								onChange={this.handleFieldChange}
								onBlur={this.handleFieldBlur('surname')}
							/>
						</Form.Group>

						<Form.Group>
							<Form.Input
								required
								width={4}
								className={this.shouldMarkError('zip')}
								name="zip"
								label="Postcode"
								placeholder="1234AB"
								value={zip}
								onChange={this.handleFieldChange}
								onBlur={this.handleFieldBlur('zip')}
								maxLength={7}
							/>

							<Form.Input
								required
								width={2}
								className={this.shouldMarkError('houseNumber')}
								name="houseNumber"
								label="Huisnummer"
								placeholder="12"
								value={houseNumber}
								onChange={this.handleFieldChange}
								onBlur={this.handleFieldBlur('houseNumber')}
								maxLength={5}
							/>

							<Form.Input
								label="Toevoeging"
								placeholder="a"
								maxLength={3}
								width={2}
							/>
						</Form.Group>

						{additionalFields}

						<Form.Group>
							<Form.Input
								required
								width={6}
								className={this.shouldMarkError('phone')}
								name="phone"
								label="Telefoonnummer"
								placeholder="0612345678"
								value={phone}
								onChange={this.handleFieldChange}
								onBlur={this.handleFieldBlur('phone')}
							/>
						</Form.Group>

						<Form.Group>
							<Form.Input
								required
								width={6}
								className={this.shouldMarkError('email')}
								name="email"
								label="E-mailadres"
								placeholder="123@hotmail.com"
								value={email}
								onChange={this.handleFieldChange}
								onBlur={this.handleFieldBlur('email')}
							/>
						</Form.Group>

						<Divider hidden />
						<Divider />
					</Form>
				</Container>

				<Button floated="right" animated positive onClick={this.onSubmit}>
					<Button.Content visible>Verder </Button.Content>
					<Button.Content hidden>
						<Icon name="arrow right" />
					</Button.Content>
				</Button>

				<Button floated="left" animated href="/checkout">
					<Button.Content visible>Terug</Button.Content>
					<Button.Content hidden>
						<Icon name="arrow left" />
					</Button.Content>
				</Button>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		shoppingCart: state.shoppingcart,
		guest: state.guest,
	};
};

const mapDispatchToProps = dispatch => {
	return bindActionCreators(
		{
			addGuestToStorage,
		},
		dispatch,
	);
};

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(GuestOrder);
