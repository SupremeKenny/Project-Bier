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
Confirm,
    } from 'semantic-ui-react';
    
export class AllProducts extends React.Component{
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
            open: false,
            deleteProduct: '',
        };
      }

    show = (id) => this.setState({ open: true , deleteProduct: id})
    handleCancel = () => this.setState({ open: false })

    handleDelete = (id) => { 
        console.log('Current Id: ' + id),
        console.log('Active Page: ' + this.state.activePage)  
        fetch('/admin/Delete/' + id, {  
            method: 'delete'  
        })
        .then (data => {
            this.setState ({open: false})
        })
        // .then(data => {  
        //     this.setState(  
        //         {  
        //             products: this.state.products.filter((rec) => {  
        //                 return (rec.id !== id);  
        //             }),
        //         })
        // });

        // console.log (this.state.activePage);

        // console.log ("Product Verwijderd");

        /// Als ik op pagina 0 iets delete --> activepage  = 1

        fetch("/admin/FetchAllProducts/" + (this.state.activePage - 1) + "/15")
        .then(results => {
          results.json().then(data => {
            console.log(data.items)
            if (data.totalPages !== this.state.totalPages){
                console.log ('Pagina heeft geen items meer!');
                fetch("/admin/FetchAllProducts/" + (this.state.activePage - 2) + "/15")
                .then(results => {
                    results.json().then(data => {
                        // console.log(data)
                        this.setState({totalPages: data.totalPages, products: data.items, activePage: 1});
                    });
                });
            }
            else this.setState({totalPages: data.totalPages, products: data.items});

          });
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

      showMessage = (item) => {
        const style = {
            paddingLeft: '1.5em',
            paddingRight: '1.5em',
            paddingTop: '1em',
            paddingBottom: '1em'
        }
          return (
              <Container style = {style}>
                <List >
                    <List.Item>
                    <b>Het product met de volgende ID wordt verwijderd: </b> 
                    <Segment>{item}</Segment>
                    </List.Item>
                </List>
            </Container>

          )
          
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
                <Header as='h1'>Alle Producten</Header>
                {/* <Divider/> */}
                <Segment>
                    <Grid columns={1}>
                        <Grid.Column>
                            <List divided verticalAlign='middle'>
                                {
                                    this.state.products.map(p => (
                                        <List.Item key = {p.id}>
                                            <List.Content floated='right'>
                                                <Button content = "Delete" onClick = {this.show.bind(this, p.id, p)}/>
                                                <Confirm
                                                    open={this.state.open}
                                                    header= 'Product Verwijderen'
                                                    // content= {'Product Id: ' + deleteProduct}
                                                    content= {this.showMessage.bind(this, this.state.deleteProduct)}
                                                    onCancel={this.handleCancel}
                                                    onConfirm={this.handleDelete.bind(this, this.state.deleteProduct)}
                                                />
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