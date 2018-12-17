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
    
export class AllDiscounts extends React.Component{
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
        fetch("/admin/FetchAllDiscounts")
        .then(results => {
          results.json().then(data => {
            this.setState({Discounts: data.discounts, loaded: true });
          });
        });
    }

    handleDeleteProduct = (id) => {
        // console.log ("handDeleteProduct: " + id)
        this.setState({loaded: false})
        fetch('/admin/deletediscount/' + id, {  
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

  

    render(){

        if (!this.state.loaded) {
            return (
              <Dimmer active inverted>
                <Loader size="large">Loading</Loader>
              </Dimmer>
            );
        } else
        console.log(this.state.Discounts);
        return(
            <Container>
                <Header as='h1'>Alle Kortingscodes</Header>
                <Segment>
                    <Grid columns={1}>
                        <Grid.Column>
                            <List divided verticalAlign='bottom' size = {'small'}>
                                {
                                    
                                    this.state.Discounts.map(p => (
                                        
                                        <List.Item key = {p.code} >
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
                                                            onClick = {this.handleDeleteProduct.bind (this, p.code)}
                                                            />
                                                        </Grid.Column>
                                                    </Grid>
                                                </Popup>
                                            </List.Content>

                                            <List.Content floated='right'>
                                                <Link to={"/admin-editdiscount/" + p.code}>
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
                                                    {p.code}
                                                </List.Header>
                                                {p.procent ? (
                                                    <div>{p.amount} procent korting </div>
                                                     ) :(
                                                    <div>{p.amount} euro korting </div>
                                                         )}  
                                            </List.Content>
                                        </List.Item>
                                    )
                                )}
                            </List>
                        </Grid.Column>

                    
                    </Grid>
                </Segment>
            </Container>
        );
    }
}