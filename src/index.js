import React from 'react';
import './App.css';
import 'babel-polyfill';
import ReactDOM from 'react-dom';
import AppRoute from './AppRoute';
import registerServiceWorker from './registerServiceWorker';
import ReactGA from 'react-ga';



ReactDOM.render(<AppRoute />, document.getElementById('root'));
registerServiceWorker();

ReactGA.initialize('UA-112061815-1');
ReactGA.pageview(window.location.pathname + window.location.search);
