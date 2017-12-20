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
        <div className="closeForm" onClick={this.props.closeForm}>
          <span></span>
          <span></span>
        </div>
        <h1>Emag Signup</h1> <small> * mantadory </small>
        <input type="text" className="full" placeholder="Name"/>
        <input type="text" className="full"  placeholder="Email"/>
        <input type="text" placeholder="Position"/>
        <input type="text" placeholder="Location"/>
        <input type="text" placeholder="Venue Name"/>
        <input type="text" placeholder="Venue Type"/>
        <input type="text" className="full"  placeholder="Contact phone Number"/>
        <input type="submit" placeholder="Name"/>
      </div>
    );
  }
}

export default Newsletter;
