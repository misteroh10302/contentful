import React, { Component } from 'react';
import './App.css';


var contentful = require('contentful')

class Nodata extends Component {

  constructor() {
    super();
    this.state = {
      contents: [],
      nav: [],
      posts: [],
      homepage: []
    }
  }


  componentWillMount(){


  }
  render() {
    return (
      <div className="App">
        No Data

      </div>
    );
  }
}

export default Nodata;
