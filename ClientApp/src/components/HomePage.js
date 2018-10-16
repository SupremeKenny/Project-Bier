import React, { Component } from "react";
import { Link } from "react-router-dom";
import { ProductCard } from "./ProductCard.js";
import {
  Header,
  Container,
  Rating,
  Breadcrumb,
  Segment,
  Grid,
  Image,
  Label,
  Button,
  Icon,
  Popup,
  Divider,
  Table,
  Input,
  Card,
  Menu,
  CardGroup,
  Tab,
  Item,
  Dimmer,
  Loader
} from "semantic-ui-react";

const MainContainer = ({ children }) => {
  const sx = {
    paddingTop: "2em"
  };

  return <Container style={sx}>{children}</Container>;
};

const panes = [
  // {
  //   menuItem: { key: 'Ontdekkingspack', icon: 'users', content: 'Ontdekkingspack' },
  //   render: () => <Content/>,
  // },
  // {
  //   menuItem: { key: 'Celebration Pack', icon: 'users', content: 'Celebration Pack' },
  //   render: () => <Content/>,
  // },
  // {
  //   menuItem: { key: 'Alcoholvrij Pack', icon: 'users', content: 'Alcoholvrij Pack' },
  //   render: () => <Content/>,
  // },
  // {
  //   menuItem: { key: 'Oktoberfest Pack', icon: 'users', content: 'Oktoberfest Pack' },
  //   render: () => <Content/>,
  // },

  {
    menuItem: (
      <Menu.Item
        key="Ontdekkingspack"
        style={{ fontSize: "16px" }}
        content="Ontdekkingspack"
      />
    ),
    render: () => (
      <Content
      // title
      // sub
      // description
      // url
      // price
      // discount
      />
    )
  },
  {
    menuItem: (
      <Menu.Item
        key="Celebration Pack"
        style={{ fontSize: "16px" }}
        content="Celebration Pack"
      />
    ),
    render: () => <Content />
  },
  {
    menuItem: (
      <Menu.Item
        key="Alcoholvrij Pack"
        style={{ fontSize: "16px" }}
        content="Alcoholvrij Pack"
      />
    ),
    render: () => <Content />
  },
  {
    menuItem: (
      <Menu.Item
        key="Oktoberfest Pack"
        style={{ fontSize: "16px" }}
        content="Oktoberfest Pack"
      />
    ),
    render: () => <Content />
  }

  // { menuItem: (
  //   <Menu.Item key='messages' style = {{fontSize: '16px'}}>
  //   <Icon name="beer"></Icon>
  //     Messages
  //   {/* <Label>15</Label> */}
  //   </Menu.Item>),
  //   render: () => <Content/>
  // },
];

const TabVerticalTabularRight = () => (
  <Tab
    menu={{ fluid: true, vertical: true, tabular: "right" }}
    panes={panes}
    grid={{ paneWidth: 13, tabWidth: 3 }}
  />
);

const Content = props => (
  <Tab.Pane>
    <Item.Group>
      <Item>
        <Item.Image
          src="https://www.beerwulf.com/globalassets/catalog/beerwulf/beers/packs/ondekkings_pack_16_web.png?w=547&rev=1132979819"
          size="medium"
        />

        <Item.Content>
          <Item.Header as="a">
            <h1>Ontdekkingspack | 16</h1>
          </Item.Header>
          <Item.Meta>
            <span className="cinema">
              <h3>16 bieren</h3>
            </span>
          </Item.Meta>
          <Item.Description>
            <b>
              Een mooi pack dat verschillende toegankelijke bieren bevat die je
              zullen bevallen. Zoals Ares van Walhalla, een amberkleurig bier
              dat tonen van karamel combineert met een flinke hand hop. Of
              Undercurrent van Siren, een fruitige en droge pale ale. De
              gereedschapskist die je nodig hebt om de craft- en speciaalbier
              wereld te ontdekken! In dit geval bieren van 16 verschillende
              brouwers in 7 verschillende stijlen uit 5 landen.
            </b>
          </Item.Description>
          <Item.Extra>
            <Button
              content="Voeg toe aan winkelmandje"
              icon="cart"
              color="green"
              floated="right"
            />
            <Label
              basic
              color="grey"
              pointing="left"
              style={{ fontSize: "18px" }}
            >
              Prijs $ 25.95
            </Label>
            <Label color="red" style={{ fontSize: "18px" }}>
              -40%
            </Label>
          </Item.Extra>
        </Item.Content>
      </Item>
    </Item.Group>
  </Tab.Pane>
);

const ProductsGroup = props => (
  <CardGroup itemsPerRow={4}>
    {props.products.map(beer => (
              <ProductCard
                id={beer.id}
                title={beer.name}
                url={beer.url}
                price={beer.price}
              />
            ))}


    {/* <ProductCard 
      url={props.products[0].url}
      price={props.products[0].price} 
      title={props.products[0].name} 
      id={props.products[0].id}
    /> */}

    {/* <ProductCard url={props.products[1].url}
    price={props.products[1].price} title={props.products[1].name} id={props.products[1].id}/>

    <ProductCard url={props.products[2].url}
    price={props.products[2].price} title={props.products[2].name} id={props.products[2].id}/>

    <ProductCard url={props.products[3].url}
    price={props.products[3].price} title={props.products[3].name} id={props.products[3].id}/>

    <ProductCard url={props.products[4].url}
    price={props.products[4].price} title={props.products[4].name} id={props.products[4].id}/>

    <ProductCard url={props.products[5].url}
    price={props.products[5].price} title={props.products[5].name} id={props.products[5].id}/>

    <ProductCard url={props.products[6].url}
    price={props.products[6].price} title={props.products[6].name} id={props.products[6].id}/>

    <ProductCard url={props.products[7].url}
    price={props.products[7].price} title={props.products[7].name} id={props.products[7].id}/> */}
  </CardGroup>
);

export class HomePage extends React.Component {
  constructor() {
    super();
    this.state = {
      products: {},
      loaded: false
    }
  }


  componentWillMount() {
    fetch("https://localhost:5001/home/FetchAllProducts")
    .then(results => {
      results.json().then(data => {
        console.log(data.products)
        this.setState({ products: data.products, loaded: true });
      })
    })
  }


  render() {
    //const { activeItem } = this.state

    if (!this.state.loaded) {
      return (<Segment>
        <Dimmer active>
          <Loader />
        </Dimmer>
      </Segment>)
    }
    else

    return (
      <MainContainer>
        <TabVerticalTabularRight />
        <Divider />
        <ProductsGroup products = {this.state.products}/>
      </MainContainer>
    );
  }
}
