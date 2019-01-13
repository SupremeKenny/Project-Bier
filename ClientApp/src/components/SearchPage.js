import React from 'react';
import ProductCard from './ProductCards.js';
import {Loader, CardGroup, Container} from 'semantic-ui-react';

const MainContainer = ({children}) => {
  const sx = {
    paddingTop: '2em'
  };

  return <Container style={sx}>{children}</Container>;
};

const LoaderContainer = () => {
  let containerHeight = (window.innerHeight / 3) * 2;
  return <Container style={{height: containerHeight}}>
    <Loader active inline='centered'/>
  </Container>
};

export class SearchPage extends React.Component {
  constructor() {
    super();
    this.state = {
      products: [],
      loaded: false
    };
  }


  componentWillMount() {
    this.loadItems()
  }

  loadItems() {
    fetch(
        '/search/search?id=' + this.props.match.params.query.toLowerCase()
    ).then(results => {
      results.json().then(data => {
        console.log('searched');
        this.setState({products: data.product, loaded: true})
      });
    });
  }

  render() {
    if (this.state.loaded === true) {
      return (
          <MainContainer>
            <h1>Je hebt gezocht naar "{this.props.match.params.query}"</h1>
            <p>{this.state.products.length} zoekresultaten.</p>

            <CardGroup itemsPerRow={4}>
              {this.state.products.map(item => (
                  <ProductCard
                      url={item.url}
                      price={item.price}
                      title={item.name}
                      id={item.id}
                      key={item.id}
                  />
              ))}</CardGroup>

          </MainContainer>
      );
    } else {
      return <LoaderContainer/>
    }
  }
}