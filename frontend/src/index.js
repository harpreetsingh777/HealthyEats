import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {HashRouter as Router, Route, Link, Switch} from 'react-router-dom'
import Home from './components/Home.jsx';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Home />, 
				document.getElementById('root'));
registerServiceWorker();
