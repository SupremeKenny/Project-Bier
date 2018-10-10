import React from "react";
import { ProductCard } from "./ProductCard.js";
import { Loader, Dimmer, CardGroup, Container } from "semantic-ui-react";
import { CategoryDict } from "./Categories.js";

const MainContainer = ({ children }) => {
  const sx = {
    paddingTop: "2em"
  };

  return <Container style={sx}>{children}</Container>;
};

export class CategoryPage extends React.Component {
  constructor() {
    super();
    this.state = {
      products: null,
      loaded: false
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevProps) {
    let oldParam = prevProps.match.params.id;
    let newParam = this.props.match.params.id;
    if (oldParam !== newParam) {
      this.fetchData();
    }
  }

  fetchData() {
    fetch(
      "https://localhost:5001/product/fetchcategoryall?category=" +
        this.props.match.params.id
    ).then(results => {
      results.json().then(data => {
        this.setState({ products: data.products, loaded: true });
      });
    });
  }

  render() {
    if (!this.state.loaded) {
      return (
        <MainContainer>
          <h1>{CategoryDict[this.props.match.params.id]} </h1>
          <Loader />
        </MainContainer>
      );
    } else {
      return (
        <MainContainer>
          <h1>{CategoryDict[this.props.match.params.id]} </h1>
          <CardGroup itemsPerRow={4}>
            {this.state.products.map(item => (
              <ProductCard
                url={item.url}
                price={item.price}
                title={item.name}
                id={item.id}
                key={item.id}
              />
            ))}
          </CardGroup>
        </MainContainer>
      );
    }
  }
}
