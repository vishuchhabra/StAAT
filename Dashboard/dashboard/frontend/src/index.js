import 'react-app-polyfill/ie11'; // For IE 11 support
import 'react-app-polyfill/stable';
import 'core-js';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';


import { icons } from './assets/icons'

React.icons = icons

ReactDOM.render( <App /> , document.getElementById("root"));

