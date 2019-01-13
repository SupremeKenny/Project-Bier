import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Grid, Image, Container, Card, Divider, Label, Header} from 'semantic-ui-react';

const dateOptions = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};

const status = [
  {
    text: 'Bestelling ontvangen',
    color: 'orange',
  },
  {
    text: 'Bestelling onderweg',
    color: 'blue',
  },
  {
    text: 'Bestelling bezorgd',
    color: 'green',
  },
];

export default class OrdersOverview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: props.data,
    };
  }

  render() {
    return (
        <div>
          <Divider hidden/>
          <Header as='h2' content='Overzicht bestellingen'/>
          <p>{'Aantal bestellingen: ' + this.state.products.length} </p>
          <Divider/>
          {this.state.products.map(p => (
              <OrderView data={p}/>
          ))}
        </div>
    );
  }
}

const MiniProductCard = props => (
    <Card className='product-card'>
      <Link to={'/product/' + props.data.id}>
        <Image src={props.data.url} mini centered={true} style={{maxHeight: 100, padding: 20}}/>
      </Link>

      <Card.Content fluid='true' style={{minHeight: 90}}>
        <Card.Description>
          <Link to={'/product/' + props.data.id}>{props.data.name} </Link>
        </Card.Description>
        <Card.Meta>{props.data.count} X</Card.Meta>
      </Card.Content>
    </Card>
);

const OrderView = props => (
    <Container style={{marginTop: '2em', marginBottom: 0, paddingBottom: 0}}>
      <div style={{fontSize: 18, paddingBottom: '5px'}}>
        {' '}
        <b>{'Bestelling op ' + getDateString(props.data.date)}</b>
      </div>
      <p style={{fontSize: 10, color: '#bdc3c7'}}>{'#' + props.data.orderNumber}</p>
      <p>{'Totale prijs: € ' + String(props.data.finalPrice).replace('.', ',')}</p>

      <Label color={status[props.data.orderStatus].color} size='large'>
        {status[props.data.orderStatus].text}
      </Label>
      <Divider hidden/>
      <Grid stackable columns={props.data.products.length}>
        <Grid.Row>
          {props.data.products.map(p => (
              <Grid.Column width={3} style={{paddingBottom: '1em'}}>
                <MiniProductCard data={p}/>
              </Grid.Column>
          ))}
        </Grid.Row>
      </Grid>
      <Divider/>
    </Container>
);

function getDateString(dateUnparsed) {
  let date = new Date(dateUnparsed);
  return date.toLocaleDateString('nl-Nl', dateOptions);
}
