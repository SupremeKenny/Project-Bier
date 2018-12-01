import React from "react";
import {
    Container,
    Segment,
    List,
    Grid,
    Header,
} from "semantic-ui-react";

export const Footer = props => {
    return (
        <div class="footer">
            <Segment style={{ padding: "2em 0em" }} vertical />
            <Segment inverted vertical style={{ padding: "5em 0em" }}>
                <Container>
                    <Grid divided inverted stackable>
                        <Grid.Row>
                            <Grid.Column width={3}>
                                <Header inverted as="h4" content="About" />
                                <List link inverted>
                                    <List.Item as="a">Sitemap</List.Item>
                                    <List.Item as="a">Contact Us</List.Item>
                                    <List.Item as="a">[Invullen]</List.Item>
                                    <List.Item as="a">[Invullen]</List.Item>
                                </List>
                            </Grid.Column>
                            <Grid.Column width={3}>
                                <Header inverted as="h4" content="Services" />
                                <List link inverted>
                                    <List.Item as="a">FAQ</List.Item>
                                    <List.Item as="a">[Invullen]</List.Item>
                                </List>
                            </Grid.Column>
                            <Grid.Column width={7}>
                                <Header as="h4" inverted>
                                    Footer Header
                  </Header>
                                <p>Informatie moet hier nog worden toegevoegd.</p>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Container>
            </Segment>
        </div>
    );
}