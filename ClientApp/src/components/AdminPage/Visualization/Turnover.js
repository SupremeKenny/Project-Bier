import React from "react";
import {
    Header,
    Segment,
    Container,
    Dimmer,
    Loader
} from 'semantic-ui-react';

export class Turnover extends React.Component {
    state = {
        omzethuidigeweek: '',
        turnover1weekago: '',
        turnover2weekago: '',
        turnover3weekago: '',
        loaded: false,
    }

    componentWillMount (){
        fetch("/Statitics/FetchTurnover")
        .then(results => {
            results.json().then(data => {
                console.log(data);
            this.setState({
                omzethuidigeweek: data.turnoverlastweek,
                turnover1weekago: data.turnover1weekago,
                turnover2weekago: data.turnover2weekago,
                turnover3weekago: data.turnover3weekago,
                loaded: true 
            })
          });
        });
        
    }


    render() {
        // Todo: Can delete const states if I dont display the <pre> anymore in de return Render()
        const {
            omzethuidigeweek,
            turnover1weekago,
            turnover2weekago,
            turnover3weekago,
        } = this.state;


        if (!this.state.loaded) {
            return (
              <Dimmer active inverted>
                <Loader size="large">Loading</Loader>
              </Dimmer>
            );
        } else
        return (
            <Container>
                <Header as='h1'>Omzet afgelopen maand per week</Header>
                <Segment>
                    <p>Afgelopen week: {this.state.omzethuidigeweek}</p>
                    <p>Week daarvoor: {this.state.turnover1weekago}</p>
                    <p>Week daarvoor: {this.state.turnover2weekago}</p>
                    <p>Week daarvoor: {this.state.turnover3weekago}</p>
                </Segment>

                

            </Container>
        );
    }

}