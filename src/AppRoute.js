import React, { Component } from 'react';
import App from "./App";
import { BrowserRouter, Route, Redirect } from 'react-router-dom'
// import Canvas from 'react-canvas-component'

var contentful = require('contentful')

class AppRoute extends Component {

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
    var client = contentful.createClient({
      space: 'a7w606b3ho4t',
      accessToken: 'e9f5aa5a22b6c3782cf0131258ee27529e37ccb3d1813689c017773625763368'
    });

   // Get all articles
   client.getEntries({content_type: 'homepage'}).then(function(res){this.setState({homepage: res.items});}.bind(this));

    // Get all articles
    client.getEntries({
       content_type: 'article'
    }).then(function(res){
          var content = res.items
          var sortedContent = content.sort(function(a,b){
            return a.fields.order > b.fields.order
          })
         this.setState({
           contents: sortedContent
         });
     }.bind(this));



  }


  render() {
    var index
    index = this.state.homepage.map(function(index,i) {
      if (index.fields.currentIssue){
        return(
          <Route key={`${i}-${index.sys.id}`} exact path="/" render={() => (<Redirect to={index.fields.magazineTitle.replace(/ /g,'')} />)} children={({match}) => {
                if (match) return  <App  theName={index} >

                </App>
              return null;
            }} />

        )
      } else {
        return null;
      }

    });
    return (
      <BrowserRouter>
        <nav>
            {this.state.homepage.map((nav, i) =>
                 <Route key={`${i}-${nav.sys.id}`} path={"/" + nav.fields.magazineTitle.replace(/ /g,'').replace(/'/g,'').replace(/$/g,'')} tag={nav.title} children={({match}) => {
                    if (match) return  <App theName={nav.fields.issueNumberMain} >
                    </App>
                  return null;
                }} />
              )}
              {index}
        </nav>
      </BrowserRouter>
    );
  }
}

export default AppRoute;
