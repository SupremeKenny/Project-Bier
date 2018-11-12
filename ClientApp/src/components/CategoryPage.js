import React from "react";
import { ProductCard } from "./ProductCard.js";
import { Loader, CardGroup, Container, Dropdown, Icon, Grid, GridColumn, Button} from "semantic-ui-react";
import { CategoryDict } from "./Categories.js";
import InfiniteScroll from 'react-infinite-scroller';

const MainContainer = ({ children }) => {
  const sx = {
    paddingTop: "2em"
  };

  return <Container style={sx}>{children}</Container>;
};

const LoaderContainer = () => {
  var containerHeight = (window.innerHeight / 3) * 2;
  return <Container style={{ height: containerHeight }}>
    <Loader active inline='centered' />
  </Container>
}

const options = [
  { key: 'test1', text: 'test1', value: 'test1' },
  { key: 'test2', text: 'test2', value: 'test2' },
  { key: 'test3', text: 'test3', value: 'test3' },
  { key: 'test4', text: 'test4', value: 'test4' },
  { key: 'test5', text: 'test5', value: 'test5' },
]

const filterStyle = { 
  // marginBottom: '0em', 
  marginTop: '1em',
  width: "70%"        
                    };


const FilterDropdown = props => (

  <Grid columns={4} style = {filterStyle}>
    <Grid.Column>
      <Dropdown placeholder= 'Inhoud' fluid selection options={options} />
    </Grid.Column>
    <Grid.Column>
      <Dropdown placeholder= 'Alcohol %' fluid selection options={options}/>
    </Grid.Column>
    <Grid.Column>
      <Dropdown placeholder= 'Brouwer' fluid selection options={options}/>
    </Grid.Column>
    <Grid.Column>
      <Dropdown placeholder= 'Herkomst' fluid selection options={options}/>  
    </Grid.Column>
  </Grid>
  )

// const SortDropdown = () => {
//   const color = {
//     color: "grey",
//     marginBottom: '1em'
//   }

//   const sortValues = [
//     {key: 'meest_populair', text: 'Meest populair', value: 'meest_populair'},
//     {key: 'hoogste_prijs', text: 'Hoogste prijs', value: 'hoogste_prijs'},
//     {key: 'laagste_prijs', text: 'Laagste prijs', value: 'laagste_prijs'},
//   ]

//   return (
//     <Grid>
//       <Grid.Column floated='left' width={5}>
//         <p style = {color}>Aantal Producten: </p>
//       </Grid.Column>
//       <Grid.Column floated='right' width={4}>
//         <span>
//           Sorteer op: {' '}
//           <Dropdown 
//           inline 
//           options={sortValues} 
//           defaultValue={sortValues[0].key 
//           } />
//         </span>
//       </Grid.Column>
//     </Grid>
//   )
  
// }

const color = {
  color: "grey",
  marginBottom: '1em'
}

const sortValues = [
  {key: 'meest_populair', text: 'Meest populair', value: 'meest_populair'},
  {key: 'hoogste_prijs', text: 'Hoogste prijs', value: 'hoogste_prijs'},
  {key: 'laagste_prijs', text: 'Laagste prijs', value: 'laagste_prijs'},
]

export class CategoryPage extends React.Component {
  constructor() {
    super();
    this.state = {
      products: [],
      hasMoreItems: true,
      currentIndex: 0
    };
    this.sortByPriceAsc = this.sortByPriceAsc.bind(this);
    this.sortByPriceDesc = this.sortByPriceDesc.bind(this);
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
      "https://localhost:5001/product/fetchcategory?category=" +
      this.props.match.params.id + "&index=" + this.state.currentIndex
    ).then(results => {
      results.json().then(data => {
        var newIndex = this.state.currentIndex + 1;
        var hasMore = !(newIndex === data.totalCollections + 1);
        console.log(hasMore);
        this.setState({ products: this.state.products.concat(data.items), currentIndex: newIndex, hasMoreItems: hasMore })
      });
    });
  }

  sortByPriceAsc() {
    const {products} = this.state;
    let newProducts = products.reverse()
    this.setState({
      products: newProducts.sort((a,b) => a.price > b.price)
    });
  }

  sortByPriceDesc() {
    const {products} = this.state;
    let newProducts = products.reverse()
    this.setState({
      products: newProducts.sort((a,b) => a.price < b.price)
    });
  }

  

  render() {
    return (
      <MainContainer>
        <h1>{CategoryDict[this.props.match.params.id]} </h1>
        <FilterDropdown/>
        {/* <SortDropdown/> */}


        <Grid>
          <Grid.Column floated='left' width={5}>
            <p style = {color}>Aantal Producten: </p>
          </Grid.Column>
          <Grid.Column floated='right' width={4}>
            <span>
              Sorteer op: {' '}
              <Button onClick={this.sortByPriceAsc}>asc $</Button>
              <Button onClick={this.sortByPriceDesc}>desc $</Button>
              
              {/* <Dropdown 
              inline 
              options={sortValues} 
              defaultValue={sortValues[0].key 
              } /> */}
            </span>
          </Grid.Column>
        </Grid>

        {/* <br/><br/> */}
        {/* <Button onClick={this.sortByPriceAsc}>asc</Button>
        <Button onClick={this.sortByPriceDesc}>desc</Button> */}
        {/* <br/><br/> */}

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
