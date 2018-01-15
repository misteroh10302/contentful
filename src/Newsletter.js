import React, { Component } from 'react';
import './App.css';

class Newsletter extends Component {

  render() {
    return (
      <div className={this.props.isOpen}>
        <span onClick={this.props.closeForm}><smaller>close </smaller></span>
        <iframe key="1" title="newsletter" src="https://raremedium.com.au/iframe-signup-form/" frameBorder="0"></iframe>
      </div>
    );
  }
}

export default Newsletter;
