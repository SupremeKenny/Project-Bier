import React, { Component } from "react";
import "./Login.css";
import { Form, Icon, Input, Button, Row, Col } from "antd";

const FormItem = Form.Item;

class NormalLoginForm extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <FormItem>
          {getFieldDecorator("userName", {
            rules: [{ required: true, message: "Vul je gebruikersnaam in!" }]
          })(
            <Input
              prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="Gebruikersnaam"
            />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator("password", {
            rules: [{ required: true, message: "Vul je wachtwoord in!" }]
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
              type="password"
              placeholder="Wachtwoord"
            />
          )}
        </FormItem>
        <FormItem>
          <a className="login-form-forgot" href="">
            Wachtwoord vergeten?
          </a>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Inloggen
          </Button>
        </FormItem>
      </Form>
    );
  }
}

class NormalRegisterForm extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <FormItem>
          {getFieldDecorator("userName", {
            rules: [{ required: true, message: "Vul een email adres in!" }]
          })(
            <Input
              prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="E-mailadres"
            />
          )}
        </FormItem>

        <FormItem>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Maak een account aan
          </Button>
        </FormItem>
      </Form>
    );
  }
}

const LoginForm = Form.create()(NormalLoginForm);
const RegisterForm = Form.create()(NormalRegisterForm);

export class LoginPage extends React.Component {
  render() {
    return (
    
      
      <Row gutter={60} type='flex' justify='center' className="pad">
        
        <Col span={10} className="left center">
          <LoginForm />
        </Col>
        <Col span={10} className="center"><RegisterForm /></Col>
      </Row>
    );
  }
}
