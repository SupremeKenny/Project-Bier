import React from 'react';
import {Link} from 'react-router-dom';
import {Container, Segment, List, Grid, Header} from 'semantic-ui-react';

export const Footer = () => {
  return (
      <div className="footer">
        <Segment style={{padding: '2em 0em'}} vertical/>
        <Segment inverted vertical style={{padding: '5em 0em'}}>
          <Container>
            <Grid divided inverted stackable>
              <Grid.Row>
                <Grid.Column width={3}>
                  <Header inverted as="h4" content="Shortlinks"/>
                  <List link inverted>

                    <List.Item><Link to="/">Hoofdpagina</Link></List.Item>
                    <List.Item><Link to="/account/inloggen">Inloggen</Link></List.Item>
                    <List.Item><Link to="/winkelwagen">Winkelwagen</Link></List.Item>
                  </List>
                </Grid.Column>
                <Grid.Column width={3}>
                  <Header inverted as="h4" content="Contact"/>
                  <List link inverted>
                    <List.Item as="a">Email: <a>vragen@beerbuddy.nl</a></List.Item>

                  </List>
                </Grid.Column>
                <Grid.Column width={7}>
                  <Header as="h4" inverted>
                    BeerBuddy
                  </Header>
                  <p>Bij BeerBuddy verkopen wij de allerlekkerste speciaal en craft biertjes. We hebben een groot
                    assortiment met honderden verschillende biertjes. Proost!</p>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Container>
        </Segment>
      </div>
  );
};
