import React, { Component } from "react";
import { Link } from "react-router-dom";
import { 
Button, 
List , 
Icon, 
Dimmer, 
Loader, 
Pagination, 
Grid,
Header,
Container,
Segment,
Divider
    } from 'semantic-ui-react';

export class AllUsers extends React.Component {
    constructor() {
        super();
        this.state = {
            products: {},
            loaded: false,
            activePage: 1,
            boundaryRange: 0,
            siblingRange: 1,
            showEllipsis: true,
            showFirstAndLastNav: true,
            showPreviousAndNextNav: true,
            totalPages: 1,
        };
      }

    handleDelete = (id) => {   
        fetch('/admin/Delete/' + id, {  
            method: 'delete'  
        })
        .then(data => {  
            this.setState(  
                {  
                    products: this.state.products.filter((rec) => {  
                        return (rec.id !== id);  
                    }),
                })
        });
    }

      handlePaginationChange = (e, { activePage }) =>{
        fetch("/admin/FetchAllProducts/" + (activePage - 1)+ "/15")
        .then(results => {
          results.json().then(data => {
            console.log(data)
            this.setState({totalPages: data.totalPages, products: data.items, loaded: true, activePage });
          });
        });
      } 

      componentDidMount() {
        fetch("/admin/FetchAllProducts/0/15")
        .then(results => {
          results.json().then(data => {
            console.log(data)
            this.setState({totalPages: data.totalPages, products: data.items, loaded: true });
          });
        });
      }

    render(){
        const {
            activePage,
            boundaryRange,
            siblingRange,
            showEllipsis,
            showFirstAndLastNav,
            showPreviousAndNextNav,
            totalPages,
          } = this.state

        if (!this.state.loaded) {
            return (
              <Dimmer active inverted>
                <Loader size="large">Loading</Loader>
              </Dimmer>
            );
        } else
        return(
            <Container>
                <Header as='h1'>Alle Gebruikers</Header>
                {/* <Divider/> */}
                <Segment>
                    <Grid columns={1}>
                        <Grid.Column>
                            <List divided verticalAlign='middle'>
                                {
                                    this.state.products.map(p => (
                                        <List.Item key = {p.id}>
                                            <List.Content floated='right'>
                                                <Button content = "Delete" onClick = {this.handleDelete.bind(this, p.id) }/>
                                            </List.Content>
                                            <List.Content floated='right'>
                                                <Link to={"/admin-editProduct/" + p.id}>
                                                    <Button content = "Edit"/>
                                                </Link>
                                            </List.Content>
                                            <Icon name = "beer"/>
                                            <List.Content >{p.name}</List.Content>
                                        </List.Item>
                                    )
                                )}
                                {/* <List.Item/> */}
                            </List>
                        </Grid.Column>


                        <Grid.Column>
                            <Pagination
                                    activePage={activePage}
                                    boundaryRange={boundaryRange}
                                    onPageChange={this.handlePaginationChange}
                                    size='mini'
                                    siblingRange={siblingRange}
                                    totalPages={totalPages}
                                    // Heads up! All items are powered by shorthands, if you want to hide one of them, just pass `null` as value
                                    ellipsisItem={showEllipsis ? undefined : null}
                                    firstItem={showFirstAndLastNav ? undefined : null}
                                    lastItem={showFirstAndLastNav ? undefined : null}
                                    prevItem={showPreviousAndNextNav ? undefined : null}
                                    nextItem={showPreviousAndNextNav ? undefined : null}
                                />
                        </Grid.Column>
                    </Grid>
                </Segment>
            </Container>
        );
    }

}