import React, { Component } from "react";
import { Link } from "react-router-dom";

import { Image, Button, Popup, Card, Statistic } from "semantic-ui-react";

class ImageHover extends React.Component {
  constructor(props) {
    super(props)
    this.state = { classNameHover: '' }
  }

  onMouseOver(e) {
    this.setState({
      classNameHover: "hvr-bob"
    });
  }

  onMouseOut(e) {
    this.setState({
      classNameHover: ""
    });
  }

  render() {
    return (
      <Image
        src={this.props.url}
        style={{ maxHeight: 300, padding: 20 }}
        centered={true}
        onMouseEnter={this.onMouseOver.bind(this)}
        onMouseLeave={this.onMouseOut.bind(this)}
        className={this.state.classNameHover}
      />
    );
  }
}

export const ProductCard = props => {
  return (
    <Card className="product-card">
      <Link to={"/product/" + props.id}>
        <ImageHover url={props.url} />
      </Link>

      <Card.Content>
        <Card.Header style={{ minHeight: 50 }}>{props.title}</Card.Header>
        <Card.Description>
          <Statistic size='tiny' >
            <Statistic.Value>€ {String(props.price).replace('.', ',')}</Statistic.Value>
          </Statistic>
        </Card.Description>
      </Card.Content>

      <Card.Content extra floated fluid="true">
        <div class="ui center aligned">
          <Button.Group class="ui center aligned segment">
            <Link to={"/product/" + props.id}>
              <Popup
                trigger={<Button content="Koop" icon="cart" color="green" />}
                content="Klik om het product toe te voegen aan het winkelmandje."
                hideOnScroll
              />
            </Link>
            <Button.Or text="of" />
            <Link to={"/product/" + props.id}>
              <Popup
                trigger={<Button content="Info" icon="info" color="blue" />}
                content="Klik voor meer informatie over het product."
                hideOnScroll
              />
            </Link>
          </Button.Group>
        </div>
      </Card.Content>
    </Card>
  )
}
