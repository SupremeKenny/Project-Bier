import React from "react";
import {
    Header,
    Segment,
    Container,
    Dimmer,
    Loader
} from 'semantic-ui-react';

export class Popularbeers extends React.Component {
    state = {
        loaded: false,
    }

    componentWillMount (){
        fetch("/Statitics/FetchPopularBeers")
        .then(results => {
            results.json().then(data => {
                console.log(data);
            this.setState({
                popularbeers: data.popularbeers,
                loaded: true 
            })
          });
        });
        
    }


    render() {
        // Todo: Can delete const states if I dont display the <pre> anymore in de return Render()
        const {
            popularbeers
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
                    {/* {for(var key in this.state.popularbeers) {

                    }} */}

                    
                    {console.log(this.state.popularbeers)}
                   
                </Segment>

                

            </Container>
        );
    }

}

