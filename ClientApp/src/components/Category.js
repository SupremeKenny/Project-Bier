import React, { Component } from 'react';
import './Category.css';


export class Category extends Component {


  render() {
    return (
      <div>
        <h1>Categories</h1>

        <h1> Normaal bier</h1>
        <div className="item"> 
            <h1>Jupiler</h1>
            <p>Normal beer</p>
        </div>
        <div className="item"> 
            <h1>Hertog Jan</h1>
            <p>Normal beer</p>
        </div>
        <div className="item"> 
            <h1>Amstel</h1>
            <p>Normal beer</p>
        </div>
        <div className="item"> 
            <h1>Heineken</h1>
            <p>Normal beer</p>
        </div>
        

      
      </div>
    );
  }
}
