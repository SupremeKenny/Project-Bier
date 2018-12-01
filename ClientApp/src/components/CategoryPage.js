import React from "react";
import { ProductCard, ProductCardPlaceholder } from "./ProductCard.js";
import { Loader, CardGroup, Container } from "semantic-ui-react";
import { CategoryDict } from "./Categories.js";
import InfiniteScroll from 'react-infinite-scroller';

const MainContainer = ({ children }) => {
  const sx = {
    paddingTop: "2em"
  };

  return <Container style={sx}>{children}</Container>;
};

const LoaderContainer = () => {
  let numbers = [1, 2, 3, 4, 5, 6, 7, 8]
  return <CardGroup itemsPerRow={4}>
    {numbers.map(number => (
      <ProductCardPlaceholder
        key={number}
      />
    ))}</CardGroup>
}

export class CategoryPage extends React.Component {
  constructor() {
    super();
    this.state = {
      products: [],
      hasMoreItems: true,
      currentIndex: 0
    };
  }

  componentDidUpdate(prevProps) {
    let oldParam = prevProps.match.params.id;
    let newParam = this.props.match.params.id;
    if (oldParam !== newParam) {
      this.pageReset();
    }
  }

  pageReset() {
    this.setState({ products: [], currentIndex: 0, hasMoreItems: true });
  }

  loadItems() {
    fetch(
      "/product/fetchcategory?category=" +
      CategoryDict[this.props.match.params.id] + "&index=" + this.state.currentIndex
    ).then(results => {
      results.json().then(data => {
        var newIndex = this.state.currentIndex + 1;
        var hasMore = !(newIndex === data.totalCollections + 1);
        console.log(hasMore);
        this.setState({ products: this.state.products.concat(data.items), currentIndex: newIndex, hasMoreItems: hasMore })
      });
    });
  }

  render() {
    return (
      <MainContainer>
        <h1>{CategoryDict[this.props.match.params.id]} </h1>
        <InfiniteScroll
          pageStart={0}
          loadMore={this.loadItems.bind(this)}
          hasMore={this.state.hasMoreItems}
          loader={<LoaderContainer />}
          useWindow={true}
          threshold={400}
        >
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
        </InfiniteScroll>
      </MainContainer>
    );
  }
}
