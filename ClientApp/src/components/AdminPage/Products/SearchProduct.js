import React from 'react';
import { Button, Divider, Grid, Header, Icon, Search, Segment } from 'semantic-ui-react';

export const SearchProduct = () => {
    return(
        <Segment placeholder>
          <Grid columns={2} stackable textAlign='center'>
            <Divider vertical>Of</Divider>
      
            <Grid.Row verticalAlign='middle'>
              <Grid.Column>
                <Header icon>
                  <Icon name='search' />
                  Zoeken naar een biertje
                </Header>
      
                <Search placeholder='Zoek biertje...' />
              </Grid.Column>
      
              <Grid.Column>
                <Header icon>
                  <Icon name='beer' />
                  Nieuw Biertje toevoegen
                </Header>
                <p>
                <Button primary>Toevoegen</Button>
                </p>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      )
}
