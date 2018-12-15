import React from "react";
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
Popup,
    } from 'semantic-ui-react';
    
export class AllProducts extends React.Component{
    constructor() {
        super();
        this.state = {
            products: {},
            loaded: false,
            activePage: 1,
            totalPages: 1,
        };
      }

    componentDidMount() {
        console.log("CompomnentDidMount")
        fetch("/admin/FetchAllProducts/0/15")
        .then(results => {
          results.json().then(data => {
            this.setState({totalPages: data.totalPages, products: data.items, loaded: true });
          });
        });
    }

    handlePaginationChange = (e, { activePage }) => {
        // console.log ("handlePaginationChange: " + activePage)
        this.setState({loaded:false})
        this.fetchData (activePage)
    }

    handleDeleteProduct = (id) => {
        // console.log ("handDeleteProduct: " + id)
        this.setState({loaded: false})
        fetch('/admin/Delete/' + id, {  
            method: 'delete'  
        })
        .then (response =>{
            // console.log ("Request Status Code: " + response.status)
            if (response.ok){
                alert("Product is succesvol verwijderd")
                this.fetchData (this.state.activePage)
            }
            else {
                this.setState({loaded: true})
                alert("Error! Product is niet verwijderd")
            }
        })
    }

    fetchData = currentPage => {
        // console.log ("fetchData: " + currentPage)
        fetch("/admin/FetchAllProducts/" + (currentPage - 1) + "/15")
        .then(results => {
            results.json()
            .then(data => {
                // console.log (data.items)
                // console.log ("Aantal producten: " + data.count)
                if (data.count === 0 && data.totalPages >= 1){
                    console.log ("Empty page")
                    this.fetchData(currentPage - 1)
                }
                else {
                    console.log ("Total Pages: " + data.totalPages + " | Product Count: " + data.count)
                    this.setState ({
                        totalPages: data.totalPages,
                        products: data.items,
                        activePage: currentPage,
                        loaded: true
                    })
                }
                
            })
        })
    }

    render(){
        const {
            activePage,
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
                <Header as='h1'>Alle Producten</Header>
                <Segment>
                    <Grid columns={1}>
                        <Grid.Column>
                            <List divided verticalAlign='bottom' size = {'small'}>
                                {
                                    this.state.products.map(p => (
                                        <List.Item key = {p.id} >
                                            <List.Content floated='right'>
                                                <Popup
                                                trigger = {
                                                    <Button color = "red" size = 'tiny' animated>
                                                        <Button.Content visible content = 'Delete'/>
                                                        <Button.Content hidden>
                                                            <Icon name='delete' />
                                                        </Button.Content>
                                                    </Button>
                                                }
                                                on = 'click'
                                                position = 'right center'
                                                >
                                                    <Grid>
                                                        <Grid.Column textAlign='center'>
                                                            <Header 
                                                            as='h4' 
                                                            content = "Weet u het zeker?"
                                                            />
                                                            <Button 
                                                            content = "Verwijder"  
                                                            color = "green" 
                                                            onClick = {this.handleDeleteProduct.bind (this, p.id)}
                                                            />
                                                        </Grid.Column>
                                                    </Grid>
                                                </Popup>
                                            </List.Content>

                                            <List.Content floated='right'>
                                                <Link to={"/admin-editProduct/" + p.id}>
                                                    <Button animated size = 'tiny'>
                                                        <Button.Content visible content = 'Edit' color/>
                                                        <Button.Content hidden>
                                                            <Icon name='edit outline' />
                                                        </Button.Content>
                                                    </Button>
                                                </Link>
                                            </List.Content>

                                            <Icon name = "angle right" size = 'big'/>

                                            <List.Content verticalAlign='bottom' >
                                                <List.Header>
                                                    {p.name}
                                                </List.Header>
                                                {p.id}
                                            </List.Content>
                                        </List.Item>
                                    )
                                )}
                            </List>
                        </Grid.Column>

                        <Grid.Column>
                            <Pagination
                                    activePage={activePage}
                                    totalPages={totalPages}
                                    onPageChange={this.handlePaginationChange}
                                    size='mini'
                                    boundaryRange={0}
                                    siblingRange={1}
                                />
                        </Grid.Column>
                    </Grid>
                </Segment>
            </Container>
        );
    }
}