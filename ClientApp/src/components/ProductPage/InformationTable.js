import React from 'react';
import { Link } from "react-router-dom";

import {
  Header,
  Divider,
  Table,
} from "semantic-ui-react";

export const ProductInfoTable = props => {
  return (
    <div>
      <Divider />

      <Table basic="very" celled collapsing>
        <Table.Body>
          <Table.Row>
            <Table.Cell>
              <Header as="h4">
                <Header.Content>Flesinhoud</Header.Content>
              </Header>
            </Table.Cell>
            <Table.Cell>{props.content}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              <Header as="h4">
                <Header.Content>Alcoholpercentage</Header.Content>
              </Header>
            </Table.Cell>
            <Table.Cell>{props.percentage}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              <Header as="h4">
                <Header.Content>Categorie</Header.Content>
              </Header>
            </Table.Cell>
            <Table.Cell>
              <Link to={"/category/" + props.link}>{props.category}</Link>
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              <Header as="h4">
                <Header.Content>Brouwer</Header.Content>
              </Header>
            </Table.Cell>
            <Table.Cell>{props.brand}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              <Header as="h4">
                <Header.Content>Land van afkomst</Header.Content>
              </Header>
            </Table.Cell>
            <Table.Cell>{props.country}</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
      <Divider />
    </div>
  );
};
