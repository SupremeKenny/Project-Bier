import {Component} from 'react';
import {Container, Header, Divider} from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import React from 'react';

export class GenericNotFound extends Component {
  render() {
    return (
        <Container>
          <Divider/>
          <Header as='h1'> Oeps de pagina die u zoekt is niet gevonden. Klik <Link to='/'>hier</Link> om weer terug te
            gaan naar de hoofdpagina.</Header>
        </Container>
    );

  }
}