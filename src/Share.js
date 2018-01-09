import React, { Component } from 'react';
import './App.css';


class Share extends Component {

  constructor(props) {
    super(props);

  }


  componentWillMount(){


  }
  componentDidMount() {
    const FB = window.FB;
      document.getElementById('shareBtnFace').onclick = function(e) {
        e.preventDefault;
        FB.ui({
          method: 'share',
          display: 'popup',
          href: 'http://raremedium.com.au/',
        }, function(response){});
      }

  }
  render() {
    return (
      <div className={this.props.isOpen}>
        <div className="shareMod">
          <span onClick={this.props.closeForm}><smaller>close </smaller></span>
          <h3>Share the Emag</h3>
          <img src="//images.contentful.com/a7w606b3ho4t/6BRAKjSvYWOOIaEAQcG8uI/12ddd970d5b3b153c6fd8d1d645072e8/Screen_Shot_2018-01-08_at_5.39.08_PM.png" alt=""/>
          <div className="share_button_wrap">
            <a className="share_button" href="mailto:?subject=I wanted you to see this site&amp;body=Check out this site raremediummag.com.">
                <div id="shareBtnEmail" >Email</div>
              </a>
            <div className="share_button" id="shareBtnFace" >Facebook</div>
          </div>

        </div>
      </div>
    );
  }
}

export default Share;
