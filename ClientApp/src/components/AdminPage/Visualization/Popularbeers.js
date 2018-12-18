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


        if (!this.state.loaded) {
            return (
              <Dimmer active inverted>
                <Loader size="large">Loading</Loader>
              </Dimmer>
            );
        } else
        return (
            <Container>
                <Header as='h1'>Best verkochte biertjes</Header>
                <Segment>
                    
                    {
                        Object.keys(this.state.popularbeers).map((key, index) => ( 
                            <p key={index}> {key} is {this.state.popularbeers[key]} keer gebruikt.</p> 
                            ))
                    }
                   
                </Segment>

                

            </Container>
        );
    }

}

