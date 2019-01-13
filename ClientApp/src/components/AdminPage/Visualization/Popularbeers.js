import React from 'react';
import {Link} from 'react-router-dom';
import {Header, Segment, Container, Dimmer, Loader, Grid, List} from 'semantic-ui-react';

export class Popularbeers extends React.Component {
  state = {
    loaded: false
  };

  componentWillMount() {
    fetch('/Statitics/FetchPopularBeers').then(results => {
      results.json().then(data => {
        console.log(data);

        this.setState({
          popularbeers: data.popularbeers,
          loaded: true
        });
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
            <Header as="h1">Best verkochte biertjes</Header>
            <Segment>
              <Grid columns={1}>
                <Grid.Column>
                  <List divided verticalAlign="bottom" size={'medium'}>
                    {Object.keys(this.state.popularbeers).map((key, index) => (
                        <List.Item key={index}>
                          <List.Content floated="right">


                          </List.Content>

                          <List.Content verticalAlign="bottom">
                            <Header as="h4">
                              <Link to={'/product/' + key}>
                                {key}
                              </Link>
                            </Header>
                            {this.state.popularbeers[key]} keer verkocht
                          </List.Content>
                        </List.Item>
                    ))}
                  </List>
                </Grid.Column>
              </Grid>
            </Segment>
          </Container>
      );
  }
}
