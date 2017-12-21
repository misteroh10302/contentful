import React from 'react';
import './App.css';
import ReactDOM from 'react-dom';
import AppRoute from './AppRoute';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<AppRoute />, document.getElementById('root'));
registerServiceWorker();
