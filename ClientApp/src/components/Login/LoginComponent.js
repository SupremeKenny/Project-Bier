import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
    Button,
    Divider,
    Form
} from "semantic-ui-react";

export class LoginComponent extends Component {
    constructor() {
        super();
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
            }
        }
    }

    handleChange = (e, { name, value }) => this.setState({ ...this.state, [name]: value });
    handleBlur = (field) => (e) => {
        this.validateForm();
        this.setState({ userHasFocused: { ...this.state.userHasFocused, [field]: true } });
    }

    validateForm() {
        let emailValid = !this.state.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        let passwordValid = this.state.password.length > 0 || this.state.password.length <= 8;

        this.setState({ validationState: { email: emailValid, password: passwordValid } });
    }

    handleSubmit() {

    }

    // TODO:
    // Make this function less verbose
    shouldMarkError(field) {
        switch (field) {
            case "email":
                if (this.state.userHasFocused.email === true) {
                    return (this.state.validationState.email) ? "error" : "";
                } else return "";
            case "password":
                if (this.state.userHasFocused.password === true) {
                    return (this.state.validationState.password) ? "error" : "";
                } else return "";
            default:
                return "";
        }
    }

    render() {
        const { email, password } = this.state;

        return (
            <Form onSubmit={this.handleSubmit} >

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
                    placeholder='Wachtwoord'
                    name="password"
                    width={12}
                    value={password}
                    onChange={this.handleChange}
                    onBlur={this.handleBlur("password")}
                />
                <Divider hidden />

                <Button positive>Inloggen</Button>

                <Link to="/">
                    Wachtwoord vergeten?
                </Link>

            </Form>);
    }
}