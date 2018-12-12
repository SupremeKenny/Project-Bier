import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button, Divider, Form, Message } from "semantic-ui-react";
import { validateEmail } from "../FieldValidators.js";

export class LoginComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      userHasFocused: {
        email: false,
        password: false
      },
      validationState: {
        email: false,
        password: false
      },
      displayError: false,
      error: ""
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = (e, { name, value }) =>
    this.setState({ ...this.state, [name]: value });

  handleBlur = field => e => {
    this.validateForm();
    this.setState({
      userHasFocused: { ...this.state.userHasFocused, [field]: true }
    });
  };

  validateForm() {
    let emailValid = validateEmail(this.state.email);
    let passwordValid = this.state.password.length >= 8;

    this.setState({
      validationState: { email: emailValid, password: passwordValid }
    });
  }

  handleSubmit() {
    fetch("account/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        Email: this.state.email,
        Password: this.state.password
      })
    }).then(results => {
      if (results.ok) {
        results.json().then(data => {
          if (data.loginResponse.success === true) {
            this.props.submissionMethod(data.loginResponse.token);
          } else {
            this.setState({
              ...this.state,
              displayError: true,
              error: data.loginResponse.error
            });
          }
        });
      }
    });
  }

  // TODO: Make this function less verbose
  // Lookup how to properly give attributes as parameters such as in handleChange
  shouldMarkError(field) {
    switch (field) {
      case "email":
        if (this.state.userHasFocused.email === true) {
          return this.state.validationState.email ? "" : "error";
        } else return "";
      case "password":
        if (this.state.userHasFocused.password === true) {
          return this.state.validationState.password ? "" : "error";
        } else return "";
      default:
        return "";
    }
  }

  // Implement error message
  render() {
    const { email, password } = this.state;
    let errorMessage = <Message />;

    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Input
          className={this.shouldMarkError("email")}
          placeholder="Emailadres"
          name="email"
          width={12}
          value={email}
          onChange={this.handleChange}
          onBlur={this.handleBlur("email")}
        />

        <Form.Input
          className={this.shouldMarkError("password")}
          type="password"
          placeholder="Wachtwoord"
          name="password"
          width={12}
          value={password}
          onChange={this.handleChange}
          onBlur={this.handleBlur("password")}
        />
        <Divider hidden />

        <Button positive>Inloggen</Button>

        <Link to="/">Wachtwoord vergeten?</Link>
      </Form>
    );
  }
}
