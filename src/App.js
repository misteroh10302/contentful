import React, { Component } from 'react';
import './App.css';
import Posts from "./Posts";
import Newsletter from "./Newsletter";
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
      stateName: props.theName,
      height: 'auto',
      openForm: "form"
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
        return a.fields.order - b.fields.order
      })
      console.log(sortedContent);
        this.setState({
           contents: sortedContent
         });
     }.bind(this));


  }

  componentDidMount(){
        const height = this.articleEl.clientHeight - 220;
        this.setState({ height });
        console.log('finished');
  }
  componentDidUpdate(){
    var that = this;
    var allImages = document.querySelectorAll('.imageClick img');
    // Wrap each image in a div called image-inline to create a backgroundColor
    // Make an on click event for mobile
    var allImagesLength = allImages.length;

      if ($('.image-inline').length < allImagesLength) {
        allImages.forEach(function(e){


           // Check to see if the element already has a title element added
          // If it does not add one

            var newDiv = document.createElement('h3');
            var theDiv = document.createElement('div');
            var theBackgroundColor = $(e).closest('article');
            var theB = theBackgroundColor[0].style.borderColor;
            var theBC = theBackgroundColor[0].style.backgroundColor;
            $(theDiv).addClass('image-inline');
            $(theDiv).css({'background-color': theB, 'color':theBC });
            newDiv.innerHTML = e.alt;
            $(e).wrap(theDiv);
            $(e).after(newDiv);

        })

      }

    // Animate the divs onto the page if animate = true
    let animateElements = document.querySelectorAll('.animate section p > div ')
    let addsideHeader = document.querySelectorAll('.App-intro div');
    // For reach loop to see if the element is on the screen
    window.addEventListener('scroll', scrollEvents);
    function scrollEvents() {
      // As the use scrolls
      // If the scroll top is greater than the scroll top of the element add a class activeArticle
      // Else if the scroll top is greater than the height of the element remove class astiveArticle
      // else if the scroll top is less than the top of the element + the height remove class activeArticle
      addsideHeader.forEach((e) => {
        var docViewTop = $(window).scrollTop();
        var docViewBottom = docViewTop + $(window).height();

        var elemTop = $(e).offset().top + $(window).height() - 70;
        // var elemBottom = elemTop + $(e).height();

        if ( docViewBottom > elemTop ){
           $(e).addClass('fixSub');
        }  else {
          $(e).removeClass('fixSub');
        }
      });

      // animate any meat element
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

    var articleHeight = {
      top: Math.min(0, window.innerHeight + this.state.height -120)
    }
  }
  clickImage = (e) => {
    var theEl = e.target;
    var theTitle = e.target.alt;
  }

  openNews(){
    if (this.state.openForm === 'form-open') {
      this.setState({
        openForm: 'form'
      });
    }  else{
      this.setState({
        openForm: 'form-open'
      });
    }

  }

  closeNews(){
    this.setState({
      openForm: 'hidden'
    });
  }

  render() {

    var indexItems
    var articleItems
    var thePosts

    indexItems = this.state.homepage.map(function(item,i){
        if (item.fields.issueNumberMain === this.state.stateName ){
          return(
            <header key={item.sys.id} style={{backgroundImage: `url(${item.fields.backgroundImage.fields.file.url})`, color: `${item.fields.fontColor}`}}>
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



      var sortedContent = this.state.contents.sort(function(a,b){
        return a.fields.order - b.fields.order
      });



    console.log(sortedContent);

    articleItems = this.state.contents.map(function(content,i){
        let thumbnail
         if (content.fields.thumbnail !== undefined) {
            thumbnail = content.fields.thumbnail.fields.file.url
         } else {
            thumbnail = null
         }

        if (content.fields.issueName === this.state.stateName ){
          return(
            <Scrollchor to={`#${content.fields.title.replace(/ /g,'').replace(/'/g,'')}`} key={content.sys.id}>
              <div key={content.sys.id} className={`${content.fields.issueName}`}>
                <h1>{content.fields.title}</h1>
                <img src={thumbnail} alt="" />
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
        <iframe src="http://raremedium.monkeylabs.com.au/iframe-header/" width="100%"frameborder="0"></iframe>
          <img src="http://images.contentful.com/a7w606b3ho4t/5u3fwMgCZy4UswWS0SSsiA/96b5fa5bbe21db40ad68681efb73bd79/RareMedium_BadgeLandscape_REV.png" alt="" />
              {this.state.homepage.map((item,i) =>
                  <Link onClick={this.updateStateName} key={item.sys.id} to={`/${item.fields.magazineTitle.replace(/ /g,'')}`}>{item.fields.magazineTitle}</Link>
              )}
          <div className="newsButton" onClick={this.openNews.bind(this)}>
            <h3>EMAG</h3>
          </div>
        </nav>
        <div className="App-header">
          {indexItems}
        </div>
        <span  id="contents"> </span>
        <section id="lower">
          <div className="articleIndex" ref={ (articleEl) => this.articleEl = articleEl} style={{'top': "-"+this.state.height}}>
            <h3>Table of content</h3>
            {articleItems}
          </div>
          <div className="App-intro">
            {thePosts}
          </div>
        </section>
        <Newsletter isOpen={this.state.openForm} closeForm={this.closeNews.bind(this)}/>
      </div>
    );
  }
}

export default App;
