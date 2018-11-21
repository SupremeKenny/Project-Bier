// import React, { Component } from "react";

// import {ProductCard} from "/Users/kenny/Documenten/Educatie - SchoolProject/Project-Bier/ClientApp/src/components/ProductCard.js";

// import {
//   Container,
//   CardGroup,
//   Dimmer,
//   Loader,
//   Header,
//   Divider,
//   Button,
//   Icon,
//   List
// } from "semantic-ui-react";

// const MainContainer = ({ children }) => {
//   const sx = {
//     paddingTop: "2em"
//   };

//   return <Container style={sx}>{children}</Container>;
// };

// const ProductsGroup = props => (
//   <CardGroup itemsPerRow={4}>
//     {props.products.map(beer => (
//       <ProductCard
//         id={beer.id}
//         title={beer.name}
//         url={beer.url}
//         price={beer.price}
//       />
//     ))}
//   </CardGroup>
// );

// const UserGroup = props => (
//     <List divided verticalAlign='middle'>
//         {props.products.map(beer => (
//             <UserItem
//                 id={beer.id}
//                 title={beer.name}
//                 url={beer.url}
//                 price={beer.price}
//             />
//     ))}
    
//     </List>
// );


// const UserItem = props => (
//     <List.item>
//             <List.Content floated='right'>
//                 <Button>Edit</Button>
//             </List.Content>
//             <Icon name = "arrow alternate circle down outline"/>
//             <List.Content>{props.id}</List.Content>
//         </List.item>
// )


// export class AllUsers extends React.Component {
//   constructor() {
//     super();
//     this.state = {
//       products: {},
//       loaded: false
//     };
//   }

//   componentWillMount() {
//     fetch("/product/FetchHome").then(results => {
//       results.json().then(data => {
//         this.setState({ products: data.products, loaded: true });
//       });
//     });
//   }

//   render() {
//     if (!this.state.loaded) {
//       return (
//         <Dimmer active inverted>
//           <Loader size="large">Loading</Loader>
//         </Dimmer>
//       );
//     } else
//       return (
//         <MainContainer>
//           <Divider />
//           <UserGroup products={this.state.products} />
//         </MainContainer>
//       );
//   }
// }
