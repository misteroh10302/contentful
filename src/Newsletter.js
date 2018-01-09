import React, { Component } from 'react';
import './App.css';


class Newsletter extends Component {

  constructor(props) {
    super(props);

  }


  componentWillMount(){


  }
  render() {
    return (
      <div className={this.props.isOpen}>
        <span onClick={this.props.closeForm}><smaller>close </smaller></span>
      <iframe src="https://raremedium.com.au/iframe-signup-form/" frameborder="0"></iframe>
      </div>
    );
  }
}

export default Newsletter;
