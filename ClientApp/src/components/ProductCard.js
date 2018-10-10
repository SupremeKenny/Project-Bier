import React, { Component } from "react";
import { Link } from "react-router-dom";

import { Image, Button, Popup, Card } from "semantic-ui-react";

export const ProductCard = props => (
  <Card raised>
    <Link to={"/product/" + props.id}>
      <Image
        src={props.url}
        style={{ maxHeight: 300, padding: 20 }}
        centered={true}
      />
    </Link>

    <Card.Content>
      <Card.Header style={{ minHeight: 50 }}>{props.title}</Card.Header>

      <Card.Description style={{ textAlign: "right" }}>
        <b style={{ fontSize: 30 }}>€{props.price}</b>
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
);
