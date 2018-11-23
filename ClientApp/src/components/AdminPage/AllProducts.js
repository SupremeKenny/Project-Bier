import React, { Component } from "react";
import { 
Button, 
List , 
Icon, 
Dimmer, 
Loader, 
Pagination, 
Grid,
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
        };

        // this.handleDelete = this.handleDelete.bind(this);
      }

    handleDelete = (id) => {   
        fetch('/admin/Delete/' + id, {  
            method: 'delete'  
        })
        .then(data => {  
            console.log(data),
            this.setState(  
                {  
                    products: this.state.products.filter((rec) => {  
                        return (rec.id != id);  
                    })  
                });  
        });  
        console.log("iets");
        console.log(this.state.products);
    }

      handlePaginationChange = (e, { activePage }) =>{
        fetch("/admin/FetchAllProducts/" + (activePage - 1)+ "/15")
        .then(results => {
          results.json().then(data => {
            // console.log ("PageChange: " + activePage),
            // console.log(e),
            this.setState({totalPages: data.totalPages, products: data.items, loaded: true, activePage });
          });
        });
      } 



      componentWillMount() {
        fetch("/admin/FetchAllProducts/0/15")
        .then(results => {
          results.json().then(data => {
            // console.log ("OnWillMount: " + this.state.activePage),
            console.log(data),
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
            // <ProductGroup products={this.state.products} />
            <Grid columns={1}>
                <Grid.Column>
                    {/* <ProductGroup products={this.state.products} /> */}

                    <List divided verticalAlign='middle'>
                        {
                            this.state.products.map(p => (
                                <List.Item>
                                    <List.Content floated='right'>
                                        <Button content = "Delete" onClick = {this.handleDelete.bind(p.id)}/>
                                    </List.Content>
                                    <List.Content floated='right'>
                                        <Button content = "Edit"/>
                                    </List.Content>
                                    <Icon name = "beer"/>
                                    <List.Content >{p.name}</List.Content>
                                </List.Item>
                            )
                        )}
                    </List>
                </Grid.Column>

                <Grid.Column>
                    <Pagination
                        activePage={activePage}
                        boundaryRange={boundaryRange}
                        onPageChange={this.handlePaginationChange}
                        size='mini'
                        siblingRange={siblingRange}
                        totalPages={totalPages + 1}
                        // Heads up! All items are powered by shorthands, if you want to hide one of them, just pass `null` as value
                        ellipsisItem={showEllipsis ? undefined : null}
                        firstItem={showFirstAndLastNav ? undefined : null}
                        lastItem={showFirstAndLastNav ? undefined : null}
                        prevItem={showPreviousAndNextNav ? undefined : null}
                        nextItem={showPreviousAndNextNav ? undefined : null}
                    />
                </Grid.Column>
            </Grid>
        );
    }
}

// const ProductGroup = props => (
//     <List divided verticalAlign='middle'>
//         {
//             props.products.map(p => (
//                 <ProductItem name = {p.name} id = {p.id}/>
//             )
//         )}
//     </List>
// );


// const ProductItem = props =>{
    
//     return (
//         <List.Item>
//             <List.Content floated='right'>
//                 <Button content = "Delete"/>
//             </List.Content>
//             <List.Content floated='right'>
//                 <Button content = "Edit"/>
//             </List.Content>
//             <Icon name = "beer"/>
//             <List.Content >{props.name}</List.Content>
//         </List.Item>
//     );
// }