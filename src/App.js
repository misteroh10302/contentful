import React, { Component } from 'react';
import './App.css';
import Posts from "./Posts";
import Scrollchor from 'react-scrollchor';
import { Link } from 'react-router-dom';
import $ from 'jquery'


// import Canvas from 'react-canvas-component'

var contentful = require('contentful')

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      contents: [],
      nav: [],
      posts: [],
      homepage: [],
      stateName: props.theName
    }
    this.clickImage = this.clickImage.bind(this);
  }


  componentWillMount(){
    var client = contentful.createClient({
      space: 'a7w606b3ho4t',
      accessToken: 'e9f5aa5a22b6c3782cf0131258ee27529e37ccb3d1813689c017773625763368'
    });

   // Get all articles
   client.getEntries({
      content_type: 'homepage'
   }).then(function(res){
        this.setState({
          homepage: res.items
        });
    }.bind(this));

    // Get all articles
    client.getEntries({ content_type: 'article'
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

  componentDidMount(){
      console.log(this.state.homepage);
  }
  componentDidUpdate(){
    var that = this;
    var allImages = document.querySelectorAll('article img');

    // Wrap each image in a div called image-inline to create a backgroundColor
    // Make an on click event for mobile
    allImages.forEach(function(e){
      // Check to see if the element already has a title element added
      // If it does not add one
      if (e.nextElementSibling == undefined) {
        var newDiv = document.createElement('h3');
        var theDiv = document.createElement('div');
        var theBackgroundColor = $(e).closest('article');
        var theB = theBackgroundColor[0].style.color
        var theBC = theBackgroundColor[0].style.backgroundColor
        $(theDiv).addClass('image-inline')
        $(theDiv).css({'background-color': theB, 'color':theBC });
        newDiv.innerHTML = e.alt;
        $(e).wrap(theDiv);
        $(e).after(newDiv);
      }  else {
        return
      }
      e.addEventListener('click', that.clickImage);
    })

    // Animate the divs onto the page if animate = true
    let animateElements = document.querySelectorAll('.animate section p > div ')
    // For reach loop to see if the element is on the screen

    window.addEventListener('scroll', animateAll);
    function animateAll() {
      animateElements.forEach((e) => {
        var docViewTop = $(window).scrollTop();
        var docViewBottom = docViewTop + $(window).height();

        var elemTop = $(e).offset().top;
        var elemBottom = elemTop + $(e).height();

        if ( docViewBottom > elemTop ){
           $(e).animate({ marginTop: '-60px'}, 1000);
        }
      });
    }


  }
  clickImage = (e) => {
    var theEl = e.target;
    var theTitle = e.target.alt;
  }

  render() {

    var indexItems
    var articleItems
    var thePosts

    indexItems = this.state.homepage.map(function(item,i){
        if (item.fields.issueNumberMain === this.state.stateName ){
          return(
            <header key={item.sys.id} style={{backgroundImage: `url(${item.fields.backgroundImage.fields.file.url})`}}>
              <img src={item.fields.logo.fields.file.url} alt={item.fields.title} />
              <small>{item.fields.issueNumber} -</small>
              <h1 key={item.sys.id}>{item.fields.magazineTitle}</h1>
              <h2>{item.fields.subHeader}</h2>
            </header>
          )
        }else {
          return null;
        }

    }.bind(this));

    // Get all of the article titles and match them to the title of the magazineTitle
    // Once these are matched create a scrollable anchor tag
    articleItems = this.state.contents.map(function(content,i){
        if (content.fields.issueName === this.state.stateName ){
          return(
            <Scrollchor to={`#${content.fields.title.replace(/ /g,'')}`} key={content.sys.id}>
              <div key={content.sys.id} className={`${content.fields.issueName}`}>
                <h1>{content.fields.title}</h1>
                <img src={content.fields.thumbnail.fields.file.url} alt="" />
              </div>
            </Scrollchor>
          )
        }else {
          return null;
        }
    }.bind(this));

    // Get all of the posts and add them to an array
    thePosts = this.state.contents.map(function(content,i){
            if (content.fields.issueName === this.state.stateName ){
              return(<Posts content={content} id={i} key={content.sys.id}/>)
            }else {
              return null;
            }
        }.bind(this));

    return (

      <div className={`App ${this.props.theName}`}>
        <nav>
              {this.state.homepage.map((item,i) =>
                  <Link onClick={this.updateStateName} key={item.sys.id} to={`/${item.fields.magazineTitle.replace(/ /g,'')}`}>{item.fields.magazineTitle}</Link>
              )}
        </nav>
        <div className="App-header">
          {indexItems}
        </div>
        <span  id="contents"> </span>
        <section id="lower">
          <div className="articleIndex" >
            <h3>Table of content</h3>
            {articleItems}
          </div>
          <div className="App-intro">
            {thePosts}
          </div>
        </section>

      </div>
    );
  }
}

export default App;
