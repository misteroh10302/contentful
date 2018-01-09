import React, { Component } from 'react';
import './App.css';
import Marked from 'marked';
import Scrollchor from 'react-scrollchor';
import $ from 'jquery'
var OnImagesLoaded = require('react-on-images-loaded');


class Posts extends Component {
  constructor(props) {
    super(props);
    this.debounceTimer = null
    this.state = {
      imageUrl: null,
      fixed: null,
      top: '0px',
      stickyTop: 0
    }

  }

  handleResize = () => {
    clearTimeout(this.debounceTimer)
    this.debounceTimer = setTimeout(() => {
      this.calculateTop()
    }, 250)
  }

  calculateTop = () => {
    if (!this.element) return
    this.setState({
      stickyTop: Math.min(0, window.innerHeight - this.element.offsetHeight -100),
    })
  }

  registerRef = (element) => {
    this.element = element;
    this.calculateTop();
  }

  componentDidMount() {

      window.addEventListener('resize', this.handleResize)

       this.calculateTop()
       const interval = setInterval(() => {
           if (document.readyState === 'complete') {
               clearInterval(interval)
               setTimeout(this.calculateTop, 4000)
           }
       }, 1000)

       setTimeout(()=>{
         setInterval(() =>{
           var that  = this;
           this.calculateTop()

         }, 1000);
       },9000);


  }

  componentDidUpdate(){

  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize)
    this.setState({
      stickyTop: 0
    })
  }

  runAfterImagesLoaded(){

       this.calculateTop()
  }

  backToTop(){
    var windowHeight = window.innerHeight * 1.5;
    $(window).scrollTop(windowHeight);
  }
  render() {
    // Set up sticky styles for the sticky effect
    const styles = {
      position: 'sticky',
      position: '-webkit-sticky',
      top: this.state.stickyTop,
      zIndex: this.props.id
    }

    const sidestyle  = {
      zIndex: this.props.id
    }
    // Set up variables for each element
    const body = Marked(this.props.content.fields.bodyText || "");
    let backgroundVideo = null;
    let background = null;
    let videoB
    let ex = null;
    let animation = null
    let sidetext = null;

      // If the post has an excerpt set it to a markup variable
      if (this.props.content.fields.excerpt) {
         ex = Marked(this.props.content.fields.excerpt);
      }


      if (this.props.content.fields.sideHeaderText) {
         sidetext = this.props.content.fields.sideHeaderText;
      }

      // If the post has a background image
      if (this.props.content.fields.backgroundImage !== undefined ) {
        background = this.props.content.fields.backgroundImage.fields.file.url;
      }  else {
          background = null;
      }


      // If the post has a background video
      if (this.props.content.fields.backgroundVideo){
          backgroundVideo = this.props.content.fields.backgroundVideo.fields.file.url
          videoB = 'videoBackground'
      }

      // If text animation needs to occur
      if (this.props.content.fields.textAnimation === true) {
        animation = "animate"
      }

      let cleanTitle = this.props.content.fields.title.replace(/ /g,'').replace(/'/g,'').replace(/,/g,'').replace(/“/g,'').replace(/—/g,'').replace(/”/g,'');


      return (
        <div style={styles} className={`${videoB} ${this.state.fixed} ${this.props.content.fields.categories}`} id={cleanTitle}  ref={this.registerRef}>
            <article style={{backgroundColor: this.props.content.fields.backgroundColor ,color: this.props.content.fields.fontColor, borderColor: this.props.content.fields.imageBackgroundColorOnHover}} className={animation} ref={ (divElement) => this.divElement = divElement}>
                <small style={sidestyle} className="sideHeader"><span>{sidetext} </span> <span className="back" onClick={this.backToTop.bind(this)}>Back to contents</span></small>
              <header style={{backgroundImage: `url(${background})`, color:this.props.content.fields.fontColor }}>
                <h1>{this.props.content.fields.title}</h1>
                <h2 className="desktop" dangerouslySetInnerHTML={ { __html: ex}  }></h2>
                <h3>{backgroundVideo}</h3>
              </header>
              <video className="video-container video-container-overlay" autoPlay loop muted="">
                <source type="video/mp4" src={backgroundVideo}/>
              </video>
              <h2 className="mobile" dangerouslySetInnerHTML={ { __html: ex}  }></h2>
              <section style={{ color:this.props.content.fields.fontColor }}>
                <p className="row" dangerouslySetInnerHTML={ { __html: body}  }></p>
              </section>
              <Scrollchor className="back" to="#contents">Back to contents</Scrollchor>
          </article>
         </div>

      );
  }
}

export default Posts;
