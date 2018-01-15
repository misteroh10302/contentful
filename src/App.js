import React, { Component } from 'react';
import './App.css';
import Posts from "./Posts";
import Newsletter from "./Newsletter";
import Share from "./Share";
import Scrollchor from 'react-scrollchor';
import { Link } from 'react-router-dom';
import $ from 'jquery'
import ReactGA from 'react-ga';
// import FacebookProvider, { Share } from 'react-facebook';
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
      openForm: "form",
      openShare: "share",
      fullscreen:'false'
    }
    this.clickImage = this.clickImage.bind(this);

    ReactGA.initialize('UA-112061815-1');
    // This just needs to be called once since we have no routes in this case.
    ReactGA.pageview(window.location.pathname);
    ReactGA.pageview('/');
    ReactGA.pageview('/AutumnLamb');
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

    // Set the sticky height of the articles
        const height = this.articleEl.clientHeight - 220;
        this.setState({ height });
  }


  componentDidUpdate(){


    window.addEventListener("resize", this.updateDimensions);

    var that = this;
    var allImages = document.querySelectorAll('.imageClick img');
    var paddockHover = document.querySelectorAll('#TheQuestforEatingQuality .photo-grid img');
    var allVideos = document.querySelectorAll('.video-hold');
    // Wrap each image in a div called image-inline to create a backgroundColor
    // Make an on click event for mobile
    var allImagesLength = allImages.length;



    // FAST FACTS INTERACTION
    var showlightgray = $('.showlightgray');
    var lightgray = $('.lightgray');
    var showlightgreen = $('.showlightgreen');
    var lightgreen = $('.lightgreen');
    var showlightyellow = $('.showlightyellow');
    var lightyellow= $('.lightyellow');
    var showburntred = $('.showburntred');
    var burntred= $('.burntred');
    var showdarkgray = $('.showdarkgray');
    var darkgray= $('.darkgray');


    var fact_share = $('#FastFacts .row section h3');

    $(fact_share).on('click',function(event){
      const FB = window.FB;
      event.preventDefault();
         event.stopPropagation();
         event.stopImmediatePropagation();

             // Dynamically gather and set the FB share data.
             var FBDesc      = 'Your custom description';
             var FBTitle     = 'Your custom title';
             var FBLink      = 'http://example.com/your-page-link';
             var FBPic       = 'http://example.com/img/your-custom-image.jpg';

             // Open FB share popup
             FB.ui({
                 method: 'share_open_graph',
                 action_type: 'og.shares',
                 action_properties: JSON.stringify({
                     object: {
                         'og:url': FBLink,
                         'og:title': FBTitle,
                         'og:description': FBDesc,
                         'og:image': FBPic
                     }
                 })
             },
             function (response) {
             // Action after response
             })
    });

    $(showlightgray).on('mouseover',function(){
        $(lightgray).css('opacity','1');
    }).on('mouseout',function(){
      $(lightgray).css('opacity','0');
    });


    $(showlightgreen).on('mouseover',function(){
        $(lightgreen).css('opacity','1');
        $(showlightgray).find('img').css('opacity','0');

    }).on('mouseout',function(){
      $(lightgreen).css('opacity','0');
      $(showlightgray).find('img').css('opacity','1');
    });

    $(showlightyellow).on('mouseover',function(){
        $(lightyellow).css('opacity','1');
        $(showlightgray).find('img').css('opacity','0');
    }).on('mouseout',function(){
        $(lightyellow).css('opacity','0');
        $(showlightgray).find('img').css('opacity','1');
    });

    $(showburntred).on('mouseover',function(){
        $(burntred).css('opacity','1');
        $(showlightgray).find('img').css('opacity','0');

    }).on('mouseout',function(){
        $(burntred).css('opacity','0');
        $(showlightgray).find('img').css('opacity','1');
    });

    $(showdarkgray).on('mouseover',function(){
        $(darkgray).css('opacity','1');
        $(showlightgray).find('img').css('opacity','0');

    }).on('mouseout',function(){
        $(darkgray).css('opacity','0');
        $(showlightgray).find('img').css('opacity','1');
    });


      $(allVideos).each(function(index,e){
        if ($(e).find('.play-mobile').length !== 0) {
          return;
        } else {
          var playButton = document.createElement('div');
          var replay = document.createElement('div');
          $(playButton).addClass('play-mobile');
          $(playButton).html('<div class="video_controls"><div class="play_pause_mobile">play</div><div class="replay_mobile">replay</div></div>');
          $(replay).html('replay').addClass('replay');
          $(e).find('video').after(playButton);
        }
      });

      document.addEventListener('fullscreenchange', exitHandler);
      document.addEventListener('webkitfullscreenchange', exitHandler);
      document.addEventListener('mozfullscreenchange', exitHandler);
      document.addEventListener('MSFullscreenChange', exitHandler);

      function exitHandler() {
          if (!document.fullscreenElement && !document.webkitIsFullScreen && !document.mozFullScreen && !document.msFullscreenElement) {
              ///fire your event
                $('body').removeClass('fullscreenvideo_display');
                $('.fullscreenvideo').css('display','block');
          }
      }


      $(document).on('keydown',function(evt) {
            if (evt.keyCode === 27) {

              $('.fullscreen_open').removeClass('fullscreen_open');
              $('body').addClass('fullscreenvideo_display');
              $('.fullscreenvideo').css('display','block');
            }
        });

      // Create variables for all of the controls
      var replay = $('.replay');
      var replay_mobile= $('.replay_mobile');
      var play_pause_mobile = $('.play_pause_mobile');
      var play_pause = $('.play_pause');
      var image_inline = $('.image-inline');
      var fullscreen_video = $('.fullscreenvideo');
      var fullscreenT = false;

      $(fullscreen_video).on('click',function(e){
          var element = e.target.parentElement.parentElement.parentElement;
          if(fullscreenT === false) {

            element.classList.add('fullscreen_open');
            if (element.requestFullscreen) {
              element.requestFullscreen();
            } else if (element.msRequestFullscreen) {
              if (element === document.documentElement) { //check element
                  element = document.body; //overwrite the element (for IE)
              }
              $('.App').msRequestFullscreen();
            } else if (element.mozRequestFullScreen) {
              element.mozRequestFullScreen();
            } else if (element.webkitRequestFullscreen) {
              element.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
            }
            fullscreenT = true;


          } else {
              element.classList.remove('fullscreen_open');
            if(document.exitFullscreen) {
               document.exitFullscreen();
             } else if(document.mozCancelFullScreen) {
               document.mozCancelFullScreen();
             } else if(document.webkitExitFullscreen) {
               document.webkitExitFullscreen();
             }
             fullscreenT = false;


          }




    })


      // Create a replay button
      $(replay).on('click',function(e){
          var theVideo  = e.target.parentElement.parentElement.parentElement.firstElementChild;
          theVideo.currentTime = 0;
          theVideo.play();
          $(e.target).prev().html('pause');
      });

      // Create a replay button
      $(replay_mobile).on('click',function(e){
          var theVideo  = e.target.parentElement.parentElement.parentElement.firstElementChild;
          theVideo.currentTime = 0;
          theVideo.play();

          $(e.target).prev().html('pause');
      });


        // Create a play and pause button for all videos
        $(play_pause_mobile).on('click',function(e){
          var theVideo  = e.target.parentElement.parentElement.parentElement.firstElementChild;
          if (theVideo.paused) {
            theVideo.play();
            $(e.target).html('pause');
          } else {
            theVideo.pause();
            $(e.target).html('play');
          }
        });

      // Create a play and pause button for all videos
      $(play_pause).on('click',function(e){

        var theVideo  = e.target.parentElement.parentElement.parentElement.firstElementChild;

        if (theVideo.paused) {
          var playPromise =    theVideo.play();
          if (playPromise !== undefined) {
             playPromise.then(_ => {

               // Automatic playback started!
               // Show playing UI.
             })
             .catch(error => {

               // Auto-play was prevented
               // Show paused UI.
             });
           }
          $(e.target).html('pause');


        } else {
          var playPromise =    theVideo.play();
          if (playPromise !== undefined) {
             playPromise.then(_ => {
               theVideo.pause();

               // Automatic playback started!
               // Show playing UI.
             })
             .catch(error => {

               // Auto-play was prevented
               // Show paused UI.
             });
           }
          $(e.target).html('play');

        }
      });

      var photo_cap = $('.photo_caption');
      var photo_cap_image = $('.photo_cation').parent('.inline-image');
      var photo_cap_image_mobile = $('.photo_caption_nohover');


      // Create a hover effect for images with inline image
      if ($(image_inline).length < allImagesLength + paddockHover.length + photo_cap_image.length) {
        $(allImages).each(function(index,e){
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
        // Create a hover effect for the images in the paddock story
        $(paddockHover).each(function(index,e){
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

        $(photo_cap).each(function(e, elem){
           // Check to see if the element already has a title element added
          // If it does not add one
            var theParent = $(elem).prev();
            var newDiv = document.createElement('h3');
            var theDiv = document.createElement('div');

            var theBackgroundColor = $(elem).closest('article');
            var theB = theBackgroundColor[0].style.borderColor;
            var theBC = theBackgroundColor[0].style.backgroundColor;
            $(theDiv).addClass('image-inline');
            $(theDiv).css({'background-color':theB , 'color': theBC});
            newDiv.innerHTML = elem.innerHTML;
            $(theParent).wrap(theDiv);
            $(theParent).after(newDiv);
        });

        // EXECUTE IF MOBILE

        if( /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ) {

          $(photo_cap_image_mobile).each(function(e, elem){
             // Check to see if the element already has a title element added
            // If it does not add one
              var theParent = $(elem).prev();
              var newDiv = document.createElement('h3');
              var theDiv = document.createElement('div');

              var theBackgroundColor = $(elem).closest('article');
              var theB = theBackgroundColor[0].style.borderColor;
              var theBC = theBackgroundColor[0].style.backgroundColor;
              $(theDiv).addClass('image-inline');
              $(theDiv).css({'background-color':theB , 'color': theBC});
              newDiv.innerHTML = elem.innerHTML;
              $(theParent).wrap(theDiv);
              $(theParent).after(newDiv);
          });

        }

        $('.image-inline').on('click',function(){
          $(this).toggleClass('show_caption');
        });

      }




    // Animate the divs onto the page if animate = true

    let addsideHeader = document.querySelectorAll('.App-intro div');
    // For reach loop to see if the element is on the screen
    window.addEventListener('scroll', scrollEvents);
    function scrollEvents() {
      var windowScrollPostion = window.scrollY;

      // Make the fullscreen button shrink if we are greate than the screen innerHeight
      var fullScreenTop = $('.fullscreen')[0].offsetTop;
      var fullscreenButton =   $('.fullscreen');
      if (windowScrollPostion > fullScreenTop + window.innerHeight*1.5) {
        $(fullscreenButton).addClass('shrink');
      } else if (windowScrollPostion < fullScreenTop + window.innerHeight*3) {
          $(fullscreenButton).removeClass('shrink');
      }

      // for the Lamb Article - Tokyo flag to fall off after we scrolls
      // Past the first image .flag images
      var globalSpotlight = $('#Sumimasenlambkudasi');
      // Check to make sure that the flag image has loaded
      if ($('.flagimage').length > 0) {
        var flatImage = $('.flagimage').offset().top + $(window).height();
        if (flatImage) {
          if (windowScrollPostion > flatImage - 130) {
            $(globalSpotlight).addClass('removeFlag');
          } else if (windowScrollPostion < flatImage) {
              $(globalSpotlight).removeClass('removeFlag');
          }
        }
      }

      // As the use scrolls
      // If the scroll top is greater than the scroll top of the element add a class activeArticle
      // Else if the scroll top is greater than the height of the element remove class astiveArticle
      // else if the scroll top is less than the top of the element + the height remove class activeArticle
      $(addsideHeader).each((index,e) => {
        var docViewTop = $(window).scrollTop();
        var docViewBottom = docViewTop + $(window).height();

        var elemTop = $(e).offset().top + $(window).height();
          var elemBottom = elemTop + $(this).height();

          // make it start a little before on mobile
          if( /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ) {
            var elemTop = elemTop - 40;
            if ( docViewBottom > elemTop  ){
               $(e).addClass('fixSub');
            }  else if (docViewBottom < elemTop ){
              $(e).removeClass('fixSub');
            }
          }  else {
            if ( docViewBottom > elemTop +2  ){
               $(e).addClass('fixSub');
            }  else if (docViewBottom < elemTop + 2){
              $(e).removeClass('fixSub');
            }
          }

      });


    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ) {

    } else {
      // Make the videos start playing as you scroll onto ths screen
      $('.video-hold video').each(function(e){

        var docViewTop = $(window).scrollTop();
        var docViewBottom = docViewTop + $(window).height();

        var elemTop = $(this).offset().top+ $(window).height() - 190;
        var elemBottom = elemTop + $(this).height();

        var elementBottom = elemBottom - 300;
        var stopBottom = elemBottom / 2;
        var video_controls = $(this).parent();
        var currentText  = $(video_controls).find('.play_pause')[0].innerHTML;
          if ( docViewBottom > elemTop  && docViewBottom < elementBottom - 100 ){
            var playPromise =  $(this)[0].play();
            if (playPromise !== undefined) {
               playPromise.then(_ => {

                 // Automatic playback started!
                 // Show playing UI.
               })
               .catch(error => {


                 // Auto-play was prevented
                 // Show paused UI.
               });
             }

             $(video_controls).find('.play_pause')[0].innerHTML = 'pause';

          }  else if ( docViewBottom > stopBottom + 100) {
            console.log('stopbottom')
              $(this)[0].pause();
            $(video_controls).find('.play_pause')[0].innerHTML = 'play';
          } else if ( docViewBottom < elemTop) {

              $(this)[0].pause();
              $(video_controls).find('.play_pause')[0].innerHTML = 'play';
          }


      });

    }


    }

    var articleHeight = {
      top: Math.min(0, window.innerHeight + this.state.height -120)
    }

    var allArticlesTop = $('.App-intro > div');

    $(allArticlesTop).each(function(e){
    });



    $(document).ready(function(){
      // Add smooth scrolling to all links
      $(".articleIndex .mobile a").on('click', function(event) {

        // Make sure this.hash has a value before overriding default behavior
        if (this.hash !== "") {
          // Prevent default anchor click behavior
          event.preventDefault();

          // Store hash
          var hash =   this.hash.replace(/ /g,'').replace(/'/g,'').replace(/%E2%80%9D/g,'').replace(/%E2%80%9C/g,'').replace(/%E2%80%94/g,'').replace(/,/g,'');


          // Using jQuery's animate() method to add smooth page scroll
          // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
          $('html, body').animate({
            scrollTop: $(hash).offset().top - 80
          }, 0, function(){

            // Add hash (#) to URL when done scrolling (default click behavior)
            window.location.hash = hash;
          });
        } // End if
      });
      $(".articleIndex .mobile-portrait a").on('click', function(event) {

        // Make sure this.hash has a value before overriding default behavior
        if (this.hash !== "") {
          // Prevent default anchor click behavior
          event.preventDefault();

          // Store hash
          var hash =   this.hash.replace(/ /g,'').replace(/'/g,'').replace(/%E2%80%9D/g,'').replace(/%E2%80%9C/g,'').replace(/%E2%80%94/g,'').replace(/,/g,'');


          // Using jQuery's animate() method to add smooth page scroll
          // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
          $('html, body').animate({
            scrollTop: $(hash).offset().top + 1

          }, 0, function(){
            $(hash).addClass('fixsub');
            // Add hash (#) to URL when done scrolling (default click behavior)
            window.location.hash = hash;
          });
        } // End if
      });
    });





  }

  clickImage = (e) => {
    // var theEl = e.target;
    // var theTitle = e.target.alt;
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
  openShare(){
    if (this.state.openShare === 'share-open') {
      this.setState({
        openShare: 'share'
      });
    }  else{
      this.setState({
        openShare: 'share-open'
      });
    }

  }

  closeNews(){
    this.setState({
      openForm: 'hidden'
    });
  }
  closeShare(){
    this.setState({
      openShare: 'hidden'
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
    var scrollTop = window.scrollY;
    this.launchFullscreen(document.documentElement);
    $('body').addClass('fullscreenvideo_display');
    $('.fullscreenvideo').css('display','none');
     setTimeout(function(){
        $(window).scrollTop(scrollTop);
     },300);

  }


  launchFullscreen(element) {
      if(element.requestFullscreen) {
        element.requestFullscreen();
      } else if(element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
      } else if(element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
      } else if(element.msRequestFullscreen) {
        element.msRequestFullscreen();
      }
    }

    // Exit Fullscreen mode
     exitFullscreen() {
      if(document.exitFullscreen) {
        document.exitFullscreen();
      } else if(document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if(document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      }
    }
  render() {

    var indexItems
    var articleItems
    var thePosts
    var mobileIndex

    indexItems = this.state.homepage.map(function(item,i){
        if (item.fields.issueNumberMain === this.state.stateName ){
          return(
            <div key={item.sys.id}>
              <header key={item.sys.id} style={{backgroundImage: `url(${item.fields.backgroundImage.fields.file.url})`, color: `${item.fields.fontColor}`}}>
                <div className="wrapper">
                  <small>{item.fields.issueNumber}</small>
                  <h1 key={item.sys.id}>{item.fields.magazineTitle}</h1>
                  <h2>{item.fields.subHeader}</h2>
                </div>
              </header>
              <img src={item.fields.logo.fields.file.url} alt={item.fields.title} />
            </div>
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

    // Desktop Index
    articleItems = this.state.contents.map(function(content,i){
        let thumbnail
         if (content.fields.thumbnail !== undefined) {
            thumbnail = content.fields.thumbnail.fields.file.url
         } else {
            thumbnail = null
         }
        if (content.fields.issueName === this.state.stateName ){
          return(
            <Scrollchor to={`#${content.fields.title.replace(/ /g,'').replace(/'/g,'').replace(/,/g,'').replace(/“/g,'').replace(/—/g,'').replace(/”/g,'')}`} key={content.sys.id}>
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

    // Mobile Index
    mobileIndex = this.state.contents.map(function(content,i){
        let thumbnail
         if (content.fields.thumbnail !== undefined) {
            thumbnail = content.fields.thumbnail.fields.file.url
         } else {
            thumbnail = null
         }
        if (content.fields.issueName === this.state.stateName ){
          return(
            <a href={`#${content.fields.title.replace(/ /g,'').replace(/'/g,'').replace(/,/g,'')}`} key={content.sys.id}>
              <div key={content.sys.id} className={`${content.fields.issueName}`}>
                <h1>{content.fields.sideHeaderText}</h1>
                <h1 className="shadow-text" >{content.fields.title}</h1>
                <h3>{content.fields.sideHeaderText}</h3>
                <img src={thumbnail} alt="" />
              </div>
            </a>
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

    // When you want to add all of the past magazines in here
    var navlinks_allmag = this.state.homepage.map((item,i) =>
            <Link onClick={this.updateStateName} key={item.sys.id} to={`/${item.fields.magazineTitle.replace(/ /g,'')}`}>{item.fields.magazineTitle}</Link>
    )

    return (
      <div className={`App ${this.props.theName}`}>
        <div className="wrapper">
          <nav>
          <div className="inner">
            <div className="main_logo">
              <a target="_blank" rel="noopener noreferrer" href="http://raremedium.com.au/">
              <img src="//images.contentful.com/a7w606b3ho4t/2YMbFSH8HuAiA80cKI8kug/ff588cf9b15a6d541996a86d1ff41af3/logo-mobile_2x.png" alt="Rare Medium Logo" />
              </a>
            </div>
            <div className="nav_left">
              <a onClick={this.openShare.bind(this)}>Share</a>
              <a target="_blank" rel="noopener noreferrer" href="http://raremedium.com.au/">Raremedium.com.au</a>

                <div className="newsButton" onClick={this.openNews.bind(this)}>
                  <h3>EMAG</h3>
                  <h3>Sign up </h3>
                </div>


            </div>
            </div>
          </nav>

        </div>
        <div className="App-header">
          {indexItems}
        </div>
        <span  id="contents"> </span>
        <section id="lower">
          <div className="fullscreen" onClick={this.fullscreen.bind(this)}>
            <img src="//images.contentful.com/a7w606b3ho4t/5NAq3W6ljyao4OOQqgc8eI/6edab400509aaf3eb7eb12ab877fbbfa/Full_Screen.svg" alt=""/>
            </div>
          <div className="articleIndex" ref={ (articleEl) => this.articleEl = articleEl} style={{'top': "-"+this.state.height+'px'}}>
            <h3>Contents</h3>
            <span className="desktop">
              {articleItems}
            </span>
            <span className="mobile">
              {mobileIndex}
            </span>
            <span className="mobile-portrait">
              {mobileIndex}
            </span>
          </div>
          <div className="App-intro">

            {thePosts}
          </div>
        </section>
        <Newsletter isOpen={this.state.openForm} closeForm={this.closeNews.bind(this)}/>
        <Share isOpen={this.state.openShare} closeForm={this.closeShare.bind(this)}/>

      </div>
    );
  }
}

export default App;
