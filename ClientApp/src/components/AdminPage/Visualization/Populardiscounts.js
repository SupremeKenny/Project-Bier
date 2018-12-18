import React from "react";
import {
    Header,
    Segment,
    Container,
    Dimmer,
    Loader
} from 'semantic-ui-react';

export class Populardiscounts extends React.Component {
    state = {
        loaded: false,
    }

    componentWillMount (){
        fetch("/Statitics/FetchPopularDiscounts")
        .then(results => {
            results.json().then(data => {
                console.log(data);
                

            this.setState({
                populardiscounts: data.populardiscounts,
                loaded: true
            })
          });
        });
        
    }


    render() {


        if (!this.state.loaded) {
            return (
              <Dimmer active inverted>
                <Loader size="large">Loading</Loader>
              </Dimmer>
            );
        } else
        return (
            <Container>
                <Header as='h1'>Meest gebruikte kortingscodes</Header>
                <Segment>
                    
                    {
                        Object.keys(this.state.populardiscounts).map((key, index) => ( 
                            <p key={index}> {key} is {this.state.populardiscounts[key]} keer gebruikt.</p> 
                            ))
                    }
                   
                </Segment>

                

            </Container>
        );
    }

}

