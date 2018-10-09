import React, { Component } from "react";
import { Link } from 'react-router-dom';

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



const panes = ([
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

  { menuItem: (
    <Menu.Item key='Ontdekkingspack' style = {{fontSize: '16px'}} content = "Ontdekkingspack"/>), render: () => <Content
    // title
    // sub
    // description
    // url
    // price
    // discount
    /> 
  },
  { menuItem: (
    <Menu.Item key='Celebration Pack' style = {{fontSize: '16px'}} content = "Celebration Pack"/>), render: () => <Content/> 
  },
  { menuItem: (
    <Menu.Item key='Alcoholvrij Pack' style = {{fontSize: '16px'}} content = "Alcoholvrij Pack"/>), render: () => <Content/> 
  },
  { menuItem: (
    <Menu.Item key='Oktoberfest Pack' style = {{fontSize: '16px'}} content = "Oktoberfest Pack"/>), render: () => <Content/> 
  },
  
  // { menuItem: (
  //   <Menu.Item key='messages' style = {{fontSize: '16px'}}>
  //   <Icon name="beer"></Icon>
  //     Messages
  //   {/* <Label>15</Label> */}
  //   </Menu.Item>), 
  //   render: () => <Content/> 
  // },

])

const TabVerticalTabularRight = () => (
  <Tab menu={{ fluid: true, vertical: true, tabular: 'right' }} panes={panes} grid={{paneWidth: 13, tabWidth: 3}}/>
)


const Content = props => (
  <Tab.Pane>
    <Item.Group>
      <Item>
        <Item.Image 
          src='https://www.beerwulf.com/globalassets/catalog/beerwulf/beers/packs/ondekkings_pack_16_web.png?w=547&rev=1132979819' 
          size = "medium"
        />

        <Item.Content>
          <Item.Header as='a'><h1>Ontdekkingspack | 16</h1></Item.Header>
          <Item.Meta>
            <span className='cinema'><h3>16 bieren</h3></span>
          </Item.Meta>
          <Item.Description>
          <b>Een mooi pack dat verschillende toegankelijke bieren bevat die je zullen bevallen. Zoals Ares van Walhalla, een amberkleurig bier dat tonen van karamel combineert met een flinke hand hop. Of Undercurrent van Siren, een fruitige en droge pale ale. De gereedschapskist die je nodig hebt om de craft- en speciaalbier wereld te ontdekken! In dit geval bieren van 16 verschillende brouwers in 7 verschillende stijlen uit 5 landen.</b>
            </Item.Description>
          <Item.Extra>
            <Button content="Voeg toe aan winkelmandje" icon = 'cart' color = 'green' floated='right'/>
            <Label basic color='grey' pointing='left' style = {{fontSize: '18px'}}>
              Prijs $ 25.95
            </Label>
            <Label color = "red" style = {{fontSize: '18px'}}>-40%</Label>
          </Item.Extra>
        </Item.Content>
      </Item>
    </Item.Group>
  </Tab.Pane>
)



const MyCard = props => (
  <Card raised>
      <Link to={"/product/"+ props.id}>
        <Image src={props.url} style={{ maxHeight: 300, padding: 20}} centered= "true"/>
      </Link>

      <Card.Content>
        <Card.Header style = {{minHeight:50}}>{props.title}</Card.Header>

        <Card.Description style = {{fontSize: '14px'}}>
          {/* <Icon name='euro sign' /> {props.price } */}
          {/* <Label as='a'>$ {props.price }</Label> */}
          {/* <button> $ {props.price }</button> */}

          {/* <Label as='a' basic color = "teal" pointing style = {{fontSize: '12px'}}>
            $ {props.price }
          </Label> */}

          <Label as='a' basic color='grey' pointing style = {{fontSize: '12px'}}>
            Price $ {props.price }
          </Label>
        </Card.Description>
      </Card.Content>

       <Card.Content extra floated fluid='true'>
        <div class="ui center aligned">
          <Button.Group class="ui center aligned segment">
            <Link to={"/product/"+ props.id} >
              <Popup
                trigger={<Button content = 'Buy' icon = 'cart' color = 'green'/>}
                content= 'Klik om het product toe te voegen aan het winkelmandje.'
                hideOnScroll
              />
            </Link>
            <Button.Or/>
            <Link to={"/product/"+ props.id} >
              <Popup
                trigger={<Button content = 'More' icon = 'info' color = 'blue'/>}
                content='Klik voor meer informatie over het product.'
                hideOnScroll
              />
            </Link>
          </Button.Group>
        </div>
      </Card.Content>

  </Card>)
    

  const ProductsGroup = () => (
  <CardGroup itemsPerRow={4}>
    <MyCard url="https://www.beerwulf.com/globalassets/catalog/beerwulf/beers/amber/van_de_streek_bok_jij_of_bock_ik.png?w=150"
     price="2.19" title="Vandestreek Bock jij of bock ik?" id="vandestreek-bock-jij-of-bock-ik"/>

    <MyCard url="https://www.beerwulf.com/globalassets/catalog/beerwulf/beers/brussels-beer-project-delta-ipa.png?w=150"
     price="2.95" title="Brussels Beer Project Delta IPA" id="brussels-beer-project-delta-ipa"/>

    <MyCard url="https://www.beerwulf.com/globalassets/catalog/beerwulf/beers/lager/paulener_oktoberfest.png?w=150"
     price="2.59" title="Paulaner Oktoberfest" id="paulaner-oktoberfest"/>

     <MyCard url="https://www.beerwulf.com/globalassets/catalog/beerwulf/beers/bellfield---lawless-village-ipa.png?h=500&rev=1040873587"
     price="2.49" title="Bellfield Lawless Village IPA" id="Bellfield-Lawless-Village-IPA"/>

     <MyCard url="https://www.beerwulf.com/globalassets/catalog/beerwulf/beers/brassin-de-sutter---folle-furieuz.png?h=500&rev=1150163332"
     price="2.39" title="Brasserie De Sutter Folle FurieuZ" id="brasserie-de-sutter-folle-furieuz"/>

     <MyCard url="https://www.beerwulf.com/globalassets/catalog/beerwulf/beers/tripel/frankendael-tits-three-idiots-tripel-spiced.png?h=500&rev=997360494"
     price="2.75" title="Frankendael Three Idiots Tripel Spiced (T.I.T.S.)" id="frankendael-three-idiots-tripel-spiced-t.i.t.s."/>

     <MyCard url="https://www.beerwulf.com/globalassets/catalog/beerwulf/beers/duvel_opt.png?h=500&rev=899257661"
     price="1.69" title="Duvel" id="Duvel"/>

     <MyCard url="https://www.beerwulf.com/globalassets/catalog/beerwulf/beers/harviestoun---ola-dubh-18.png?h=500&rev=1074229025"
     price="5.59" title="Harviestoun Ola Dubh 18 Year" id="harviestoun-ola-dubh-18-year"/>

  </CardGroup>
)



export class HomePage extends React.Component {

  // state = { activeItem: 'Ontdekkingspack' }
  // handleItemClick = (e, { name }) => this.setState({ activeItem: name })


  render() {
    //const { activeItem } = this.state

    return (
      <MainContainer>

        <Breadcrumb>
          <Breadcrumb.Section active link>Home</Breadcrumb.Section>
        </Breadcrumb>

        <Divider />
        <TabVerticalTabularRight/>
        <Divider />

        <ProductsGroup />

      </MainContainer>
    );
  }
}