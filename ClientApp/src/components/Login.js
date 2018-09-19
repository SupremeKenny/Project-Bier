import React, { Component } from 'react';
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import './Login.css';



export class Login extends Component {


  render() {
    return (
    
        <div className="Login">
        <form>
          <FormGroup controlId="email" bsSize="large">
            <ControlLabel>Email</ControlLabel>
            <FormControl
              autoFocus
              type="email"
              
            />
          </FormGroup>
          <FormGroup controlId="password" bsSize="large">
            <ControlLabel>Password</ControlLabel>
            <FormControl
              
              type="password"
            />
          </FormGroup>
          <Button
            block
            bsSize="large"
            
            type="submit"
          >
            Login
          </Button>
        </form>
      </div>
    

    );
  }
}
