import React, { Component } from 'react';
import './Category.css';


export class Category extends Component {
  displayName = Category.name

  constructor(props) {
    super(props);
    this.state = { beers: [], loading: true };

    fetch('api/SampleBeer/GetBeers')
      .then(response => response.json())
      .then(data => {
        this.setState({ beers: data, loading: false });
      });
  }



  static renderBeers(beers) {
    return (
      <div>
        <h1>Categories</h1>
        
        {beers.map(beer =>
            <div className="item">
              <h1>{beer.soort}</h1>
              <h3>{beer.brand}</h3>
              <p>{beer.size}</p>
            </div>
          )}
      </div>
    );
  }

  render() {
    let contents = this.state.loading
      ? <p><em>Loading...</em></p>
      : Category.renderBeers(this.state.beers);

    return (
      <div>
        
        {contents}
      </div>
    );
  }
}
