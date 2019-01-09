import React, { Component } from 'react';
import {
	validateEmail,
	validateZipCode,
	validateName,
	validatePhoneNumber,
	validateNum,
} from '../../fieldValidators.js';
import { fetchPostcodeApi } from '../../postcodeapi.js';
import { Container, Button, Divider, Form, Message, Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { changeName } from '../../actions/actionCreator';
import { bindActionCreators } from 'redux';

class PersonalInfoOverview extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: props.data.name,
			surname: props.data.lastName,
			street: props.data.address.streetName,
			houseNumber: props.data.address.streetNumber,
			zip: props.data.address.postalCode,
			city: props.data.address.cityName,
			phone: props.data.phone,
			email: props.data.email,
			province: props.data.address.province,

			focused: {
				name: false,
				surname: false,
				street: false,
				houseNumber: true,
				zip: true,
				city: false,
				phone: false,
			},

			validationState: {},
			displayErrorForm: false,
			displayAdditional: true,
			addressFetched: false,
			addressCorrect: true,

			formCompleted: false,

			error: 'Vul gelieve alle velden correct in als uw de gegevens wil aanpassen.',
		};
	}

	componentWillMount() {
		let validationState = {};
		for (var focused in this.state.focused) {
			validationState[focused] = true;
		}
		this.setState({
			...this.state,
			validationState: validationState,
		});
	}

	submitChange = () => {
		fetch('account/UpdateAccountInformation', {
			method: 'PUT',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + this.props.token,
			},
			body: JSON.stringify({
				PostalCode: this.state.zip,
				StreetNumber: this.state.houseNumber,
				StreetName: this.state.street,
				CityName: this.state.city,
				Country: 'Nederland',
				FirstName: this.state.name,
				LastName: this.state.surname,
				Province: this.state.province,
				PhoneNumber: this.state.phone,
			}),
		})
			.then(results => {
				if (results.ok) {
					this.setState({ ...this.state, formCompleted: true });
					this.props.changeName(this.state.name);
					setTimeout(() => {
						window.location.reload();
					}, 1500);
				} else {
					this.setState({
						...this.state,
						displayErrorForm: true,
						error:
							'Er is iets misgegaan tijdens het aanpassen van uw gegevens. Gelieve contact op te nemen met de klantenservice of probeer het later opnieuw.',
					});
				}
			})
			.catch(error => {
				console.log(error);
				this.setState({
					...this.state,
					displayErrorForm: true,
					error:
						'Er is iets misgegaan tijdens het aanpassen van uw gegevens. Gelieve contact op te nemen met de klantenservice of probeer het later opnieuw.',
				});
			});
	};

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
	handleBlur = field => e => {
		this.validateForm();
		this.setState({ focused: { ...this.state.focused, [field]: true } }, () => {
			if (field === 'zip' || field === 'houseNumber') {
				this.autocompleteAddress();
			}
		});
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
		for (var validationState in this.state.validationState) {
			validated = validated && this.state.validationState[validationState];
		}

		validated = validated && this.state.addressCorrect;

		if (validated) {
			this.submitChange();
		} else {
			let focusedNew = {};

			for (var focused in this.state.focused) {
				focusedNew[focused] = true;
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
	autocompleteAddress(callback) {
		// Both fields should have been focused
		if (this.state.focused['zip'] && this.state.focused['houseNumber']) {
			// Both fields should be correct
			if (this.state.validationState['zip'] && this.state.validationState['houseNumber']) {
				// The address must not have changed and not be correct and fetched already
				if (this.state.addressCorrect === false && this.state.addressFetched === false) {
					this.setState({ ...this.state, addressFetched: true }, () => {
						this.postcodeCall(callback);
					});
				}
			}
		}
	}

	shouldMarkError(fieldName) {
		if (this.state.focused[fieldName]) {
			return this.state.validationState[fieldName] ? '' : 'error';
		} else return '';
	}

	validateForm(callback) {
		let fields = {
			name: this.state.name.length > 0 && validateName(this.state.name),
			surname: this.state.surname.length > 0 && validateName(this.state.surname),
			houseNumber: this.state.houseNumber.length > 0 && validateNum(this.state.houseNumber),
			zip: validateZipCode(this.state.zip),
			phone: this.state.phone.length > 0 && validatePhoneNumber(this.state.phone),
			email: validateEmail(this.state.email),
		};
		this.setState({ ...this.state, validationState: fields }, callback);
	}

	postcodeCall = callback => {
		fetchPostcodeApi(this.state.zip, this.state.houseNumber).then(data => {
			if (typeof data !== 'undefined') {
				this.setState(
					{
						...this.state,
						street: data.response.street,
						city: data.response.city,
						province: data.response.province,
						displayAdditional: true,
						addressCorrect: true,
						addressFetched: false,
					},
					callback,
				);
			} else {
				this.setState({
					...this.state,
					displayAdditional: false,
					addressCorrect: false,
					addressFetched: false,
					validationState: {
						...this.state.validationState,
						zip: false,
						houseNumber: false,
					},
				});
			}
		});
	};

	render() {
		const { name, surname, street, houseNumber, zip, city, phone, province, error } = this.state;

		let errorForm;
		if (this.state.displayErrorForm) {
			errorForm = (
				<Message error style={{ marginTop: '1em' }} header="Wij wijzen u op het volgende:" content={error} />
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

		if (!this.state.formCompleted) {
			return (
				<div>
					<Container>
						{errorForm}
						<Divider />

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
									onBlur={this.handleBlur('name')}
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
									onBlur={this.handleBlur('surname')}
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
									onBlur={this.handleBlur('zip')}
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
									onBlur={this.handleBlur('houseNumber')}
									maxLength={5}
								/>

								<Form.Input label="Toevoeging" placeholder="A" maxLength={3} width={2} />
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
									onBlur={this.handleBlur('phone')}
								/>
							</Form.Group>

							<Divider />
						</Form>
					</Container>

					<Button floated="right" animated positive onClick={this.onSubmit}>
						<Button.Content visible>Gegevens aanpassen</Button.Content>
						<Button.Content hidden>
							<Icon name="check" />
						</Button.Content>
					</Button>
				</div>
			);
		} else {
			return (
				<Message
					positive
					style={{ marginTop: '1em' }}
					header="Uw gegevens zijn aangepast"
					content="Dankuwel voor het gebruiken van BeerBuddy. Uw aanpassing is verwerkt."
				/>
			);
		}
	}
}

const mapDispatchToProps = dispatch => {
	return bindActionCreators(
		{
			changeName,
		},
		dispatch,
	);
};

export default connect(
	null,
	mapDispatchToProps,
)(PersonalInfoOverview);
