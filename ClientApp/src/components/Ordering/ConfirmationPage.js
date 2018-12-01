import React, { Component } from "react";
import { StepOrder } from "./StepOrder.js";
import {
    Container,
    Icon,
    Divider,
    Step
  } from "semantic-ui-react";

const Space = () => " ";

export default class Confirmation extends Component {
    render() {
        return(
            <Container>
                <Divider hidden/>
                <StepOrder active={[false,false,true]}/>
                <Divider/>
                <h2>Bedankt voor uw bestelling! Uw order is geregistreerd.</h2>
            </Container>
        );
    }
}
