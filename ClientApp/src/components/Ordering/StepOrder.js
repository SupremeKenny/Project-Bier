import React from "react";
import {
    Icon,
    Step,
} from "semantic-ui-react";

// TODO MAke use of props to mark the steps before the current active green
export const StepOrder = props => (
    <Step.Group>
        <Step active={props.active[0]}>
            <Icon name='truck' />
            <Step.Content>
                <Step.Title>Bestellen</Step.Title>
                <Step.Description>Vul uw gegevens in</Step.Description>
            </Step.Content>
        </Step>
        <Step active={props.active[1]}>
            <Icon name='beer' />
            <Step.Content>
                <Step.Title>Overzicht</Step.Title>
                <Step.Description>Overzicht van bestelling</Step.Description>
            </Step.Content>
        </Step>
        <Step active={props.active[2]}>
            <Icon name='credit card' />
            <Step.Content>
                <Step.Title>Betalen</Step.Title>
                <Step.Description>Kies uw betalingswijze</Step.Description>
            </Step.Content>
        </Step>
        <Step active={props.active[3]}>
            <Icon name='info' />
            <Step.Content>
                <Step.Title>Bevestiging</Step.Title>
            </Step.Content>
        </Step>
    </Step.Group>
)