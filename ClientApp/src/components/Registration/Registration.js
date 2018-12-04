import React, { Component } from "react";
import { validateEmail, validateZipCode } from "../FieldValidators.js";
import {
  Container,
  Button,
  Divider,
  Form,
  Header,
  Message,
  Icon,
  Image,
} from "semantic-ui-react";

// TODO
// Stricter housenumber checking

export default class Registration extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      tussen: "",
      surname: "",
      street: "",
      houseNumber: "",
      zip: "",
      city: "",
      phone: "",
      email: "",
      province: "",
      password: "",

      focused: {
        name: false,
        surname: false,
        street: false,
        houseNumber: false,
        zip: false,
        city: false,
        phone: false,
        email: false,
        password: false
      },

      validationState: {},
      displayErrorForm: false,
      displayAdditional: false,
      addressFetched: false,
      addressCorrect: false,

      formCompleted: false,

      error:
        "Om de bestelling correct te verwerken moet uw alle informatie in het formulier invullen."
    };
  }

  //TODO Read this from store instead of directly from localStorage
  componentWillMount() {
    this.setState({
      products: localStorage.Cart ? JSON.parse(localStorage.Cart) : []
    });
  }

  componentDidUpdate() {
    this.handleFieldComplete();
  }

  /**
   * Change the state if a field changes. Called in OnChange in form
   */
  handleChange = (e, { name, value }) => {
    // If the zip or housenumber change we can no longer assume the fetched address is correct
    // Therefore we need to fetch it again
    if (name === "zip" || name === "houseNumber") {
      this.setState({
        ...this.state,
        [name]: value,
        addressFetched: false,
        addressCorrect: false
      });
    } else {
      this.setState({ ...this.state, [name]: value });
    }
  };

  onSubmit = e => {
    this.validateForm(this.handleSubmit);
  };

  handleSubmit = evt => {
    let validated = true;
    for (var validationState in this.state.validationState) {
      validated = validated && this.state.validationState[validationState];
    }

    if (validated) {
      this.register();
    } else {
      let focusedNew = {};
      for (var focused in this.state.focused) {
        focusedNew[focused] = true;
      }
      this.setState({
        ...this.state,
        displayErrorForm: true,
        focused: focusedNew
      });
    }
  };

  /**
   * Change focused state if a field is blurred
   */
  handleBlur = field => e => {
    this.validateForm();
    this.setState({ focused: { ...this.state.focused, [field]: true } });
  };

  /**
   * Fetches additional fields if certain state is true
   */
  handleFieldComplete() {
    // Both fields should have been focused
    if (this.state.focused["zip"] && this.state.focused["houseNumber"]) {
      // Both fields should be correct
      if (
        this.state.validationState["zip"] &&
        this.state.validationState["houseNumber"]
      ) {
        // The address must not have changed and not be correct and fetched already
        if (
          this.state.addressCorrect === false &&
          this.state.addressFetched === false
        ) {
          this.setState({ ...this.state, addressFetched: true }, () => {
            this.fetchPostcodeApi();
          });
        }
      }
    }
  }

  shouldMarkError(fieldName) {
    if (this.state.focused[fieldName]) {
      return this.state.validationState[fieldName] ? "" : "error";
    } else return "";
  }

  validateForm(callback) {
    let fields = {
      name: this.state.name.length > 0,
      surname: this.state.surname.length > 0,
      houseNumber: this.state.houseNumber.length > 0,
      zip: validateZipCode(this.state.zip),
      phone: this.state.phone.length > 0,
      email: validateEmail(this.state.email),
      password: this.state.password.length >= 8
    };
    this.setState({ ...this.state, validationState: fields }, callback);
  }

  // Catch error
  register() {
    console.log("Trying to register");

    fetch("account/register", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        Email: this.state.email,
        Password: this.state.password,
        PostalCode: this.state.zip,
        StreetNumber: this.state.houseNumber,
        StreetName: this.state.street,
        CityName: this.state.city,
        Country: "Nederland",
        FirstName: this.state.name,
        LastName: this.state.tussen + this.state.achternaam,
        Province: this.state.province
      })
    }).then(results => {
      if (results.ok) {
        results.json().then(data => {
          if (data.registerResponse.success === true) {
            this.setState({ ...this.state, formCompleted: true });
          } else {
            this.setState({
              ...this.state,
              displayErrorForm: true,
              error: data.registerResponse.errors[0]
            });
          }
        });
      } else {
        console.log("Failed ");
      }
    });
  }

  // TODO Catch error
  fetchPostcodeApi() {
    fetch("account/fetchAddress", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        Zip: this.state.zip,
        Number: this.state.houseNumber
      })
    }).then(results => {
      if (results.ok) {
        results.json().then(data =>
          this.setState({
            ...this.state,
            street: data.response.street,
            city: data.response.city,
            province: data.response.province,
            displayAdditional: true,
            addressCorrect: true
          })
        );
      } else {
        this.setState({
          ...this.state,
          displayAdditional: false,
          addressCorrect: false,
          addressFetched: false,
          validationState: {
            ...this.validationState,
            zip: false,
            houseNumber: false
          }
        });
      }
    });
  }

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
      tussen,
      province,
      password
    } = this.state;

    let errorForm;
    if (this.state.displayErrorForm) {
      errorForm = (
        <Message
          error
          style={{ marginTop: "1em" }}
          header="Wij wijzen u op het volgende:"
          content={this.state.error}
        />
      );
    } else errorForm = "";

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
            <Message
              info
              style={{ marginTop: "1em" }}
              header="Vul het formulier volledig in,"
              content="Vul uw gegevens in om te registreren bij BeerBuddy."
            />
            <Divider hidden />
            {errorForm}
            <Divider />
            <h2>Nieuw bij BeerBuddy</h2>

            <Header as="h4">Persoonlijke gegevens</Header>

            <Form onSubmit={this.handleSubmit}>
              <Form.Group>
                <Form.Input
                  required
                  fluid
                  width={6}
                  name="name"
                  value={name}
                  className={this.shouldMarkError("name")}
                  label="Voornaam"
                  placeholder="Klaas"
                  onChange={this.handleChange}
                  onBlur={this.handleBlur("name")}
                />

                <Form.Input
                  fluid
                  width={4}
                  label="Tussenvoegsel"
                  placeholder="van"
                  value={tussen}
                  onChange={this.handleChange}
                />

                <Form.Input
                  required
                  fluid
                  width={6}
                  name="surname"
                  value={surname}
                  className={this.shouldMarkError("surname")}
                  label="Achternaam"
                  placeholder="Schouten"
                  onChange={this.handleChange}
                  onBlur={this.handleBlur("surname")}
                />
              </Form.Group>

              <Form.Group>
                <Form.Input
                  required
                  width={4}
                  className={this.shouldMarkError("zip")}
                  name="zip"
                  label="Postcode"
                  placeholder="1234AB"
                  value={zip}
                  onChange={this.handleChange}
                  onBlur={this.handleBlur("zip")}
                  maxLength={7}
                />

                <Form.Input
                  required
                  width={2}
                  className={this.shouldMarkError("houseNumber")}
                  name="houseNumber"
                  label="Huisnummer"
                  placeholder="12"
                  value={houseNumber}
                  onChange={this.handleChange}
                  onBlur={this.handleBlur("houseNumber")}
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
                  className={this.shouldMarkError("phone")}
                  name="phone"
                  label="Telefoonnummer"
                  placeholder="0612345678"
                  value={phone}
                  onChange={this.handleChange}
                  onBlur={this.handleBlur("phone")}
                />
              </Form.Group>

              <Header as="h4">Inloggegevens</Header>
              <Form.Group>
                <Form.Input
                  iconPosition="left"
                  required
                  width={6}
                  className={this.shouldMarkError("email")}
                  name="email"
                  label="E-mailadres"
                  placeholder="123@hotmail.com"
                  value={email}
                  onChange={this.handleChange}
                  onBlur={this.handleBlur("email")}
                >
                  <Icon name="at" />
                  <input />
                </Form.Input>
              </Form.Group>

              <Form.Group>
                <Form.Input
                  type="password"
                  iconPosition="left"
                  required
                  width={6}
                  className={this.shouldMarkError("password")}
                  name="password"
                  label="Wachtwoord"
                  value={password}
                  onChange={this.handleChange}
                  onBlur={this.handleBlur("password")}
                >
                  <Icon name="key" />
                  <input />
                </Form.Input>
              </Form.Group>

              <Divider hidden />
              <Divider />
            </Form>
          </Container>

          <Button floated="right" animated positive onClick={this.onSubmit}>
            <Button.Content visible>Registreren</Button.Content>
            <Button.Content hidden>
              <Icon name="check" />
            </Button.Content>
          </Button>
        </div>
      );
    } else {
      return (
        <div>
          <Message
            positive
            style={{ marginTop: "1em" }}
            header="U bent succesvol geregistreerd"
            content="U zal zodadelijk een bevestigingsmail ontvangen. Veel plezier met winkelen bij BeerBuddy."
          />

          <Divider />

          <Button floated="right" animated positive href="/account/inloggen">
            <Button.Content visible>Inloggen</Button.Content>
            <Button.Content hidden>
              <Icon name="arrow right" />
            </Button.Content>
          </Button>

          <Button floated="left" animated positive href="/">
            <Button.Content visible>Terug naar winkel</Button.Content>
            <Button.Content hidden>
              <Icon name="arrow left" />
            </Button.Content>
          </Button>
          <Container>
            <Image src="anim.gif" size="large" />
          </Container>
        </div>
      );
    }
  }
}
