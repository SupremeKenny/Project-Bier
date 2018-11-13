import React, { Component } from "react";
import { Route, Router } from "react-router-dom";

import {FindSearch} from "./AdminPage/FindSearch";
import {NavMenu} from "./AdminPage/NavMenu";
import { Container, Grid, Button } from "semantic-ui-react";

const Style = { marginBottom: 5, marginTop: 20, borderRadius: 0 };

const PageContainer = ({ children }) => {
    const style = {
        paddingTop: "2em"
    };
    return <Container style = {style}>{children}</Container>
};


export class AdminPage extends React.Component 
{
    render(){
        return (
            <PageContainer>
                <Grid >
                    <Grid.Column width={4}>
                        <NavMenu/>
                    </Grid.Column>
                    <Grid.Column width={12}>
                        {this.props.children}
                    </Grid.Column>
                </Grid>
            </PageContainer>
        )
    }
}