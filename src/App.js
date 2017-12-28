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

        this.setState({
           contents: sortedContent
         });
     }.bind(this));


  }

  componentDidMount(){
        const height = this.articleEl.clientHeight - 220;
        this.setState({ height });
        // if (window.addEventListener) window.addEventListener('DOMMouseScroll', wheel, false);
        // window.onmousewheel = document.onmousewheel = wheel;
        //
        // function wheel(event) {
        //     var delta = 0;
        //     if (event.wheelDelta) delta = event.wheelDelta / 120;
        //     else if (event.detail) delta = event.wheelDelta / 120;
        //
        //     handle(delta);
        //     if (event.preventDefault) event.preventDefault();
        //     event.returnValue = false;
        // }
        //
        // function handle(delta) {
        //     var time = 100;
        //     var distance = 50;
        //
        //     $('html, body').stop().animate({
        //         scrollTop: $(window).scrollTop() - (distance * delta)
        //     }, time );
        // }

  }
  componentDidUpdate(){
    var that = this;
    var allImages = document.querySelectorAll('.imageClick img');
    var allVideos = document.querySelectorAll('.video-hold');
    // Wrap each image in a div called image-inline to create a backgroundColor
    // Make an on click event for mobile
    var allImagesLength = allImages.length;
    var allVideosLength = allVideos.length;


    // FAST FACTS INTERACTION

    $('.showlightgray').on('mouseover',function(){
        $('.lightgray').css('opacity','1');
        console.log('hello');
    }).on('mouseout',function(){
      $('.lightgray').css('opacity','0');
    });
    $('.showlightgreen').on('mouseover',function(){
        $('.lightgreen').css('opacity','1');
        console.log('hello');
    }).on('mouseout',function(){
      $('.lightgreen').css('opacity','0');
    });
    $('.showlightyellow').on('mouseover',function(){
        $('.lightyellow').css('opacity','1');
        console.log('hello');
    }).on('mouseout',function(){
        $('.lightyellow').css('opacity','0');
    });
    $('.showburntred').on('mouseover',function(){
        $('.burntred').css('opacity','1');
        console.log('hello');
    }).on('mouseout',function(){
        $('.burntred').css('opacity','0');
    });
    $('.showdarkgray').on('mouseover',function(){
        $('.darkgray').css('opacity','1');
        console.log('hello');
    }).on('mouseout',function(){
        $('.darkgray').css('opacity','0');
    });


      allVideos.forEach(function(e){
        var playButton = document.createElement('div');
        $(playButton).addClass('play');
        $(playButton).html('&#9658;');
        $(e).find('video').after(playButton);
      });

      $('.play').on('click',function(e){

        var theVideo  = e.target.previousSibling;

        if (theVideo.paused) {
          theVideo.play();
          $(e.target).html('&#9616;&#9616;').css({'color':'rgba(18, 12, 12, 0.3607843137254902)', 'letter-spacing': '2px'});

        } else {
          theVideo.pause();
            $(e.target).html('&#9658;').css('color','white');
        }


          // $(e).prev('video').play();
      });

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
      var windowScrollPostion = window.scrollY;

      // for the Lamb Article - Tokyo flag to fall off after we scrolls
      // Past the first image .flag images
      var flatImage = $('.flagimage').offset().top + $(window).height();
      var globalSpotlight = $('#“Sumimasen—lambkudasi”');
      if (windowScrollPostion > flatImage - 90) {
        $(globalSpotlight).addClass('removeFlag');
      } else if (windowScrollPostion < flatImage) {
          $(globalSpotlight).removeClass('removeFlag');
      }
      // As the use scrolls
      // If the scroll top is greater than the scroll top of the element add a class activeArticle
      // Else if the scroll top is greater than the height of the element remove class astiveArticle
      // else if the scroll top is less than the top of the element + the height remove class activeArticle
      addsideHeader.forEach((e) => {
        var docViewTop = $(window).scrollTop();
        var docViewBottom = docViewTop + $(window).height();

        var elemTop = $(e).offset().top + $(window).height();
          var elemBottom = elemTop + $(this).height();

        if ( docViewBottom > elemTop +2  ){
           $(e).addClass('fixSub');
        }  else if (docViewBottom < elemTop + 2){
          $(e).removeClass('fixSub');
        }
      });



      // Make the videos start playing as you scroll onto ths screen
      $('.video-hold video').each(function(e){
        var docViewTop = $(window).scrollTop();
        var docViewBottom = docViewTop + $(window).height();

        var elemTop = $(this).offset().top+ $(window).height() - 190;
        var elemBottom = elemTop + $(this).height();

        var elementBottom = elemBottom - 300;
        var stopBottom = elemBottom / 2;
        if ( docViewBottom > elemTop  && docViewBottom < elementBottom ){
           $(this)[0].play();
        }  else if ( docViewBottom > stopBottom) {
          $(this)[0].pause();
        } else if ( docViewBottom < elemTop ) {
            $(this)[0].pause();
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

    var allArticlesTop = $('.App-intro > div');

    $(allArticlesTop).each(function(e){
    });

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


  hover(e) {

    var updateText = e.target.nextSibling.innerText;

    e.target.innerText = updateText;

  }
  out(e){
    var oldName = e.target.nextSibling.nextSibling.innerText;

    e.target.innerText = oldName;
  }

  fullscreen() {
    var el = document.documentElement,
     rfs = el.requestFullscreen
       || el.webkitRequestFullScreen
       || el.mozRequestFullScreen
       || el.msRequestFullscreen
   ;

   rfs.call(el);
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
              <small>{item.fields.issueNumber}</small>
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
                <h1 onMouseOut={this.out.bind(this)} onMouseOver={this.hover.bind(this)} >{content.fields.sideHeaderText}</h1>

                <h1 className="shadow-text" >{content.fields.title}</h1>
                <h3>{content.fields.sideHeaderText}</h3>

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
          <div className="fullscreen" onClick={this.fullscreen.bind(this)}>&#9634;</div>
          <div className="articleIndex" ref={ (articleEl) => this.articleEl = articleEl} style={{'top': "-"+this.state.height+'px'}}>
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
