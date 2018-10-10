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
  Item
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

const ProductsGroup = () => (
  <CardGroup itemsPerRow={4}>
    <ProductCard
      url="https://www.beerwulf.com/globalassets/catalog/beerwulf/beers/bellfield---lawless-village-ipa.png"
      price="2.19"
      title="Bellfield Lawless Village IPA"
      id="bellfield-lawless-village-ipa-33cl"
    />

    <ProductCard
      url="https://www.beerwulf.com/globalassets/catalog/beerwulf/beers/brassin-de-sutter---brin-de-folie.png"
      price="2.95"
      title="Brasserie De Sutter Brin de Folie"
      id="brasserie-de-sutter-brin-de-folie-33cl"
    />

    <ProductCard
      url="https://www.beerwulf.com/globalassets/catalog/beerwulf/beers/tripel/grutte-pier---tripel.png"
      price="2.59"
      title="Grutte Pier Tripel"
      id="grutte-pier-tripel-33cl"
    />

    <ProductCard
      url="https://www.beerwulf.com/globalassets/catalog/beerwulf/beers/beers-with-the-brussels-beer-challenge-2017-badge/gold/jopen-johannieter_gold_brusselsbeerchallenge.png"
      price="2.49"
      title="Jopen Johannieter"
      id="jopen-johannieter-33cl"
    />

    <ProductCard
      url="https://www.beerwulf.com/globalassets/catalog/beerwulf/beers/blond/breugem-zoentje-blond.png"
      price="2.39"
      title="Breugem Saens Zoentje"
      id="breugem-saens-zoentje-33cl"
    />

    <ProductCard
      url="https://www.beerwulf.com/globalassets/catalog/beerwulf/beers/tripel/le_fort_tripel.png"
      price="2.75"
      title="Lefort Tripel"
      id="lefort-tripel-33cl"
    />

    <ProductCard
      url="https://www.beerwulf.com/globalassets/catalog/beerwulf/beers/bock/het_uiltje_bon_bon_bock.png"
      price="1.69"
      title="Het Uiltje Bon Bon bock"
      id="het-uiltje-bon-bon-bock-33cl"
    />

    <ProductCard
      url="https://www.beerwulf.com/globalassets/catalog/beerwulf/beers/dutchbeerweek/golden-winners/jopen-4-granen-bokbier.png"
      price="5.59"
      title="Anders! Tropical Milkshake IPA 2018"
      id="anders!-tropical-milkshake-ipa-2018-33cl"
    />
  </CardGroup>
);

export class HomePage extends React.Component {
  // state = { activeItem: 'Ontdekkingspack' }
  // handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    //const { activeItem } = this.state

    return (
      <MainContainer>
        <TabVerticalTabularRight />
        <Divider />
        <ProductsGroup />
      </MainContainer>
    );
  }
}
